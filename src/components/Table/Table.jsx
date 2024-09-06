// TableComponent.js
import React, {useState} from "react";
import {Table, Select, Spin, Button, Checkbox} from "antd";
import {useActivityContext} from "../../providers/context/ActivitiesContext";
import {
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
} from "@ant-design/icons";
import ModalComponent from "../Modal/Modal";

const {Option} = Select;

const TableComponent = () => {
  const {filteredActivities, isLoading, setFilterType, setDirectionFilter} =
    useActivityContext();
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
    const startDate = firstDay.getDate() - firstDay.getDay() + 1;
    const endDate = lastDay.getDate();
    for (let i = startDate; i <= endDate; i += 7) {
      weeks.push(`Semaine du ${new Date(year, month, i).toLocaleDateString()}`);
    }
    return weeks;
  };

  const groupActivities = (activities) => {
    const grouped = {};
    activities.forEach((activity) => {
      const mission = activity.mission;
      if (!grouped[mission]) {
        grouped[mission] = {mission: mission, activities: []};
      }
      grouped[mission].activities.push(activity);
    });
    return Object.values(grouped).flatMap((group) => {
      const activitiesGrouped = {};
      group.activities.forEach((activity) => {
        const activityName = activity.activity;
        if (!activitiesGrouped[activityName]) {
          activitiesGrouped[activityName] = {...activity, tasks: []};
        }
        activitiesGrouped[activityName].tasks.push(activity);
      });
      return Object.values(activitiesGrouped).map((activity) => ({
        ...activity,
        tasks: activity.tasks,
      }));
    });
  };

  const groupedActivities = groupActivities(filteredActivities);

  const getColumns = (activityType) => {
    const columns = [
      {
        title: "",
        dataIndex: "id",
        render: (id, record) => (
          <Checkbox
            onChange={() => handleSelectChange(id)}
            checked={selectedIds.includes(id)}
          />
        ),
        width: 50,
      },
    ];

    if (activityType === "weekly") {
      columns.push(
        {
          title: "Activités Mensuelles Prévues",
          dataIndex: "activity",
          render: (text, record) =>
            record.tasks.map((task) => (
              <div key={task.id}>{task.activity}</div>
            )),
          width: 250,
        },
        {
          title: "Sous-Activités Réalisées (ou Tâches) Hebdomadaires",
          dataIndex: "description",
          render: (text, record) =>
            record.tasks.map((task) => (
              <div key={task.id}>{task.description}</div>
            )),
          width: 250,
        },
        {
          title: "Sous-Activités à Réaliser pour la Semaine Prochaine",
          dataIndex: "dueDatetime",
          render: (text, record) =>
            record.tasks.map((task) => (
              <div key={task.id}>{task.dueDatetime}</div>
            )),
          width: 250,
        },
        {
          title: "Observations",
          dataIndex: "observation",
          render: (text, record) =>
            record.tasks.map((task) => (
              <div key={task.id}>{task.observation}</div>
            )),
          width: 200,
        },
        {
          title: "",
          dataIndex: "id",
          render: (id, record) => (
            <Button onClick={() => showModal(record)} type="link">
              Voir Plus
            </Button>
          ),
        }
      );
    } else if (activityType === "monthly" || activityType === "quarterly") {
      columns.push(
        {title: "Missions", dataIndex: "mission", width: 250},
        {title: "Activités", dataIndex: "activity", width: 250},
        {
          title: "Indicateur de Performance",
          dataIndex: "performanceIndicator",
          width: 200,
        },
        {title: "Réalisation", dataIndex: "realization", width: 200},
        {
          title: "Voir Plus",
          dataIndex: "id",
          render: (id, record) => (
            <Button onClick={() => showModal(record)} type="link">
              Voir Plus
            </Button>
          ),
        }
      );
    }

    return columns;
  };

  const handleExport = (format) => {
    console.log(`Exporting to ${format} for IDs: `, selectedIds);
  };

  if (isLoading) return <Spin />;

  const activityType =
    groupedActivities.length > 0 ? groupedActivities[0].tasks[0].type : "all";

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
          <h2 style={{marginTop: 50}}>Liste des Activités</h2>
          <div style={{display: "flex", alignItems: "center", marginTop: 50}}>
            <Select
              defaultValue="all"
              style={{width: 120, marginRight: "8px"}}
              onChange={setFilterType}
            >
              <Option value="all">Toutes les Activités</Option>
              <Option value="weekly">Hebdomadaire</Option>
              <Option value="monthly">Mensuel</Option>
              <Option value="quarterly">Trimestriel</Option>
            </Select>
            <Select
              defaultValue="all"
              style={{width: 120, marginRight: "8px"}}
              onChange={setDirectionFilter}
            >
              <Option value="all">Toutes les Directions</Option>
              <Option value="Sales">Sales</Option>
              <Option value="HR">HR</Option>
              <Option value="IT">IT</Option>
              <Option value="Finance">Finance</Option>
            </Select>
            {/* Month and Week Filters */}
            {filteredActivities.length > 0 && (
              <>
                {filteredActivities[0].type === "weekly" && (
                  <>
                    <Select
                      placeholder="Mois"
                      style={{width: 100, marginRight: "8px"}}
                      onChange={(value) =>
                        setDateFilter({...dateFilter, month: value})
                      }
                    >
                      {/* Month options */}
                    </Select>
                    <Select
                      placeholder="Semaine"
                      style={{width: 200}}
                      onChange={(value) =>
                        setDateFilter({...dateFilter, week: value})
                      }
                    >
                      {dateFilter.month !== null &&
                        getWeeksInMonth(
                          dateFilter.month,
                          new Date().getFullYear()
                        ).map((week, index) => (
                          <Option key={index} value={week}>
                            {week}
                          </Option>
                        ))}
                    </Select>
                  </>
                )}
                {filteredActivities[0].type === "monthly" && (
                  <>
                    <Select
                      placeholder="Mois"
                      style={{width: 100, marginRight: "8px"}}
                      onChange={(value) =>
                        setDateFilter({...dateFilter, month: value})
                      }
                    >
                      {/* Month options */}
                    </Select>
                    <Select
                      placeholder="Année"
                      style={{width: 100}}
                      onChange={(value) =>
                        setDateFilter({...dateFilter, year: value})
                      }
                    >
                      <Option value="2023">2023</Option>
                      <Option value="2024">2024</Option>
                    </Select>
                  </>
                )}
                {filteredActivities[0].type === "quarterly" && (
                  <>
                    <Select
                      placeholder="Trimestre"
                      style={{width: 100, marginRight: "8px"}}
                      onChange={(value) =>
                        setDateFilter({...dateFilter, quarter: value})
                      }
                    >
                      <Option value="Q1">Q1</Option>
                      <Option value="Q2">Q2</Option>
                      <Option value="Q3">Q3</Option>
                      <Option value="Q4">Q4</Option>
                    </Select>
                    <Select
                      placeholder="Année"
                      style={{width: 100}}
                      onChange={(value) =>
                        setDateFilter({...dateFilter, year: value})
                      }
                    >
                      <Option value="2023">2023</Option>
                      <Option value="2024">2024</Option>
                    </Select>
                  </>
                )}
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
              <span style={{marginRight: "8px", alignSelf: "center"}}>
                Exporter en :
              </span>
              <Button
                type="default"
                icon={<FilePdfOutlined style={{color: "red"}} />}
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
          columns={getColumns(activityType)}
          dataSource={groupedActivities}
          pagination={{
            pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          scroll={{y: 290}}
          locale={{emptyText: "Aucune donnée à afficher"}}
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
