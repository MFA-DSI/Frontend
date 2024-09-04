import React from "react";

const DropdownInput = ({id, label, name, options, disabled}) => (
  <select className="form-group__input" id={id} name={name} disabled={disabled}>
    <option value="">{label}</option>
    {options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name}
      </option>
    ))}
  </select>
);

export default DropdownInput;
