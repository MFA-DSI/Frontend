import { Select } from "antd";
import React from "react";

const { Option } = Select;
export const WeeklyFilters = ({
  dateFilter,
  setDateFilter,
  getWeeksInMonth,
}) => (
  <>
    <Select
      placeholder="Mois"
      style={{ width: 100, marginRight: "8px" }}
      onChange={(value) => {
        setDateFilter({ ...dateFilter, month: value });
      }}
    >
      {Array.from({ length: 12 }, (_, index) => (
        <Option key={index} value={index}>
          {new Date(0, index).toLocaleString("fr-FR", { month: "long" })}
        </Option>
      ))}
    </Select>

    <Select
      placeholder="Semaine"
      style={{ width: 200 }}
      onChange={(value) => setDateFilter({ ...dateFilter, week: value })}
    >
      {dateFilter.month !== null &&
        getWeeksInMonth(dateFilter.month, new Date().getFullYear()).map(
          (week, index) => (
            <Option key={index} value={week}>
              {week}
            </Option>
          ),
        )}
    </Select>
  </>
);
