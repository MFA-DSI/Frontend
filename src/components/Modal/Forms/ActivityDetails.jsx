import { DatePicker, Input, Typography } from "antd";
import { dateFormatter } from "../utils/dateFormatter";
import { useState } from "react";

export const EditableField = ({
  label,
  value,
  isEditing,
  mode,
  onChange,
  inputType,
  placeholder,
  editable,
  required,
  validate, // New validation function prop
}) => {
  const [error, setError] = useState(null); // State to hold validation error message

  const handleChange = (e) => {
  
    
    // If validate function is provided, check the input
    if (validate) {
      const validationError = validate(e);
      setError(validationError);
    }
    
    onChange(e); // Update the value
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
      <Typography.Text
        strong
        style={{ minWidth: "150px", marginRight: "10px" }}
      >
        {label}:
      </Typography.Text>
      {isEditing && mode === "mydirection" && editable ? (
        inputType === "date" ? (
          <DatePicker value={value} onChange={onChange} />
        ) : (
          <div>
            <Input
              required={required}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              status={error ? 'error' : ''}
            />
            {error && (
              <Typography.Text type="danger" style={{ fontSize: "12px" }}>
                {error}
              </Typography.Text>
            )}
          </div>
        )
      ) : (
        <Typography.Text>
          {inputType === "date"
            ? dateFormatter(value?.toLocaleString()).toLocaleString() ===
              "Invalid date"
              ? "Aucune date"
              : dateFormatter(value?.toLocaleString()).toLocaleString()
            : value}
        </Typography.Text>
      )}
    </div>
  );
};
