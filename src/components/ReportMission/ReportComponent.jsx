import React, { useEffect, useState } from "react";
import {
  Select,
  Button,
  Card,
  Checkbox,
  Table,
  Badge,
  Typography,
  message,
} from "antd";
import { ActivityTypeSelect } from "../DropDown/ActivityTypeSelect";
import { WeeklyFilters } from "../DropDown/WeeklyFilters";
import { useFilesContext } from "../../providers/context/FilesContext";
import { useAuthStore } from "../../hooks";
import { getWeeksInMonthWithOverflow } from "../Table/utils/DateUtils";
import DeleteRequestModal from "../Modal/RejectedDemand";
import { useDirectionsContext, useMissionContext } from "../../providers";
import {
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
} from "@ant-design/icons";
import { MonthlyFilters } from "../DropDown/MonthlyFilter";
import { QuarterlyFilters } from "../DropDown/QuarterlyFilter";
const { Option } = Select;

const ReportGenerator = () => {
  const {
    fetchWeeklyReportMissionXLS,
    fetchMonthlyReportMissionXLS,
    fetchQuarterlyReportMissionXLS,
    fetchOtherDirectionRepport,
  } = useFilesContext();
  const { fetchAllSubDirections, isSubDirectionLoading } =
    useDirectionsContext();
  const {
    requestReport,
    respondToDirectionReportRequest,
    fetchAllRequests,
    fetchAllTargets,
    recallDirectionReport,
    deleteDirectionReport,
  } = useMissionContext();
  const directionId = useAuthStore.getState().directionId;
  const userId = useAuthStore.getState().userId;

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

  const weeklyDropDownStyle = { width: 240, marginRight: "8px" };
  const monthlyDropDownStyle = { width: 100 };
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
  const data = fetchAllSubDirections;

  const options = data.map((subDirection) => ({
    label: subDirection.acronym, // 'name' est le nom de la sous-direction
    value: subDirection.id, // 'id' est l'identifiant de la sous-direction
  }));

  const tableStyle = {
    width: "100%",
    overflowX: "auto", // Pour éviter les débordements
  };

  const columnStyle = {
    whiteSpace: "normal", // Autorise le wrapping du texte
    wordWrap: "break-word", // Coupe le texte si nécessaire
    wordBreak: "break-word", // Prend en charge les longues chaînes sans espaces
  };
  const localeSettings = {
    filterConfirm: "Filtrer ", // Remplace "OK" par "Valider"
    filterReset: "Réinitialiser", // Remplace "Reset" par "Réinitialiser"
    emptyText: "Aucune demande correpondante",
  };
  const handleRemindReport = (record) => {
    console.log(`Rappeler la demande de rapport pour : ${record.title}`);
    // Ajoutez ici la logique pour relancer la demande de rapport
  };
  const handleExportToExcel = async (record) => {
    console.log(`Exporter en Excel : ${record}`);
    const params = {
      requestId: record,
    };
    // Appeler la fonction fetchOtherDirectionRepport avant l'exportation
    try {
      const response = await fetchOtherDirectionRepport(params);

      // Ajoutez ici la logique pour exporter le rapport en Excel
      console.log("Exportation en cours...");
    } catch (error) {
      console.error("Erreur lors de la récupération du rapport :", error);
    }
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

  const handleApprove = async (record, status) => {
    // Construction des détails pour l'approbation
    const requestDetails = {
      requestId: record.id, // Identifiant de la demande
      targetDirectionId: record.targetDirection.id, // Direction cible
      status: status, // Statut (par ex. "approved" ou "rejected")
      comment: null, // Commentaire (optionnel)
    };

    try {
      // Appel à respondToDirectionReportRequest avec les détails
      await respondToDirectionReportRequest(requestDetails);
    } catch (error) {
      console.error(`Erreur lors du traitement de la demande ${id} :`, error);
    }
  };

  const handleReminder = async (id) => {
    try {
      await recallDirectionReport(id);
    } catch (error) {
      message.error("une erreur est survenue lors du rappel");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDirectionReport(id);
    } catch (error) {
      message.error("une erreur est survenue lors de la suppression");
    }
  };

  const handleGenerateReport = async () => {
    let date = "";

    if (reportScope === "subDirections") {
      const reportDetails = {
        requesterDirectionId: directionId,
        subDirectionIds: subDirections, // Liste des sous-directions
        responsibleId: userId, // Identifiant du responsable
        weekStartDate: date || extractFirstDateFromString(dateFilter.week), // Semaine sélectionnée ou extraite
      };

      console.log("Détails du rapport : ", reportDetails);

      try {
        // Appel de l'API pour générer les rapports
        const response = await requestReport(reportDetails);
        setSubDirections([]);
        setActivityType("all");
        // Vérifier si une réponse détaillée est retournée
        if (response && Array.isArray(response)) {
          // Trier les résultats pour succès et erreurs
          const successes = response.filter((res) => res.status === "SUCCESS");
          const errors = response.filter((res) => res.status === "ERROR");

          // Afficher les succès
          if (successes.length > 0) {
            message.success({
              content: (
                <>
                  <strong>Rapports générés avec succès :</strong>
                  <ul>
                    {successes.map((s, index) => (
                      <li key={index}>
                        {s.data.description} enoyée avec succées
                      </li>
                    ))}
                  </ul>
                </>
              ),
              duration: 8, // Durée en secondes pour l'affichage du message
            });
          }

          // Afficher les erreurs
          if (errors.length > 0) {
            errors.forEach((error) => {
              message.info(
                `Information pour la sous-direction ${error.message}`,
                10, // Durée en secondes
              );
            });
          }
        } else {
          // Succès global sans réponse détaillée
          message.success(
            "Rapport généré avec succès pour les sous-directions !",
          );
        }
      } catch (error) {
        // Erreurs globales non spécifiques
        console.error(
          "Erreur lors de la génération du rapport pour les sous-directions :",
          error,
        );
      }
      return;
    }

    if (activityType === "weekly") {
      const weekString = dateFilter.week;
      date = extractFirstDateFromString(weekString); // Extraire la première date de la semaine
    } else if (activityType === "monthly") {
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
      console.log("Rapport hebdomadaire généré avec succès !");
    } catch (error) {
      console.error("Erreur lors de la génération du rapport :", error);
    }
  };

  const reportRequestColumns = [
    { title: "Titre", dataIndex: "description", key: "description" }, // Utilise "description" pour le titre

    {
      title: "Direction demandeur",
      dataIndex: "requesterDirection", // Correspond à DirectionNameDTO
      key: "requesterDirection",
      render: (direction) => (
        <div style={columnStyle}>{direction?.acronym || "N/A"}</div>
      ),
    },

    {
      title: "Direction cible",
      dataIndex: "targetDirection", // Correspond également à DirectionNameDTO
      key: "targetDirection",
      render: (direction) => (
        <div style={columnStyle}>{direction?.acronym || "N/A"}</div>
      ),
    },

    {
      title: "Date de création",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <div style={columnStyle}>
          {date ? new Date(date).toLocaleDateString() : "N/A"}
        </div>
      ),
    },

    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "En attente", value: "PENDING" },
        { text: "Approuvé", value: "APPROVED" },
        { text: "Rejeté", value: "REJECTED" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color;
        let label;

        // Détermine la couleur et le label basé sur le statut
        switch (status) {
          case "PENDING":
            color = "orange";
            label = "En attente";
            break;
          case "APPROVED":
            color = "green";
            label = "Approuvé";
            break;
          case "REJECTED":
            color = "red";
            label = "Rejeté";
            break;
          default:
            color = "gray";
            label = "Inconnu";
        }
        return <Badge color={color} text={label} />;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const isRequestingDirection =
          directionId === record.requesterDirection.id;
        const isTargetDirection = directionId === record.targetDirection.id;

        // Si la direction correspond à la demandeur, afficher "Rappeler" ou "Annuler"
        if (isRequestingDirection) {
          return (
            <div style={{ display: "flex", gap: "8px" }}>
              {(() => {
                if (record.status === "APPROVED") {
                  return (
                    <>
                      <Button
                        icon={<FileExcelOutlined style={{ color: "green" }} />}
                        color="green"
                        onClick={() => handleExportToExcel(record.id)}
                      >
                        Exporter
                      </Button>
                      <Button
                        danger
                        color="danger"
                        variant="filled"
                        onClick={() => handleDelete(record.id)}
                      >
                        Supprimer
                      </Button>
                    </>
                  );
                } else if (record.status === "PENDING") {
                  return (
                    <>
                      <Button
                        type="primary"
                        variant="dashed"
                        onClick={() => handleReminder(record.id)}
                      >
                        Rappeler
                      </Button>
                      <Button
                        color="danger"
                        variant="filled"
                        onClick={() => handleDelete(record.id)}
                      >
                        Annuler
                      </Button>
                    </>
                  );
                } else {
                  return (
                    <>
                      <i>
                        {record.comment ? record.comment : "Aucun commentaire"}
                      </i>
                    </>
                  );
                }
              })()}
            </div>
          );
        }

        // Si la direction correspond à la cible, afficher "Approuver" et "Refuser"
        if (isTargetDirection && record.status === "PENDING") {
          return (
            <div style={{ display: "flex", gap: "8px" }}>
              <Button type="primary" onClick={() => handleApprove(record.id)}>
                Approuver
              </Button>
              <Button
                color="danger"
                variant="filled"
                onClick={() => handleReject(record.id)}
              >
                Refuser
              </Button>
            </div>
          );
        } else if (isRequestingDirection && record.status === "APPROVED") {
          <Button
            color="danger"
            variant="filled"
            onClick={() => handleReject(record.id)}
          >
            Refuser
          </Button>;
        }

        // Si aucune des deux directions ne correspond, afficher une Badge
        return <Badge color="gray" text="Aucune action disponible" />;
      },
    },
  ];

  const acceptedReportColumns = [
    { title: "Titre", dataIndex: "description", key: "description" }, // Utilise "description" pour le titre

    {
      title: "Direction demandeur",
      dataIndex: "requesterDirection", // Correspond à DirectionNameDTO
      key: "requesterDirection",
      render: (direction) => (
        <div style={columnStyle}>{direction?.acronym || "N/A"}</div>
      ),
    },

    {
      title: "Date de création",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <div style={columnStyle}>
          {date ? new Date(date).toLocaleDateString() : "N/A"}
        </div>
      ),
    },

    {
      title: "Statut",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "En attente", value: "PENDING" },
        { text: "Approuvé", value: "APPROVED" },
        { text: "Rejeté", value: "REJECTED" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color;
        let label;

        // Détermine la couleur et le label basé sur le statut
        switch (status) {
          case "PENDING":
            color = "orange";
            label = "En attente";
            break;
          case "APPROVED":
            color = "green";
            label = "Approuvé";
            break;
          case "REJECTED":
            color = "red";
            label = "Rejeté";
            break;
          default:
            color = "gray";
            label = "Inconnu";
        }
        return <Badge color={color} text={label} />;
      },
    },

    {
      title: "Observation",
      key: "action",
      render: (_, record) => {
        const directionId = localStorage.getItem("directionId"); // Remplacez par l'ID de la direction actuelle (par exemple, venant du contexte ou de props)
        const isRequestingDirection =
          directionId === record.requesterDirection.id;
        const isTargetDirection = directionId === record.targetDirection.id;

        // Si la direction correspond à la demandeur, afficher "Rappeler" ou "Annuler"
        if (isRequestingDirection) {
          return (
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                type="primary-outlined"
                onClick={() => handleReminder(record.id)}
              >
                Rappeler
              </Button>
              <Button type="danger" onClick={() => handleDelete(record.id)}>
                Annuler
              </Button>
            </div>
          );
        }
        // Si la direction correspond à la cible, afficher "Approuver" et "Refuser"
        if (isTargetDirection & (record.status === "PENDING")) {
          return (
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                type="primary"
                onClick={(id) => handleApprove(record, "APPROVED")}
              >
                Approuver
              </Button>
              <Button
                type="danger"
                onClick={() => handleReject(record, "REJECTED")}
              >
                Refuser
              </Button>
            </div>
          );
        } else if (isTargetDirection && record.status === "APPROVED") {
          return (
            <Button
              danger
              type="danger-outlined"
              onClick={() => handleDelete(record.id)}
            >
              Supprimer
            </Button>
          );
        } else {
          return (
            <>
              <i>{record.comment ? record.comment : "Aucun commentaire"}</i>
            </>
          );
        }
      },
    },
  ];
  useEffect(() => {}, [reportScope, activityType, directionId]);

  if (isSubDirectionLoading) return <p>Loading sub-directions...</p>;
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

          {fetchAllSubDirections?.length > 0 && (
            <Option value="subDirections">Mes sous-directions</Option>
          )}
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
            {activityType === "monthly" && (
              <MonthlyFilters
                style={monthlyDropDownStyle}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
              />
            )}

            {activityType === "quarterly" && (
              <QuarterlyFilters
                style={weeklyDropDownStyle}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
              />
            )}
          </>
        )}

        {reportScope === "subDirections" && (
          <>
            <Checkbox.Group
              options={options}
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

        <div style={{ textAlign: "right", marginTop: "12px" }}>
          <Button
            type="primary"
            onClick={handleGenerateReport}
            disabled={
              (reportScope === "myDirection" && !dateFilter.week) ||
              activityType == "all"
            }
          >
            Générer le rapport
          </Button>
        </div>
      </Card>

      {/* Section 2 : Demandes de rapport */}
      {fetchAllSubDirections?.length > 0 && (
        <Card title="Demandes de Rapport" style={{ width: "100%" }}>
          <Table
            dataSource={fetchAllRequests}
            columns={reportRequestColumns}
            pagination={{ pageSize: 5 }}
            scroll={{ x: true }}
            locale={localeSettings}
          />
        </Card>
      )}
      {/* Section 3 : Rapports acceptés */}
      <Card title="Rapports de ma direction" style={{ width: "100%" }}>
        <Table
          style={tableStyle}
          dataSource={fetchAllTargets}
          columns={acceptedReportColumns}
          pagination={{ pageSize: 5 }}
          locale={localeSettings}
          scroll={{ x: true }}
        />
      </Card>

      <DeleteRequestModal
        value={rejectRecordId}
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
