import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";
import { setAuth, logoutUser } from "../services/auth/authSlice";
import { RootState, AppDispatch } from "../app/store";
import { User, onAuthStateChanged, sendEmailVerification, signInWithCustomToken, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";
import { setUser } from "@/services/auth/issuerSlice";

interface RegisterResponse {
  token?: string;
  error?: string;
}

interface GetUserResponse {
  isEmailVerified: boolean;
  onboarding: boolean;
}

interface AuthReturnType {
  handleRegister: (email: string, password: string) => Promise<{success:boolean}>;
  handleLogin: (email: string, password: string) => Promise<{success:boolean}>;
  handleLogout: () => Promise<void>;
  isLoading: boolean;
  authError: any | undefined;
  isInitializing: boolean;
  authStatus: "AUTHENTICATED" | "VERIFIED" | "ONBOARDED" | null;
}

export const useAuth = (navigate: (path: string) => void): AuthReturnType => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL_DEV;

  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const { authStatus } = useSelector((state: RootState) => state.auth);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);



  const fetchUserDetails = useCallback(async () => {
    try {
      if (auth.currentUser) {
        const idToken = await auth.currentUser.getIdToken();
        const response = await axios.get<GetUserResponse>(`${API_BASE_URL}/issuer/getUser`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (response.data) {
          dispatch(setUser({ isEmailVerified: response.data.isEmailVerified, isOnboarded: response.data.onboarding }));
          if (response.data.onboarding) {
            dispatch(setAuth({ authStatus: "ONBOARDED" }));
            // navigate("/dashboard")
          } else {
            dispatch(setAuth({ authStatus: "VERIFIED" }));
            navigate("/onboarding")
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setIsInitializing(false);
    }
  }, [API_BASE_URL, dispatch]);



  const handleRegister = async (email: string, password: string):Promise<{success:boolean}> => {
    try {
      setIsLoading(true);
      const endpoint = "/issuer/signUp";
      const url = `${API_BASE_URL}${endpoint}`;

      const response = await axios.post<RegisterResponse>(url, { email, password });

      if (response.data.token) {
        await signInWithCustomToken(auth, response.data.token);
        if (auth.currentUser) {
          dispatch(
            setAuth({
              uid: auth.currentUser.uid,
              email: email,
              token: response.data.token,
              authStatus: "AUTHENTICATED",
            })
          );
          navigate("/verify-email")
        }
        return ({success:true})
      } else if (response.data.error) {
        setAuthError(response.data.error);
        return ({success:false})
      }
      return ({success:false})
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setAuthError(err.response.data.error);
      } else {
        console.error("Failed to sign up:", err);
        setAuthError("An unexpected error occurred. Please try again.");
      }
      return ({success:false})
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string):Promise<{success:boolean}> => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      if (!userCredential.user.emailVerified) {
        sendEmailVerification(userCredential.user);
        dispatch(setAuth({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          token,
          authStatus: "AUTHENTICATED",
        }));
        navigate("/verify-email")
      } else {
        dispatch(setAuth({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          token,
        }));
        await fetchUserDetails();
      }
      return ({success:true})
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setAuthError(error.response.data.error);
      } else {
        console.error("Failed to log in:", error);
        setAuthError("An unexpected error occurred. Please try again.");
      }
      return ({success:false})
    } finally {
      setIsLoading(false);
    }
  };



  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    navigate("/login")
  };




  const authStateChanged = useCallback(
    async (user: User | null) => {
      if (user) {
        const token = await user.getIdToken();
        if (!user.emailVerified) {
          dispatch(setAuth({ uid: user.uid, email: user.email, token, authStatus: "AUTHENTICATED" }));
          setIsInitializing(false)
        } else {
          dispatch(setAuth({ uid: user.uid, email: user.email, token }));
          await fetchUserDetails();
        }
      } else {
        dispatch(logoutUser());
        setIsInitializing(false);
      }
    },
    [dispatch, fetchUserDetails]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, [authStateChanged]);




 

  return {
    handleRegister,
    handleLogout,
    handleLogin,
    isLoading,
    authError,
    isInitializing,
    authStatus,
  };
};
