import {useNavigate} from "react-router-dom";
import {authProvider} from "../../providers/auth-provider";
import {userProvider} from "../../providers/user-provider";
import "./assets/index.scss";
import React, {useState} from "react";
import {resetValues} from "../../lib/reset";
import {useDirectionsContext} from "../../providers/context/DirectionContext";

const {login} = authProvider;
const {save} = userProvider;

const LoginComponent = ({mode: initialMode}) => {
  const [mode, setMode] = useState(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    data,
    isLoading: isDirectionsLoading,
    isError,
  } = useDirectionsContext();

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "login" ? "signup" : "login"));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      if (mode === "login") {
        await login({email: data.email, password: data.password});
        console.log("Logged in successfully");
        navigate("/");
      } else {
        await save({
          username: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          directionId: data.directionId,
          password: data.createpassword,
        });
        console.log("Signed up successfully");
        navigate("/");
        resetValues([data.email, data.fullname, data.createpassword]);
        setMode("login"); // Switch back to login after successful signup
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className={`form-block-wrapper form-block-wrapper--is-${mode}`}
      ></div>
      <section className={`form-block form-block--is-${mode}`}>
        <header className="form-block__header">
          <h1>{mode === "login" ? "Welcome back!" : "Sign up"}</h1>
          <div className="form-block__toggle-block">
            <span>
              {mode === "login" ? "Don't" : "Already"} have an account? Click
              here &#8594;
            </span>
            <input id="form-toggler" type="checkbox" onClick={toggleMode} />
            <label htmlFor="form-toggler"></label>
          </div>
        </header>
        <LoginForm mode={mode} onSubmit={onSubmit} />
      </section>
    </div>
  );
};

const LoginForm = ({mode, onSubmit, isLoading}) => (
  <form onSubmit={onSubmit}>
    <div className="form-block__input-wrapper">
      <div className="form-group form-group--login">
        <Input
          type="email"
          id="email"
          label="User Name"
          name="email"
          disabled={mode === "signup"}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          name="password"
          disabled={mode === "signup"}
        />
      </div>
      <div className="form-group form-group--signup">
        <Input
          type="text"
          id="firstname"
          label="firstname"
          name="firstname"
          disabled={mode === "login"}
        />
        <Input
          type="text"
          id="lastname"
          label="lastname"
          name="lastname"
          disabled={mode === "login"}
        />
        <Input
          type="text"
          id="username"
          label="username"
          name="username"
          disabled={mode === "login"}
        />
        <Input
          type="email"
          id="email"
          label="Email"
          name="email"
          disabled={mode === "login"}
        />
        <DropdownInput
          id="direction"
          label="Direction"
          name="directionId"
          options={useDirectionsContext().data}
          disabled={
            useDirectionsContext().isDirectionsLoading || mode === "login"
          }
        />
        <Input
          type="password"
          id="createpassword"
          label="Password"
          name="createpassword"
          disabled={mode === "login"}
        />
        <Input
          type="password"
          id="repeatpassword"
          label="Repeat Password"
          name="repeatpassword"
          disabled={mode === "login"}
        />
      </div>
    </div>
    <button
      className="button button--primary full-width"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : mode === "login" ? "Log In" : "Sign Up"}
    </button>
  </form>
);

const Input = ({id, type, label, name, disabled}) => (
  <input
    className="form-group__input"
    type={type}
    id={id}
    name={name}
    placeholder={label}
    disabled={disabled}
  />
);

const DropdownInput = ({id, label, name, options, disabled}) => (
  <select className="form-group__input" id={id} name={name} disabled={disabled}>
    <option value="">{label}</option>
    {options &&
      options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
  </select>
);

export default LoginComponent;
