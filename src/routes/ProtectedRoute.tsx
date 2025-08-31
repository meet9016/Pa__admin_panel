import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const location = useLocation();

  // read token from query string if present
  const params = new URLSearchParams(location.search);
  const tokenFromUrl = params.get("token");

  // get whatever is currently stored
  const storedToken = localStorage.getItem("auth_token");

  useEffect(() => {
    if (tokenFromUrl) {
      // if token in URL, save it
      localStorage.setItem("auth_token", tokenFromUrl);

      // optional: remove token from URL after saving
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [tokenFromUrl, location.pathname]);

  const auth_token = tokenFromUrl || storedToken;

  if (!auth_token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
