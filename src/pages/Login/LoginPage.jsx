import React, {useState} from "react";
import LoginComponent from "../../components/Login/Login";
import {DirectionProvider} from "../../providers/context/DirectionContext";
import {ToastContainer} from "react-toastify";

const mode = "login";
const LoginPage = () => {
  return (
    <div className={`app app--is-${mode}`}>
      <DirectionProvider>
        <ToastContainer></ToastContainer>
        <LoginComponent mode={mode} />
      </DirectionProvider>
    </div>
  );
};
export default LoginPage;
