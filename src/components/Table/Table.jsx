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

const { Option } = Select;

const TableComponent = ({ mode }) => {
  const {
    filteredActivities,
    isLoading: isActivityLoading,
    directionIdQueryActvities,
  } = useActivitiesContext();
  const {
    filteredMissions,
    isLoading: isMissionLoading,
    MissionByDirectionId,
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

  const layoutModeMissions =
    mode === "mydirection" ? MissionByDirectionId : filteredMissions;
  const layoutModeActivities =
    mode === "mydirection" ? directionIdQueryActvities : filteredActivities;

  const dataSource =
    activityType === "weekly" ? layoutModeActivities : layoutModeMissions;

  return (
    <>
      <div
        style={{
          padding: "10px",
          marginBottom: "5px",
          backgroundColor: "#f9f9f9",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "12px",
          }}
        >
          <h2 style={{ marginTop: mode === "mydirection" ? 30 : 0 }}>
            Liste des Activités
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: mode === "mydirection" ? 30 : 0,
            }}
          >
            <Select
              value={activityType}
              style={{ width: 120, marginRight: "5px" }}
              onChange={(value) => {
                setActivityType(value);
                setFilterType(value);
                setDateFilter({
                  month: null,
                  week: null,
                  year: null,
                  quarter: null,
                });
              }}
            >
              <Option value="all">Toutes les Activités</Option>
              <Option value="weekly">Hebdomadaire</Option>
              <Option value="monthly">Mensuel</Option>
              <Option value="quarterly">Trimestriel</Option>
            </Select>

            <Select
              defaultValue="all"
              style={{ width: 120, marginRight: "8px" }}
              onChange={setDirectionFilter}
            >
              <Option value="all">Toutes les Directions</Option>
              <Option value="Sales">Sales</Option>
              <Option value="HR">HR</Option>
              <Option value="IT">IT</Option>
              <Option value="Finance">Finance</Option>
            </Select>

            {activityType === "weekly" && (
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
                      {new Date(0, index).toLocaleString("fr-FR", {
                        month: "long",
                      })}
                    </Option>
                  ))}
                </Select>
                <Select
                  placeholder="Semaine"
                  style={{ width: 200 }}
                  onChange={(value) =>
                    setDateFilter({ ...dateFilter, week: value })
                  }
                >
                  {dateFilter.month !== null &&
                    getWeeksInMonth(
                      dateFilter.month,
                      new Date().getFullYear(),
                    ).map((week, index) => (
                      <Option key={index} value={week}>
                        {week}
                      </Option>
                    ))}
                </Select>
              </>
            )}

            {activityType === "monthly" && (
              <>
                <Select
                  placeholder="Année"
                  style={{ width: 100 }}
                  onChange={(value) =>
                    setDateFilter({ ...dateFilter, year: value })
                  }
                >
                  <Option value="2023">2023</Option>
                  <Option value="2024">2024</Option>
                </Select>
                <Select
                  placeholder="Mois"
                  style={{ width: 100, marginRight: "8px" }}
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
              </>
            )}

            {activityType === "quarterly" && (
              <>
                <Select
                  placeholder="Année"
                  style={{ width: 100, marginRight: "8px" }}
                  onChange={(value) =>
                    setDateFilter({ ...dateFilter, year: value })
                  }
                >
                  <Option value="2023">2023</Option>
                  <Option value="2024">2024</Option>
                </Select>
                <Select
                  placeholder="Trimestre"
                  style={{ width: 100 }}
                  onChange={(value) =>
                    setDateFilter({ ...dateFilter, quarter: value })
                  }
                >
                  <Option value="Q1">Q1</Option>
                  <Option value="Q2">Q2</Option>
                  <Option value="Q3">Q3</Option>
                  <Option value="Q4">Q4</Option>
                </Select>
              </>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          {selectedIds.length > 0 && (
            <>
              <span style={{ marginRight: "8px", alignSelf: "center" }}>
                Exporter en :
              </span>
              <Button
                type="default"
                icon={<FilePdfOutlined style={{ color: "red" }} />}
                style={{
                  marginRight: "8px",
                  backgroundColor: "white",
                  color: "black",
                }}
                onClick={() => handleExport("PDF")}
              >
                PDF
              </Button>
              <Button
                type="primary"
                icon={<FileExcelOutlined />}
                style={{
                  marginRight: "8px",
                  backgroundColor: "green",
                  color: "white",
                }}
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
      <div
        style={{
          height: "calc(100vh - 250px)",
          overflow: "auto",
          paddingInline: "4.5px",
        }}
        className="custom-ant-table"
      >
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
