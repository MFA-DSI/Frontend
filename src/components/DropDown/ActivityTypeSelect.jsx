import {react} from react;
import { Select,Option } from "antd";

export const ActivityTypeSelect = ({ activityType, setActivityType, setFilterType, setDateFilter }) => (
    <Select
      value={activityType}
      style={{ width: 120, marginRight: "5px" }}
      onChange={(value) => {
        setActivityType(value);
        setFilterType(value);
        setDateFilter({
          month: null,
          week: null,
          year: null,
          quarter: null,
        });
      }}
    >
      <Option value="all">Toutes les Activités</Option>
      <Option value="weekly">Hebdomadaire</Option>
      <Option value="monthly">Mensuel</Option>
      <Option value="quarterly">Trimestriel</Option>
    </Select>
  );
  