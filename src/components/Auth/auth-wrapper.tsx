import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../hooks";

export const AuthWrapper = () => {
  const token = window.localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export const SuperAdminWrapper = ()=>{
  const role = useAuthStore.getState().role;
  if (role!== "SUPER_ADMIN") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}