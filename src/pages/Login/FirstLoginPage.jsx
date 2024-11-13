import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import FirstLoginComponent from "../../components/Login/FirstLogin";


const FirstLoginPage = () => {
  return (
    <div className={`app`}>
      <ToastContainer></ToastContainer>
      <FirstLoginComponent />
    </div>
  );
};
export default FirstLoginPage;
