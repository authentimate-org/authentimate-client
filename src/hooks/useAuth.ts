import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../config/firebase";
import {
  setUser,
  logoutUser,
  registerUser,
  loginUser,
  verifyEmail,
} from "../services/auth/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState, AppDispatch } from "../app/store";
import { User, onAuthStateChanged, signOut } from "firebase/auth";

interface AuthReturnType {
  handleRegister: (email: string, password: string) => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  verifyMail: () => Promise<void>;
  initializeAuthListener: () => void;
  isLoading: boolean;
  authError: any | undefined;
  isAuthenticated: boolean;
  isInitializing: boolean;
  handleLogout: () => Promise<void>;
}

export const useAuth = (): AuthReturnType => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const isLoading = useSelector((state: RootState) => state.auth.loading);
  const authError = useSelector((state: RootState) => state.auth.error);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  const handleRegister = async (
    email: string,
    password: string
  ): Promise<void> => {
    const result = await dispatch(registerUser({ email, password }));
    if (registerUser.fulfilled.match(result)) {
      navigate("/verify-email");
      verifyMail();
    } else {
      console.error("Error registering user:", result.payload);
    }
  };

  const handleLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      if (result.payload.user.emailVerified) {
        navigate("/dashboard");
      } else {
        verifyMail();
        navigate("/verify-email");
      }
    } else {
      console.error("Error logging in:", result.payload);
    }
  };

  const verifyMail = async (): Promise<void> => {
    const result = await dispatch(verifyEmail());
    if (verifyEmail.fulfilled.match(result)) {
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.emailVerified) {
        navigate("/dashboard");
      }
    } else {
      console.error("Error verifying email:", result.payload);
    }
  };

  const authStateChanged = useCallback(
    async (user: User | null) => {
      const path = location.pathname;
      if (user) {
        const token = await user.getIdToken();
        if (user.emailVerified) {
          dispatch(setUser({ uid: user.uid, email: user.email, token }));
          if (
            path === "/login" ||
            path === "/sign-up" ||
            path === "/verify-email"
          ) {
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
      setIsInitializing(false);
    },
    [dispatch, navigate, location.pathname]
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
    handleLogin,
    verifyMail,
    handleLogout,
    initializeAuthListener,
    isLoading,
    authError,
    isAuthenticated,
    isInitializing,
  };
};
