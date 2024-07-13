import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./components/auth/SignUp";
import VerifyMail from "./components/auth/VerifyMail";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import Login from "./components/auth/login";
import Main from "./components/layout/Main";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProject from "./components/createProject/CreateProject";
import { Onboard } from "./components/auth/Onboard";

function App() {
  const { initializeAuthListener, isAuthenticated, isInitializing,isOnboarded } = useAuth();
  useEffect(() => {
    initializeAuthListener();
  }, [initializeAuthListener]);

  if (isInitializing) {
    return <div>Loading</div>;
  }

  return (
    <>
       <Routes>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<VerifyMail />} />
      <Route path="/onboarding" element={isOnboarded ? <Navigate to="/dashboard" /> : <Onboard />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            isOnboarded?
            <Main />
            :
            <Navigate to="/onboarding"/>
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route index element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
