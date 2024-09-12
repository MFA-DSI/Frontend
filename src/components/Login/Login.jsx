import {useNavigate} from "react-router-dom";
import {authProvider} from "../../providers/auth-provider";
import "./assets/index.scss";
import React, {useState} from "react";
import {resetValues} from "../../lib/reset";
import {useDirectionsContext} from "../../providers/context/DirectionContext";
import {DropdownInput} from "../Input/DropDown";
import {signInProvider} from "../../providers/user-provider";
import {grades} from "./utils/Grade";

const {login} = authProvider;
const {save} = signInProvider;

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

        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        await save({
          username: data.username,
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          grade: data.grade,
          function: data.function,
          directionId: data.directionId,
          password: data.createpassword,
        });

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
    <>
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
    </>
  );
};

const LoginForm = ({mode, onSubmit, isLoading}) => {
  const [selectedGrade, setSelectedGrade] = useState("");
  const [formValues, setFormValues] = React.useState({
    directionId: "",
    grade: "",
  });

  const handleDropdownChange = (field) => (value) => {
    setFormValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  return (
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

          <DropdownInput
            id="grade-select"
            label="Select Grade"
            name="grade"
            options={grades.map((grade) => ({name: grade.name}))}
            disabled={mode === "login"}
          />
          <Input
            type="text"
            id="function"
            label="function"
            name="function"
            disabled={mode === "login"}
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
};

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

export default LoginComponent;
