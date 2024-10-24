import { Select } from "antd";
import React from "react";

const { Option } = Select;

export const QuarterlyFilters = ({ dateFilter, setDateFilter, style }) => (
  <>
    <Select
      placeholder="Année"
      style={{ width: 100, marginRight: "8px" }}
      onChange={(value) => setDateFilter({ ...dateFilter, year: value })}
    >
      <Option value="2023">2023</Option>
      <Option value="2024">2024</Option>
    </Select>

    <Select
      placeholder="Trimestre"
      style={{ width: 100 }}
      onChange={(value) => setDateFilter({ ...dateFilter, quarter: value })}
    >
      <Option value="1">Q1</Option>
      <Option value="2">Q2</Option>
      <Option value="3">Q3</Option>
      <Option value="4">Q4</Option>
    </Select>
  </>
);