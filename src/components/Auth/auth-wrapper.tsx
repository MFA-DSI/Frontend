import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../hooks";

export const AuthWrapper = () => {
  const token = window.localStorage.getItem("token");
  const userId = window.localStorage.getItem("userId");
  const directionId = window.localStorage.getItem("directionId");
  if (!token || !userId || !directionId) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
