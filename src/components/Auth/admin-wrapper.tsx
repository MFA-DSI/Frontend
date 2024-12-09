import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../hooks";

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

const StaffWrapper = ({ children, isStaff }) => {
  const role = localStorage.getItem("role");
  if (role === "user" || isStaff !== "true") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default StaffWrapper;
