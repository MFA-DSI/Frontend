import { Select } from "antd";



const { Option } = Select;

export const DirectionSelect = ({ setDirectionFilter }) => (
    <Select
      defaultValue="all"
      style={{ width: 120, marginRight: "8px" }}
      onChange={setDirectionFilter}
    >
      <Option value="all">Toutes les Directions</Option>
      <Option value="Sales">Sales</Option>
      <Option value="HR">HR</Option>
      <Option value="IT">IT</Option>
      <Option value="Finance">Finance</Option>
    </Select>
  );
  