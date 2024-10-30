import { DatePicker, Input, Typography } from "antd";
import { dateFormatter } from "../utils/dateFormatter";

export const EditableField = ({
  label,
  value,
  isEditing,
  mode,
  onChange,
  inputType,
  placeholder,
  editable,
}) => {
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
          <Input value={value} onChange={onChange} placeholder={placeholder} />
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
