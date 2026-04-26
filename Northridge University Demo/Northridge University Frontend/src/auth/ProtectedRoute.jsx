import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";

export function ProtectedRoute({ allowedRole, children }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login/method"
        replace
        state={{
          from: location.pathname,
          requestedRole: allowedRole
        }}
      />
    );
  }

  if (user?.role !== allowedRole) {
    return (
      <Navigate
        to="/access-denied"
        replace
        state={{
          attemptedRole: allowedRole,
          currentRole: user?.role
        }}
      />
    );
  }

  return children;
}