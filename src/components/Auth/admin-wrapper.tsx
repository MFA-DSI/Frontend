import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AdminWrapper = ({ role }) => {
  if (role === "SUPER_ADMIN") {
    return <Navigate to="/allDirection" replace />;
  } else {
    return <Navigate to="/myDirection" replace />;
  }
};
