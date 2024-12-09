import React, { useState } from "react";
import LoginComponent from "../../components/Login/Login";
import { ToastContainer } from "react-toastify";

const mode = "login";
const LoginPage = () => {
  return (
    <div className={`app app--is-${mode}`}>
      <ToastContainer></ToastContainer>

      <LoginComponent mode={mode} />
    </div>
  );
};
export default LoginPage;
