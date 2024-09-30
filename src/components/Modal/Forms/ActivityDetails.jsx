import { DatePicker, Input } from "antd";
import react from "react";

export const EditableField = ({
  label,
  value,
  isEditing,
  mode,
  onChange,
  inputType,
  placeholder,
}) => {
  return (
    <div>
      <h3>{label}:</h3>
      {isEditing && mode === "mydirection" ? (
        inputType === "date" ? (
          <DatePicker value={value} onChange={onChange} />
        ) : (
          <Input value={value} onChange={onChange} placeholder={placeholder} />
        )
      ) : (
        <p>{inputType === "date" ? value?.toLocaleString() : value}</p>
      )}
    </div>
  );
};
