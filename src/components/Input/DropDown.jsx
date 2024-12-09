import React from "react";
import { Select } from "antd";
import "./assets/index.css";

const { Option } = Select;

export const DropdownInput = ({
  id,
  label,
  name,
  options,
  disabled,
  selectedValue,
  onChange,
}) => (
  <Select
    id={id}
    name={name}
    disabled={disabled}
    value={selectedValue}
    onChange={onChange}
    placeholder={label}
    className="form-group__input"
  >
    {options &&
      options.map((option) => (
        <Option key={option.id} value={option.id}>
          {option.name}
        </Option>
      ))}
  </Select>
);
