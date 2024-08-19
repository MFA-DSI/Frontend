import React from 'react'
import LoginComponent from '../../components/Login/Login';


const mode = "login";



const LoginPage = () => (
    <div className={`app app--is-${mode}`}>
        <LoginComponent
            mode={mode}
            onSubmit={() => console.log('submit')}
        />
    </div>
);
export default LoginPage;