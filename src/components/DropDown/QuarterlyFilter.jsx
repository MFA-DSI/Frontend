import { Select } from "antd";
import React from "react";

const { Option } = Select;

export const QuarterlyFilters = ({ dateFilter, setDateFilter, style }) => {
  const handleYearChange = (value) => {
    // Mettre à jour l'année et réinitialiser le trimestre
    setDateFilter({ year: value, quarter: null });
  };

  const handleQuarterChange = (value) => {
    // Mettre à jour uniquement le trimestre
    setDateFilter({ ...dateFilter, quarter: value });
  };

  return (
    <>
      <Select
        placeholder="Année"
        style={{ width: 100, marginRight: "8px" }}
        value={dateFilter.year || undefined}
        onChange={handleYearChange}
      >
        <Option value="2023">2023</Option>
        <Option value="2024">2024</Option>
      </Select>

      <Select
        placeholder="Trimestre"
        style={{ width: 100 }}
        value={dateFilter.quarter || undefined}
        onChange={handleQuarterChange}
        disabled={!dateFilter.year}
      >
        <Option value="1">1er trimestre</Option>
        <Option value="2">2ème trimestre</Option>
        <Option value="3">3ème trimestre</Option>
        <Option value="4">4ème trimestre</Option>
      </Select>
    </>
  );
};
