import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const AdminWrapper = ({ role }) => {
  if (role === "SUPER_ADMIN") {
    return <Navigate to="/allDirection" replace />;
  } else {
    return <Navigate to="/myDirection" replace />;
  }
};

export const RoleWrapper = ({ children, role }) => {
  const location = useLocation();

  if (role !== "SUPER_ADMIN") {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return children;
};
