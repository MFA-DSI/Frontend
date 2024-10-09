import React from "react";
import { Select } from "antd";

const { Option } = Select;

const FilterSelect = ({
  defaultValue = "all",
  onChange,
  data,
  isLoading,
  isError,
  tittle,
}) => {
  if (isLoading) return <div>Loading data...</div>;
  if (isError) return <div>Error loading data.</div>;

  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 120, marginRight: "8px" }}
      onChange={onChange}
    >
      <Option value="all">{tittle}</Option>
      {data.map((value) => (
        <Option key={value.id} value={value.name}>
          {value.name}
        </Option>
      ))}
    </Select>
  );
};

export default FilterSelect;
