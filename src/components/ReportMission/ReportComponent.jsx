import React, { useState } from "react";
import { Select, Button, Card, Divider } from "antd";
import { getWeeksInMonth } from "../Table/utils/DateUtils";
import { useFilesContext } from "../../providers/context/FilesContext";
import { useAuthStore } from "../../hooks";
import { ActivityTypeSelect } from "../DropDown/ActivityTypeSelect";
import { WeeklyFilters } from "../DropDown/WeeklyFilters";
import { MonthlyFilters } from "../DropDown/MonthlyFilter";
import { QuarterlyFilters } from "../DropDown/QuarterlyFilter";

const ReportGenerator = () => {
  const {
    fetchWeeklyReportMissionXLS,
    fetchMonthlyReportMissionXLS,
    fetchQuarterlyReportMissionXLS,
  } = useFilesContext();
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
      const weekString = dateFilter.week;
      date = extractFirstDateFromString(weekString); // Extraire la première date de la semaine
    } else if (activityType === "monthly") {
      // Appel spécifique pour "monthly"
      const reportDetailsForMonth = {
        directionId,
        year: dateFilter.year, // Utilise l'année sélectionnée
        month: dateFilter.month + 1, // Mois dans le bon format (commence à 1)
        pageSize,
      };

      try {
        await fetchMonthlyReportMissionXLS(reportDetailsForMonth);
        console.log("Rapport mensuel généré avec succès !");
      } catch (error) {
        console.error(
          "Erreur lors de la génération du rapport mensuel :",
          error,
        );
      }
      return;
    } else if (activityType === "quarterly") {
      // Appel spécifique pour "quarterly"
      const reportDetailsForQuarter = {
        directionId,
        year: dateFilter.year, // Utilise l'année sélectionnée
        quarter: dateFilter.quarter, // Trimestre sélectionné
        pageSize,
      };

      try {
        await fetchQuarterlyReportMissionXLS(reportDetailsForQuarter);
        console.log("Rapport trimestriel généré avec succès !");
      } catch (error) {
        console.error(
          "Erreur lors de la génération du rapport trimestriel :",
          error,
        );
      }
      return;
    }

    const reportDetails = {
      directionId,
      date,
      pageSize,
    };

    try {
      await fetchWeeklyReportMissionXLS(reportDetails);
      console.log("Rapport généré avec succès !");
    } catch (error) {
      console.error("Erreur lors de la génération du rapport :", error);
    }
  };

  const style = {
    width: "100%",
    marginTop: "10px",
    marginBottom: "10px",
  };

  return (
    <Card title="Générateur de Rapport" style={{ width: 400, margin: "auto" }}>
      <h2>Choisissez les options de rapport</h2>
      <Divider />
      <ActivityTypeSelect
        filtered={false}
        style={style}
        activityType={activityType}
        setActivityType={setActivityType}
        setDateFilter={setDateFilter}
      />

      {activityType === "weekly" && (
        <WeeklyFilters
          style={style}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          getWeeksInMonth={getWeeksInMonth}
        />
      )}

      {activityType === "monthly" && (
        <MonthlyFilters
          style={style}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      )}

      {activityType === "quarterly" && (
        <QuarterlyFilters
          style={style}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
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
