// TableComponent.js
import React, { useState } from "react";
import { Table, Select, Spin, Button, Checkbox, Badge } from "antd";
import { useActivityContext } from "../../providers/context/ActivitiesContext";
import {
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
} from "@ant-design/icons";
import ModalComponent from "../Modal/Modal";

const { Option } = Select;

const TableComponent = () => {
  const { filteredActivities, isLoading, setFilterType, setDirectionFilter } =
    useActivityContext();

  const [activityType, setActivityType] = useState("all");
  const [dateFilter, setDateFilter] = useState({
    month: null,
    week: null,
    year: null,
    quarter: null,
  });

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(50);
  const [selectedIds, setSelectedIds] = useState([]);

  const showModal = (activity) => {
    setSelectedActivity(activity);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedActivity(null);
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

  const getWeeksInMonth = (month, year) => {
    const weeks = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = firstDay.getDate() - firstDay.getDay(); 
    const endDate = lastDay.getDate();
    
    for (let i = startDate; i <= endDate; i += 7) {
      const weekStartDate = new Date(year, month, i);
      const weekEndDate = new Date(year, month, i + 6);
      if (weekStartDate.getDate() <= endDate) {
        weeks.push(`Semaine du ${weekStartDate.toLocaleDateString()} au ${weekEndDate.toLocaleDateString()}`);
      }
    }
    return weeks;
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
          dataIndex: "monthlyActivities",
          width: 250,
        },
        {
          title: "Tâches Hebdomadaires",
          dataIndex: "weeklyTasks",
          width: 250,
        },
        {
          title: "Tâche Prochaine",
          dataIndex: "nextTask",
          width: 250,
        },
        {
          title: "Observations",
          dataIndex: "observations",
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
          title: "Mission",
          dataIndex: "description", 
          render: (description) => <div>{description}</div>,
          width: 250,
        },
        {
          title: "Activité",
          dataIndex: "activityList",
          render: (activityList) => {
            const firstActivity = activityList[0];
            const otherActivitiesCount = activityList.length - 1;

            return (
              <div>
                {firstActivity ? firstActivity.description : "Aucune activité"}
                {otherActivitiesCount > 0 && (
                  <Badge count={`${otherActivitiesCount} autres`} style={{ marginLeft: 8 }} />
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
            const performanceRealizations = activityList[0]?.performanceRealization;
            const otherIndicatorsCount = performanceRealizations ? performanceRealizations.length - 1 : 0;

            return (
              <div>
                {performanceRealizations && performanceRealizations.length > 0
                  ? performanceRealizations[0].indicators
                  : "Aucun indicateur"}
                {otherIndicatorsCount > 0 && (
                  <Badge count={`${otherIndicatorsCount} autres`} style={{ marginLeft: 8 }} />
                )}
              </div>
            );
          },
          width: 150,
        },
        {
          title: "Réalisation",
          dataIndex: "activityList",
          render: (activityList) => {
            const performanceRealizations = activityList[0]?.performanceRealization;
            const otherRealizationsCount = performanceRealizations ? performanceRealizations.length - 1 : 0;

            return (
              <div>
                {performanceRealizations && performanceRealizations.length > 0
                  ? performanceRealizations[0].realization
                  : "Aucune réalisation"}
                {otherRealizationsCount > 0 && (
                  <Badge count={`${otherRealizationsCount} autres`} style={{ marginLeft: 8 }} />
                )}
              </div>
            );
          },
          width: 250,
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
    }
  };

  if (isLoading) return <Spin />;

  return (
    <>
      <div
        style={{
          padding: "20px",
          marginBottom: "16px",
          backgroundColor: "#f9f9f9",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginTop: 50 }}>Liste des Activités</h2>
          <div style={{ display: "flex", alignItems: "center", marginTop: 50 }}>
            <Select
              value={activityType}
              style={{ width: 120, marginRight: "8px" }}
              onChange={(value) => {
                setActivityType(value);
                setFilterType(value);
                setDateFilter({ month: null, week: null, year: null, quarter: null });
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

            {/* Dropdown pour filtrer par mois et semaine */}
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
                    getWeeksInMonth(dateFilter.month, new Date().getFullYear()).map((week, index) => (
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
                  onChange={(value) => setDateFilter({ ...dateFilter, year: value })}
                >
                  <Option value="2023">2023</Option>
                  <Option value="2024">2024</Option>
                </Select>
                <Select
                  placeholder="Mois"
                  style={{ width: 100, marginRight: "8px" }}
                  onChange={(value) => setDateFilter({ ...dateFilter, month: value })}
                >
                  {Array.from({ length: 12 }, (_, index) => (
                    <Option key={index} value={index}>
                      {new Date(0, index).toLocaleString("fr-FR", { month: "long" })}
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
                  onChange={(value) => setDateFilter({ ...dateFilter, year: value })}
                >
                  <Option value="2023">2023</Option>
                  <Option value="2024">2024</Option>
                </Select>
                <Select
                  placeholder="Trimestre"
                  style={{ width: 100 }}
                  onChange={(value) => setDateFilter({ ...dateFilter, quarter: value })}
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
                onClick={() => handleExport("Excel")}
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
          height: "calc(100vh - 200px)",
          overflow: "auto",
          paddingRight: "9px",
        }}
      >
        <Table
          columns={getColumns()}
          dataSource={filteredActivities}
          pagination={{
            pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          scroll={{ y: 290 }}
          locale={{ emptyText: "Aucune donnée à afficher" }}
        />
      </div>
      <ModalComponent
        visible={isModalVisible}
        onCancel={handleCancel}
        activity={selectedActivity}
      />
    </>
  );
};

export default TableComponent;