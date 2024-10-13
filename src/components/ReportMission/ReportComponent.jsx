import React, { useState } from "react";
import { Select, Button, Card, Divider } from "antd";

const { Option } = Select;

const ReportGenerator = () => {
  const [activityType, setActivityType] = useState("weekly");
  const [dateFilter, setDateFilter] = useState({
    month: null,
    week: null,
    year: null,
    quarter: null,
  });

  const getWeeksInMonth = (month, year) => {
    const weeks = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
  
    for (let date = firstDay; date <= lastDay; date.setDate(date.getDate() + 7)) {
      const weekNumber = Math.ceil(date.getDate() / 7);
      weeks.push(`Semaine ${weekNumber} (${date.toLocaleDateString('fr-FR')})`);
    }
  
    return weeks;
  };

  return (
    <Card title="Générateur de Rapport" style={{ width: 400, margin: "auto" }}>
      <h2>Choisissez les options de rapport</h2>
      <Divider />
      <Select
        defaultValue="weekly"
        style={{ width: "100%", marginBottom: "16px" }}
        onChange={setActivityType}
      >
        <Option value="weekly">Hebdomadaire</Option>
        <Option value="monthly">Mensuel</Option>
        <Option value="quarterly">Trimestriel</Option>
      </Select>

      {activityType === "weekly" && (
        <>
          <Select
            placeholder="Mois"
            style={{ width: "100%", marginBottom: "16px" }}
            onChange={(value) => {
              setDateFilter({ ...dateFilter, month: value });
              setDateFilter((prev) => ({ ...prev, week: null })); // Reset week when month changes
            }}
          >
            {Array.from({ length: 12 }, (_, index) => (
              <Option key={index} value={index}>
                {new Date(0, index).toLocaleString("fr-FR", {
                  month: "long",
                })}
              </Option>
            ))}
          </Select>

          {dateFilter.month !== null && (
            <Select
              placeholder="Semaine"
              style={{ width: "100%", marginBottom: "16px" }}
              onChange={(value) =>
                setDateFilter({ ...dateFilter, week: value })
              }
            >
              {getWeeksInMonth(
                dateFilter.month,
                new Date().getFullYear(),
              ).map((week, index) => (
                <Option key={index} value={week}>
                  {week}
                </Option>
              ))}
            </Select>
          )}
        </>
      )}

      {activityType === "monthly" && (
        <>
          <Select
            placeholder="Année"
            style={{ width: "100%", marginBottom: "16px" }}
            onChange={(value) => 
              setDateFilter({ ...dateFilter, year: value })
            }
          >
            <Option value="2023">2023</Option>
            <Option value="2024">2024</Option>
          </Select>
          {dateFilter.year && (
            <Select
              placeholder="Mois"
              style={{ width: "100%", marginBottom: "16px" }}
              onChange={(value) =>
                setDateFilter({ ...dateFilter, month: value })
              }
            >
              {Array.from({ length: 12 }, (_, index) => (
                <Option key={index} value={index}>
                  {new Date(0, index).toLocaleString("fr-FR", {
                    month: "long",
                  })}
                </Option>
              ))}
            </Select>
          )}
        </>
      )}

      {activityType === "quarterly" && (
        <>
          <Select
            placeholder="Année"
            style={{ width: "100%", marginBottom: "16px" }}
            onChange={(value) => 
              setDateFilter({ ...dateFilter, year: value })
            }
          >
            <Option value="2023">2023</Option>
            <Option value="2024">2024</Option>
          </Select>
          {dateFilter.year && (
            <Select
              placeholder="Trimestre"
              style={{ width: "100%", marginBottom: "16px" }}
              onChange={(value) =>
                setDateFilter({ ...dateFilter, quarter: value })
              }
            >
              <Option value="Q1">Q1</Option>
              <Option value="Q2">Q2</Option>
              <Option value="Q3">Q3</Option>
              <Option value="Q4">Q4</Option>
            </Select>
          )}
        </>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
        <Button type="primary" disabled={!dateFilter.week && !dateFilter.month && !dateFilter.year && !dateFilter.quarter}>
          Générer le rapport
        </Button>
      </div>
    </Card>
  );
};

export default ReportGenerator;
