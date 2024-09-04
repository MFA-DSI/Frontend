import React from "react";

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

export default Input;
