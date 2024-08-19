import { authProvider } from '../../providers/auth-provider';
import { userProvider } from '../../providers/user-provider';
import './assets/index.scss';
import React, { useState } from 'react';


const {login} = authProvider;
const  {save} = userProvider;

const LoginComponent = ({ mode: initialMode }) => {
    const [mode, setMode] = useState(initialMode);
    const [isLoading, setIsLoading] = useState(false);

    const toggleMode = () => {
        setMode(prevMode => prevMode === 'login' ? 'save' : 'login');
    };   



    const onSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            if (mode === 'login') {
                await login({ email : data.username, password: data.password });
                console.log("Logged in successfully");
            } else {
                await save({
                    fullname: data.fullname,
                    email: data.email,
                    password: data.createpassword,
                });
                console.log("Signed up successfully");
                setMode('login'); // Switch back to login after successful signup
            }
        } catch (error) {
            console.error("Authentication failed:", error);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div>
            <div className={`form-block-wrapper form-block-wrapper--is-${mode}`} ></div>
            <section className={`form-block form-block--is-${mode}`}>
                <header className="form-block__header">
                    <h1>{mode === 'login' ? 'Welcome back!' : 'Sign up'}</h1>
                    <div className="form-block__toggle-block">
                        <span>{mode === 'login' ? 'Don\'t' : 'Already'} have an account? Click here &#8594;</span>
                        <input id="form-toggler" type="checkbox" onClick={toggleMode} />
                        <label htmlFor="form-toggler"></label>
                    </div>
                </header>
                <LoginForm mode={mode} onSubmit={onSubmit} />
            </section>
        </div>
    );
};

const LoginForm = ({ mode, onSubmit, isLoading }) => (
    <form onSubmit={onSubmit}>
        <div className="form-block__input-wrapper">
            <div className="form-group form-group--login">
                <Input type="text" id="username" label="User Name" name="username" disabled={mode === 'signup'} />
                <Input type="password" id="password" label="Password" name="password" disabled={mode === 'signup'} />
            </div>
            <div className="form-group form-group--signup">
                <Input type="text" id="fullname" label="Full Name" name="fullname" disabled={mode === 'login'} />
                <Input type="email" id="email" label="Email" name="email" disabled={mode === 'login'} />
                <Input type="password" id="createpassword" label="Password" name="createpassword" disabled={mode === 'login'} />
                <Input type="password" id="repeatpassword" label="Repeat Password" name="repeatpassword" disabled={mode === 'login'} />
            </div>
        </div>
        <button className="button button--primary full-width" type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : mode === 'login' ? 'Log In' : 'Sign Up'}
        </button>
    </form>
);

const Input = ({ id, type, label, name, disabled }) => (
    <input className="form-group__input" type={type} id={id} name={name} placeholder={label} disabled={disabled} />
);




export default LoginComponent;
