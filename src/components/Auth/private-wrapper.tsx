import React, { ReactNode } from "react";
import { Navigate, redirect, useLocation } from "react-router-dom";


type PrivateWrapperProps = {
    children: ReactNode;
    redirectPath?: string;
  };



export const PrivateWrapper = ({
    children,
    redirectPath="/" 
}:PrivateWrapperProps )=>{
    const location = useLocation();

    const token = window.sessionStorage.getItem("token");

    if(token){
        return <Navigate to={redirectPath} state={{from : location}} replace/>
    }
    return <>{children}</>
}