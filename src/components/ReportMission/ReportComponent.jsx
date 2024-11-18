import React, { useState } from "react";
import { Select, Button, Card, Checkbox, Table } from "antd";
import { ActivityTypeSelect } from "../DropDown/ActivityTypeSelect";
import { WeeklyFilters } from "../DropDown/WeeklyFilters";
import { useFilesContext } from "../../providers/context/FilesContext";
import { useAuthStore } from "../../hooks";
import { getWeeksInMonthWithOverflow } from "../Table/utils/DateUtils";
import DeleteRequestModal from "../Modal/RejectedDemand";

const { Option } = Select;

const ReportGenerator = () => {
  const { fetchWeeklyReportMissionXLS } = useFilesContext();
  const directionId = useAuthStore.getState().directionId;

  const [reportScope, setReportScope] = useState("myDirection");
  const [activityType, setActivityType] = useState("weekly");
  const [subDirections, setSubDirections] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    month: null,
    week: null,
    year: null,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rejectComment, setRejectComment] = useState("");
  const [rejectRecordId, setRejectRecordId] = useState(null);
  
  // Ouvrir la modal
  const handleReject = (id) => {
    setRejectRecordId(id);
    setIsModalVisible(true);
  };
  
  // Fermer la modal
  const handleModalClose = () => {
    setIsModalVisible(false);
    setRejectComment("");
    setRejectRecordId(null);
  };
  
  // Gérer le refus
  const handleRejectConfirm = () => {
    console.log("Refusé avec le commentaire :", rejectComment);
    console.log("ID de la demande refusée :", rejectRecordId);
  
    // Logique pour envoyer le commentaire au backend
  
    handleModalClose(); // Ferme la modal après action
  };
  // Example data for the tables
  const reportRequests = [
    { key: 1, title: "Demande 1", status: "En attente" },
    { key: 2, title: "Demande 2", status: "En attente" },
  ];

  const acceptedReports = [
    { key: 1, title: "Rapport 1", status: "Accepté" },
    { key: 2, title: "Rappodqsjdqlkjshdlkqgdkjqghsdkhfsldkjfhsldjgfskjdgfksjdgjgkjhlkqjshdklqjshdlqkhrt 2", status: "Accepté" },
  ];

  const tableStyle = {
    width: "100%",
    overflowX: "auto", // Pour éviter les débordements
  };
  
  const columnStyle = {
    whiteSpace: "normal", // Autorise le wrapping du texte
    wordWrap: "break-word", // Coupe le texte si nécessaire
    wordBreak: "break-word", // Prend en charge les longues chaînes sans espaces
  };
  


  const handleRemindReport = (record) => {
    console.log(`Rappeler la demande de rapport pour : ${record.title}`);
    // Ajoutez ici la logique pour relancer la demande de rapport
  };

  const handleExportToExcel = (record) => {
    console.log(`Exporter en Excel : ${record.title}`);
    // Ajoutez ici la logique pour exporter le rapport en Excel
  };

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
    } catch (error) {
      console.error("Erreur lors de la génération du rapport :", error);
    }
  };
  

  const reportRequestColumns = [
    { title: "Titre", dataIndex: "title", key: "title" },
    {
      title: "Direction demandeur",
      dataIndex: "requestingDirection",
      key: "requestingDirection",
      render: (text) => <div style={columnStyle}>{text}</div>,
    },
    {
      title: "Date d'acceptation",
      dataIndex: "acceptedDate",
      key: "acceptedDate",
      render: (text) => <div style={columnStyle}>{text}</div>,
    },
   
    { title: "Statut", dataIndex: "status", key: "status" },
   
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="primary"
            onClick={() => handleApprove(record.id)}
          >
            Approuver
          </Button>
          <Button
            type="danger"
            onClick={() => handleReject(record.id)}
          >
            Refuser
          </Button>

          <Button type="primary-outlined" onClick={() => handleReminder(record.id)}>
          Rappeler
        </Button>
        </div>
      ),
    },
  ];

  const acceptedReportColumns = [
    { title: "Titre", dataIndex: "title", key: "title" },
    { title: "Statut", dataIndex: "status", key: "status" },
    {
      title: "Direction demandée",
      dataIndex: "requestedDirection",
      key: "requestedDirection",
      render: (text) => <div style={columnStyle}>{text}</div>,
    },
    {
      title: "Date de création",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => <div style={columnStyle}>{text}</div>,
    },
   
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleExport(record.id)}>
          Exporter en Excel
        </Button>
      ),
    },
  ];

  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflowY: "auto",
        gap: "16px",
        padding: "16px",
      }}
    >
      {/* Section 1 : Générateur de rapport */}
      <Card title="Générateur de Rapport" style={{ width: "100%" }}>
        <Select
          value={reportScope}
          onChange={(value) => setReportScope(value)}
          style={{ width: "100%", marginBottom: "16px" }}
        >
          <Option value="myDirection">Ma direction</Option>
          <Option value="subDirections">Mes sous-directions</Option>
        </Select>

        {reportScope === "myDirection" && (
          <>
            <ActivityTypeSelect
              filtered={false}
              style={{ width: "100%", marginBottom: "16px" }}
              activityType={activityType}
              setActivityType={setActivityType}
              setDateFilter={setDateFilter}
            />
            {activityType === "weekly" && (
              <WeeklyFilters
                style={{ width: "100%", marginBottom: "16px" }}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                getWeeksInMonth={getWeeksInMonthWithOverflow}
              />
            )}
          </>
        )}

{reportScope === "subDirections" && (
  <>
    <Checkbox.Group
      options={[
        { label: "Sous-direction 1", value: "1" },
        { label: "Sous-direction 2", value: "2" },
        { label: "Sous-direction 1", value: "3" },
        { label: "Sous-direction 2", value: "4" },
        { label: "Sous-direction 1", value: "5" },
        { label: "Sous-direction 2", value: "6" },
        { label: "Sous-direction 1", value: "7" },
        { label: "Sous-direction 2", value: "8" },
        { label: "Sous-direction 1", value: "9" },
        { label: "Sous-direction 2", value: "10" },
      ]}
      value={subDirections}
      onChange={(checkedValues) => setSubDirections(checkedValues)}
      style={{ marginBottom: "16px" }}
    />
    <ActivityTypeSelect
      filtered={false}
      style={{ width: "100%", marginBottom: "16px" }}
      activityType={activityType}
      setActivityType={setActivityType}
      setDateFilter={setDateFilter}
    />
    {activityType === "weekly" && (
      <WeeklyFilters
        style={{ width: "100%", marginBottom: "16px" }}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        getWeeksInMonth={getWeeksInMonthWithOverflow}
      />
    )}
  </>
)}


        <div style={{ textAlign: "right" }}>
          <Button
            type="primary"
            onClick={handleGenerateReport}
            disabled={reportScope === "myDirection" && !dateFilter.week}
          >
            Générer le rapport
          </Button>
        </div>
      </Card>

      {/* Section 2 : Demandes de rapport */}
      <Card title="Demandes de Rapport" style={{ width: "100%" }}>
        <Table
          dataSource={reportRequests}
          columns={reportRequestColumns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
        />
      </Card>

      {/* Section 3 : Rapports acceptés */}
      <Card title="Rapports Acceptés" style={{ width: "100%" }}>
        <Table
         style={tableStyle}
          dataSource={acceptedReports}
          columns={acceptedReportColumns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: true }}
        />
      </Card>

      <DeleteRequestModal
  visible={isModalVisible}
  onClose={handleModalClose}
  onCancel={handleModalClose}
  onConfirm={handleRejectConfirm}
  comment={rejectComment}
  setComment={setRejectComment}
/>
    </div>

    
  );
};

export default ReportGenerator;
