import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  RouteObject,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import SignUp from "./components/auth/SignUp";
import VerifyMail from "./components/auth/VerifyMail";
import Login from "./components/auth/login";
import Main from "./components/layout/Main";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProject from "./components/createProject/CreateProject";
import { Onboard } from "./components/auth/Onboard";

import QRCodeGenerator from "./components/editor/qrcode/QRCodeGenerator";
import PreviewPage from "./components/editor/preview";
const AppRouter = () => {
  const { authStatus } = useAuth(() => {});

  let routes: RouteObject[] = [];

  if (authStatus === null) {
    routes = [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <Navigate to="/login" />,
      },
    ];
  } else if (authStatus === "AUTHENTICATED") {
    routes = [
      {
        path: "/verify-email",
        element: <VerifyMail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <Navigate to="/verify-email" />,
      },
    ];
  } else if (authStatus === "VERIFIED") {
    routes = [
      {
        path: "/onboarding",
        element: <Onboard />,
      },
      {
        path: "*",
        element: <Navigate to="/onboarding" />,
      },
    ];
  } else if (authStatus === "ONBOARDED") {
    routes = [
      {
        path: "/",
        element: <Main />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "create-project",
            element: <CreateProject />,
          },
          {
            path: "create-project/:page/:projectId?/:templateId?",
            element: <CreateProject />,
          },
          {
            path: "qr-code",
            element: (
              <QRCodeGenerator url={`${window.location.origin}/preview`} />
            ),
          },
          {
            path: "preview",
            element: <PreviewPage />,
          },
          {
            path: "*",
            element: <Navigate to="/dashboard" />,
          },
          {
            index: true,
            element: <Navigate to="/dashboard" />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/dashboard" />,
      },
    ];
  }

  if (authStatus === undefined) {
    return <div>Loading...</div>;
  }

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default AppRouter;
