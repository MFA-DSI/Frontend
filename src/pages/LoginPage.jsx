import React, {useState} from "react";
import LoginComponent from "../components/Login/Login";
import {DirectionProvider} from "../providers/context/DirectionContext";

const mode = "login";
const LoginPage = () => {
  return (
    <div className={`app app--is-${mode}`}>
      <DirectionProvider>
        <LoginComponent mode={mode} />
      </DirectionProvider>
    </div>
  );
};
export default LoginPage;
