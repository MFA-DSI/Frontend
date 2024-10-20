import React, { useState } from "react";
import { Select, Button, Card, Divider } from "antd";
import { getWeeksInMonth } from "../Table/utils/DateUtils"; 
import { useFilesContext } from "../../providers/context/FilesContext";
import { useAuthStore } from "../../hooks";

const { Option } = Select;

const ReportGenerator = () => {
  const { fetchWeeklyReportMissionXLS } = useFilesContext();
  const directionId = useAuthStore.getState().directionId;
  const [activityType, setActivityType] = useState("weekly");
  const [dateFilter, setDateFilter] = useState({
    month: null,
    week: null,
    year: null,
    quarter: null,
  });

  const [pageSize, setPageSize] = useState("50"); // Example page size

  const isButtonDisabled = () => {
    if (activityType === "weekly") {
      return !dateFilter.month || !dateFilter.week;
    }
    if (activityType === "monthly") {
      return !dateFilter.year || !dateFilter.month;
    }
    if (activityType === "quarterly") {
      return !dateFilter.year || !dateFilter.quarter;
    }
    return false;
  };

  const extractFirstDateFromString = (dateString) => {
    const regex = /(\d{2}\/\d{2}\/\d{4})/; // Matches the format "dd/mm/yyyy"
    const match = dateString.match(regex);
    return match ? match[0] : null; // Return the matched date or null if not found
  };

  const handleGenerateReport = async () => {
    let date = "";

    if (activityType === "weekly") {
      // Assuming your week format string is in this form
      const weekString = dateFilter.week
      date = extractFirstDateFromString(weekString); // Extract the first date
    } else if (activityType === "monthly") {
      date = `2024-${dateFilter.month + 1}-01`; // Example: format as "YYYY-MM-01"
    } else if (activityType === "quarterly") {
      date = `2024-${dateFilter.quarter}`; // Example: format as "YYYY-QX"
    }

    console.log("date", date);
    
    const reportDetails = {
      directionId,
      date,
      pageSize,
    };

    try {
      // Call the function to fetch the report
      await fetchWeeklyReportMissionXLS(reportDetails);
      console.log("Report generated successfully!");
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <Card title="Générateur de Rapport" style={{ width: 400, margin: "auto" }}>
      <h2>Choisissez les options de rapport</h2>
      <Divider />
      <Select
        defaultValue="weekly"
        style={{ width: "100%", marginBottom: "16px" }}
        onChange={(value) => {
          setActivityType(value);
          setDateFilter({ month: null, week: null, year: null, quarter: null }); // Reset date filters on activity type change
        }}
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
              setDateFilter({ ...dateFilter, month: value, week: null }); // Reset week when month changes
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
              {getWeeksInMonth(dateFilter.month, new Date().getFullYear()).map(
                (week, index) => (
                  <Option key={index} value={week} >
                    {week}
                  </Option>
                )
              )}
            </Select>
          )}
        </>
      )}

      {activityType === "monthly" && (
        <>
          <Select
            placeholder="Année"
            style={{ width: "100%", marginBottom: "16px" }}
            onChange={(value) => setDateFilter({ ...dateFilter, year: value })}
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
            onChange={(value) => setDateFilter({ ...dateFilter, year: value })}
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

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
      >
        <Button
          type="primary"
          disabled={isButtonDisabled()}
          onClick={handleGenerateReport}
        >
          Générer le rapport
        </Button>
      </div>
    </Card>
  );
};

export default ReportGenerator;
