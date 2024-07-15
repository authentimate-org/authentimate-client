import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/config/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { setAuthStatus } from "@/services/auth/authSlice";

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth(navigate);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.reload();
        if (currentUser.emailVerified) {
          dispatch(setAuthStatus("VERIFIED"));
          navigate("/onboarding")
        }
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [navigate]);

  const onLogout = () => {
    handleLogout();
    navigate("/login");
  };

  if (!auth.currentUser) {
    return <Navigate to={"/login"} />;
  }
  if (auth.currentUser && auth.currentUser.emailVerified) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <p className="mt-4">
          We have sent you an email with a verification link. Please check your
          inbox and verify your email address.
        </p>
        <button className="mt-6" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
