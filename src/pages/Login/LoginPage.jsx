import React, { useState } from 'react'
import LoginComponent from '../../components/Login/Login';



const LoginPage = () => {
    const [mode, setMode] = useState('login');

    return (
        <div className={`app app--is-${mode}`}>
            <LoginComponent
                mode={mode}
            />
        </div>
    );
};
export default LoginPage;