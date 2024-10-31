import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/AuthProvider/AuthProvider";

type TProtectedRoute = {
  children: ReactNode;
  allowedRoles: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: TProtectedRoute) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { user, logout } = authContext;
  const role = user?.role;
  const token = localStorage.getItem("access-token");

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  if (!role || !allowedRoles.includes(role)) {
    // Redirect to home or an unauthorized page if the role is not allowed
    logout();
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
