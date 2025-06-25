import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

function RedirectIfAuthenticated({ children }) {
  if (isLoggedIn()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RedirectIfAuthenticated;
