import React from "react";
import "./assets/index.css";
export const DropdownInput = ({id, label, name, options, disabled}) => (
  <select
    className="form-group__input dropdown-input"
    id={id}
    name={name}
    disabled={disabled}
  >
    <option value="" className="slide">
      {label}
    </option>
    {options &&
      options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
  </select>
);
