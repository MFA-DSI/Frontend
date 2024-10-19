import { Select } from "antd";
import React from "react";

const { Option } = Select;
export const MonthlyFilters = ({ dateFilter, setDateFilter }) => (
    <>
      <Select
        placeholder="Année"
        style={{ width: 100 }}
        onChange={(value) => setDateFilter({ ...dateFilter, year: value })}
      >
        <Option value="2023">2023</Option>
        <Option value="2024">2024</Option>
      </Select>
  
      <Select
        placeholder="Mois"
        style={{ width: 100, marginRight: "8px" }}
        onChange={(value) => setDateFilter({ ...dateFilter, month: value })}
      >
        {Array.from({ length: 12 }, (_, index) => (
          <Option key={index} value={index}>
            {new Date(0, index).toLocaleString("fr-FR", { month: "long" })}
          </Option>
        ))}
      </Select>
    </>
  );
  