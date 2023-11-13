import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth.context";
import Loader from "./Loader";

export default function PrivateRoute() {
  const { ready, isAuthed } = useAuth();
  const { pathname } = useLocation();

  const loginPath = `/login?redirect=${pathname}`;

  if (!ready) {
    return (
      <Loader
        message="Please wait while we are checking your credentials and loading the
    application."
      />
    );
  }

  if (isAuthed) {
    return <Outlet />;
  }

  return <Navigate replace to={loginPath} />;
}
