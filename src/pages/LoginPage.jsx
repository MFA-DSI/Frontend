import React, { useState } from 'react'
import LoginComponent from '../components/Login/Login';


const mode = "login";
const LoginPage = () => {
   
    return (
        <div className={`app app--is-${mode}`}>
            <LoginComponent
                mode={mode}
            />
        </div>
    );
};
export default LoginPage;