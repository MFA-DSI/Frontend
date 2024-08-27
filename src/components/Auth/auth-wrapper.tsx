import React from "react";
import {Navigate, Outlet} from "react-router-dom";

export const AuthWrapper = () => {
  const token = window.sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
