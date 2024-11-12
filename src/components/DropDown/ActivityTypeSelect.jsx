import React from "react";
import { Select, Tooltip } from "antd";

const { Option } = Select;

export const ActivityTypeSelect = ({
  activityType,
  setActivityType,
  setFilterType,
  setDateFilter,
  setActivityTypeFilter,
  style,
  filtered,
}) => (
  <>
    <Tooltip title={filtered ? "Veuillez réinitialiser votre filtre" : ""}>
      <span>
        <Select
          value={activityType}
          style={style}
          onChange={(value) => {
            if (!filtered) {
              setActivityType(value);
              setFilterType(value);
              setDateFilter({
                month: null,
                week: null,
                year: null,
                quarter: null,
              });
              setActivityTypeFilter(value);
            }
          }}
          disabled={filtered} // Désactive le Select si le filtre est actif
        >
          <Option value="all">Toutes les Activités</Option>
          <Option value="weekly">Hebdomadaire</Option>
          <Option value="monthly">Mensuel</Option>
          <Option value="quarterly">Trimestriel</Option>
        </Select>
      </span>
    </Tooltip>
  </>
);
