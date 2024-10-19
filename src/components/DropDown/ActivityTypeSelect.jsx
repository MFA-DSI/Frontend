import React from "react";
import { Select} from "antd";


const { Option } = Select;
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
  