import React, { ReactNode } from "react";
import { Navigate, Outlet, redirect, useLocation } from "react-router-dom";
import { useAuthStore } from "../../hooks";

type PrivateWrapperProps = {
  children: ReactNode;
  redirectPath?: string;
};

export const PrivateWrapper = ({
  children,
  redirectPath = "/",
}: PrivateWrapperProps) => {
  const location = useLocation();

  const token = window.localStorage.getItem("token");

  if (token) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  return <>{children}</>;
};


export const SuperAdminWrapper = ()=>{
  const role = useAuthStore.getState().role;

  
  if (role !== "SUPER_ADMIN") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}