import React, { useEffect, useState } from "react";
import { Table, Select, Spin, Button, Checkbox, Badge } from "antd";
import { useActivitiesContext } from "../../providers/context/ActivitiesContext";
import { useMissionContext } from "../../providers/context/MissionsContext";
import {
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
} from "@ant-design/icons";
import ActivityModal from "../Modal/ActivityModal";
import MissionModal from "../Modal/MissionModal";

import "./assets/index.css";
import { getWeeksInMonth } from "./utils/DateUtils";
import { useFilesContext } from "../../providers/context/FilesContext";
import { toast } from "react-toastify";
import { useDirectionsContext } from "../../providers";
import { ActivityTypeSelect } from "../DropDown/ActivityTypeSelect";
import { DirectionSelect } from "../DropDown/DirectionSelect";
import { WeeklyFilters } from "../DropDown/WeeklyFilters";
import { MonthlyFilters } from "../DropDown/MonthlyFilter";
import { QuarterlyFilters } from "../DropDown/QuarterlyFilter";

const TableComponent = ({ mode, dataMission, dataActivities,onFilter }) => {
  const {
    isLoading: isActivityLoading,
  } = useActivitiesContext();
  const {
    isLoading: isMissionLoading,  
    weeklyMissions,
    monthlyMissions,
    quarterMissions,
    setFilterType,
    setDirectionFilter,
  } = useMissionContext();
  const { fetchMissionXLS } = useFilesContext();
  const [activityType, setActivityType] = useState("all");
  const [dateFilter, setDateFilter] = useState({
    month: null,
    week: null,
    year: null,
    quarter: null,
  });

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedMission, setSelectedMission] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMissionModalVisible, setIsMissionModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {}, [mode]);

  const showModal = (activity) => {
    setSelectedActivity(activity);
    setIsModalVisible(true);
  };

  const showMissionModal = (mission) => {
    setSelectedMission(mission);
    setIsMissionModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedActivity(null);
  };

  const handleActivitySave = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setIsModalVisible(true);
    }, 500);
  };

  const handleMissionCancel = () => {
    setIsMissionModalVisible(false);
    setSelectedMission(null);
  };

  const handleSelectChange = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((prevId) => prevId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  //TODO: separate this handler to File.ts

  const handleExport = async (type) => {
    if (type === "XLS") {
      try {
        await fetchMissionXLS(selectedIds);
        setSelectedIds([]);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const onDelete = (content) => {
    console.log(content);
  };

  const getColumns = () => {
    if (activityType === "weekly") {
      return [
        {
          title: "",
          dataIndex: "id",
          render: (id) => (
            <Checkbox
              onChange={() => handleSelectChange(id)}
              checked={selectedIds.includes(id)}
            />
          ),
          width: 50,
        },
        {
          title: "Activités Mensuelles Prévues",
          dataIndex: "description",
          width: 250,
        },
        {
          title: "Tâches Hebdomadaires",
          dataIndex: "task",
          render: (taskList) => (
            <div>
              {taskList.length > 0
                ? taskList.map((task) => (
                    <div key={task.id}>- {task.description}</div>
                  ))
                : "Aucune tâche"}
            </div>
          ),
          width: 250,
        },
        {
          title: "Tâche Prochaine",
          dataIndex: "nextTask",
          render: (nextTaskList) => (
            <div>
              {nextTaskList.length > 0
                ? nextTaskList.map((task) => (
                    <div key={task.id}>- {task.description}</div>
                  ))
                : "Aucune tâche prochaine"}
            </div>
          ),
          width: 250,
        },
        {
          title: "Observations",
          dataIndex: "observation",
          width: 150,
        },
        {
          title: "Voir Plus",
          dataIndex: "id",
          render: (id, record) => (
            <Button onClick={() => showModal(record)} type="link">
              Voir Plus
            </Button>
          ),
          width: 100,
        },
      ];
    } else {
      return [
        {
          title: "",
          dataIndex: "id",
          render: (id) => (
            <Checkbox
              onChange={() => handleSelectChange(id)}
              checked={selectedIds.includes(id)}
            />
          ),
          width: 50,
        },
        {
          title: "Missions",
          dataIndex: "description",
          render: (description, record) => (
            <div>
              {description}{" "}
              <Badge
                count={`${record.service.name}`}
                style={{ marginLeft: 10 }}
                color="green"
              ></Badge>
            </div>
          ),
          width: 250,
        },
        {
          title: "Activités",
          dataIndex: "activityList",
          render: (activityList) => {
            const firstActivity = activityList[0];
            const otherActivitiesCount = activityList.length - 1;

            return (
              <div>
                {firstActivity ? firstActivity.description : "Aucune activité"}
                {otherActivitiesCount > 0 && (
                  <Badge
                    count={`${otherActivitiesCount} autre(s)`}
                    color={"green"}
                    style={{ marginLeft: 8 }}
                  />
                )}
              </div>
            );
          },
          width: 250,
        },
        {
          title: "Indicateur",
          dataIndex: "activityList",
          render: (activityList) => {
            const performanceRealizations =
              activityList[0]?.performanceRealization;
            const otherIndicatorsCount = performanceRealizations
              ? performanceRealizations.length - 1
              : 0;

            return (
              <div>
                {performanceRealizations && performanceRealizations.length > 0
                  ? performanceRealizations[0].realization
                  : "Aucun indicateur"}
                {otherIndicatorsCount > 0 && (
                  <Badge
                    count={`${otherIndicatorsCount} autre(s)`}
                    color={"blue"}
                    style={{ marginLeft: 8 }}
                  />
                )}
              </div>
            );
          },
          width: 250,
        },
        {
          title: "Réalisation",
          dataIndex: "activityList",
          render: (activityList) => {
            const performanceRealizations =
              activityList[0]?.performanceRealization;
            const otherRealizationsCount = performanceRealizations
              ? performanceRealizations.length - 1
              : 0;

            return (
              <div>
                {performanceRealizations && performanceRealizations.length > 0
                  ? performanceRealizations[0].indicators
                  : "Aucune réalisation"}
                {otherRealizationsCount > 0 && (
                  <Badge
                    count={`${otherRealizationsCount} autre(s)`}
                    color={"yellow"}
                    style={{ marginLeft: 8 }}
                  />
                )}
              </div>
            );
          },
          width: 150,
        },
        {
          title: "Voir Plus",
          dataIndex: "id",
          render: (id, record) => (
            <Button onClick={() => showMissionModal(record)} type="link">
              Voir Plus
            </Button>
          ),
          width: 100,
        },
      ];
    }
  };

  if (isMissionLoading || (activityType === "weekly" && isActivityLoading))
    return <Spin />;

  const dataSource = activityType === "weekly" ? dataActivities : dataMission;

  const handleFilter = async () => {
    switch (activityType) {
      case "weekly":
        const response = [];
        onFilter(response);
        break;

      default:
        break;
    }
  };

  const activityDropdownStyle = { width: 120, marginRight: "5px" };

  const weeklyDropDownStyle = { width: 100, marginRight: "8px" };
  const monthlyDropDownStyle = { width: 100 };

  return (
    <>
      <div className="activity-container">
        <div className="activity-header">
          <h2 style={{ marginTop: mode === "mydirection" ? 30 : 0 }}>
            Liste des Activités
          </h2>
          <div
            className="activity-controls"
            style={{ marginTop: mode === "mydirection" ? 30 : 0 }}
          >
            <ActivityTypeSelect
              style={activityDropdownStyle}
              activityType={activityType}
              setActivityType={setActivityType}
              setFilterType={setFilterType}
              setDateFilter={setDateFilter}
            />

            {mode !== "mydirection" && (
              <DirectionSelect setDirectionFilter={setDirectionFilter} />
            )}

            {activityType === "weekly" && (
              <WeeklyFilters
                style={weeklyDropDownStyle}
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                getWeeksInMonth={getWeeksInMonth}
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

            <Button
              type="primary"
              className="activity-buttons"
              onClick={handleFilter}
            >
              Filtrer
            </Button>

            <Button
              type="default"
              className="activity-buttons"
              onClick={() => {
                // Réinitialiser tous les filtres
                setActivityType("all");
                setDirectionFilter("all");
                setDateFilter({
                  month: null,
                  week: null,
                  year: null,
                  quarter: null,
                });
              }}
            >
              Réinitialiser
            </Button>
          </div>
        </div>
        <div className="activity-export">
          {selectedIds.length > 0 && (
            <>
              <span style={{ marginRight: "8px", alignSelf: "center" }}>
                Exporter en :
              </span>
              <Button
                type="default"
                icon={<FilePdfOutlined style={{ color: "red" }} />}
                className="activity-export-button"
                onClick={() => handleExport("PDF")}
              >
                PDF
              </Button>
              <Button
                type="primary"
                icon={<FileExcelOutlined />}
                className="activity-export-button"
                onClick={() => handleExport("XLS")}
              >
                Excel
              </Button>
              <Button
                type="primary"
                icon={<FileWordOutlined />}
                onClick={() => handleExport("DOC")}
              >
                DOC
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="activity-table-container custom-ant-table">
        <Table
          columns={getColumns()}
          dataSource={dataSource}
          pagination={{
            pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          scroll={mode === "all" ? { y: 263.5 } : { y: 250 }}
          locale={{ emptyText: "Aucune donnée à afficher" }}
        />
      </div>
      <ActivityModal
        mode={mode}
        onDelete={onDelete}
        visible={isModalVisible}
        onCancel={handleCancel}
        onSave={handleActivitySave}
        activity={selectedActivity}
      />
      <MissionModal
        mode={mode}
        visible={isMissionModalVisible}
        onDelete={onDelete}
        onCancel={handleMissionCancel}
        mission={selectedMission}
      />
    </>
  );
};

export default TableComponent;
