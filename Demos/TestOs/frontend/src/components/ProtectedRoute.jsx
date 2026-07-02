import { Navigate } from "react-router-dom";
import { useAuth } from "../customHooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/?auth=customer-login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.sRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
