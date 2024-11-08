import { Select } from "antd";
import React from "react";

const { Option } = Select;

export const WeeklyFilters = ({
  dateFilter,
  setDateFilter,
  getWeeksInMonth,
  style,
}) => {
  const handleMonthChange = (value) => {
    // Mettre à jour le mois et réinitialiser la semaine
    setDateFilter({ ...dateFilter, month: value, week: null });
  };

  const handleWeekChange = (value) => {
    // Mettre à jour uniquement la semaine
    setDateFilter({ ...dateFilter, week: value });
  };

  return (
    <>
      <Select
        placeholder="Mois"
        style={style}
        value={dateFilter.month !== null ? dateFilter.month : undefined}
        onChange={handleMonthChange}
      >
        {Array.from({ length: 12 }, (_, index) => (
          <Option key={index} value={index}>
            {new Date(0, index).toLocaleString("fr-FR", { month: "long" })}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="Semaine"
        style={{ width: "100%" }}
        value={dateFilter.week || undefined}
        onChange={handleWeekChange}
        disabled={dateFilter.month === null}
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
};
