import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
  allowedRoles: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: TProtectedRoute) => {
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.access_token);
  const dispatch = useAppDispatch();
  const role = user?.role;
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  if (!role || !allowedRoles.includes(role)) {
    // Redirect to home or an unauthorized page if the role is not allowed
    dispatch(logout());
    return <Navigate to="/" replace={true} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
