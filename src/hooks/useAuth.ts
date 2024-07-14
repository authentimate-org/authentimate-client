import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";
import { setAuth, logoutUser } from "../services/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState, AppDispatch } from "../app/store";
import {
  User,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import axios from "axios";
import { setUser } from "@/services/auth/issuerSlice";
import { useFetchIssuerQuery } from "@/api/issuer/issuerApi";

interface RegisterResponse {
  token?: string;
  error?: string;
}

interface AuthReturnType {
  handleRegister: (email: string, password: string) => Promise<void>;
  handleLogin:(email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  initializeAuthListener: () => void;
  isLoading: boolean;
  isEmailVerified: boolean | undefined;
  isOnboarded: boolean | undefined;
  authError: any | undefined;
  isAuthenticated: boolean;
  isInitializing: boolean;
}

export const useAuth = (): AuthReturnType => {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL_DEV;

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const { isEmailVerified, isOnboarded } = useSelector((state: RootState) => state.issuer);
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [fetchIssuer, setFetchIssuer] = useState<boolean>(false);

  const { data: fetchedIssuer } = useFetchIssuerQuery(undefined, {
    skip: !fetchIssuer,
  });

  const handleRegister = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const endpoint = "/issuer/signup";
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
            })
          );
          setFetchIssuer(true); 
          navigate("/verify-email");
        }
      } else if (response.data.error) {
        setAuthError(response.data.error);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        setAuthError(err.response.data.error);
      } else {
        console.error("Failed to sign up:", err);
        setAuthError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      if(!userCredential.user.emailVerified){
        sendEmailVerification(userCredential.user)
      }
      dispatch(setAuth({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        token,
      }));
      
      if (auth.currentUser) {
        setFetchIssuer(true);
      }
  
      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setAuthError(error.response.data.error);
      } else {
        console.error("Failed to log in:", error);
        setAuthError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const authStateChanged = useCallback(
    async (user: User | null) => {
      const path = location.pathname;
      if (user) {
        const token = await user.getIdToken();
        if (auth.currentUser) {
          setFetchIssuer(true); 
          dispatch(setUser({ isOnboarded: fetchedIssuer?.onboarding }));
        }

        if (user.emailVerified) {

          dispatch(setUser({ isEmailVerified:true }));
          dispatch(setAuth({ uid: user.uid, email: user.email, token }));
          if (path === "/login" || path === "/sign-up" || path === "/verify-email") {
            navigate("/dashboard");
          }
        } else {
          if (path === "/login" || path === "/sign-up") {
            navigate(path);
          } else if (path !== "/verify-email") {
            navigate("/verify-email");
          }
        }
      } else {
        dispatch(logoutUser());
        if (path === "/dashboard") {
          navigate("/login");
        }
      }
      if(fetchedIssuer){
        setIsInitializing(false); 
      }
    },
    [dispatch, navigate, location.pathname, fetchedIssuer]
  );

  const initializeAuthListener = useCallback(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return unsubscribe;
  }, [authStateChanged]);

  useEffect(() => {
    const unsubscribe = initializeAuthListener();
    return () => unsubscribe();
  }, [initializeAuthListener]);

  const handleLogout = async () => {
    await signOut(auth);
    dispatch(logoutUser());
    navigate("/login");
  };

  const isAuthenticated = !!user && !!token;

  return {
    handleRegister,
    handleLogout,
    handleLogin,
    initializeAuthListener,
    isLoading,
    isEmailVerified,
    isOnboarded,
    authError,
    isAuthenticated,
    isInitializing,
  };
};
