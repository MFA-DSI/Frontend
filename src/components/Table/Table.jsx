// TableComponent.js
import React, {useState} from "react";
import {Table, Select, Spin, Button} from "antd";
import {useActivityContext} from "../../providers/context/ActivitiesContext";
import ModalComponent from "../Modal/Modal"; // Import the new modal component

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
  const [pageSize, setPageSize] = useState(50); // Default page size

  const showModal = (activity) => {
    setSelectedActivity(activity);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedActivity(null);
  };

  const getWeeksInMonth = (month, year) => {
    const weeks = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = firstDay.getDate() - firstDay.getDay() + 1; // Get the first Monday
    const endDate = lastDay.getDate();

    for (let i = startDate; i <= endDate; i += 7) {
      weeks.push(`Semaine du ${new Date(year, month, i).toLocaleDateString()}`);
    }
    return weeks;
  };

  const columns = [
    {
      title: "Activités",
      dataIndex: "activity",
      width: 250,
    },
    {
      title: "Sous-Activités Réalisées",
      dataIndex: "description", // Optional: if you have this field
      width: 250,
    },
    {
      title: "Sous-Activités à Réaliser",
      dataIndex: "dueDatetime",
      width: 150,
    },
    {
      title: "Observations",
      dataIndex: "observation",
      width: 200,
    },
    {
      title: "Voir Plus",
      dataIndex: "id",
      render: (id, record) => (
        <Button onClick={() => showModal(record)} type="link">
          Voir Plus
        </Button>
      ),
    },
  ];

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
          <h2 style={{margin: 0}}>Liste des Activités</h2>
          <div style={{display: "flex", alignItems: "center"}}>
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
                      <Option value={0}>Janvier</Option>
                      <Option value={1}>Février</Option>
                      <Option value={2}>Mars</Option>
                      <Option value={3}>Avril</Option>
                      <Option value={4}>Mai</Option>
                      <Option value={5}>Juin</Option>
                      <Option value={6}>Juillet</Option>
                      <Option value={7}>Août</Option>
                      <Option value={8}>Septembre</Option>
                      <Option value={9}>Octobre</Option>
                      <Option value={10}>Novembre</Option>
                      <Option value={11}>Décembre</Option>
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
                      <Option value={0}>Janvier</Option>
                      <Option value={1}>Février</Option>
                      <Option value={2}>Mars</Option>
                      <Option value={3}>Avril</Option>
                      <Option value={4}>Mai</Option>
                      <Option value={5}>Juin</Option>
                      <Option value={6}>Juillet</Option>
                      <Option value={7}>Août</Option>
                      <Option value={8}>Septembre</Option>
                      <Option value={9}>Octobre</Option>
                      <Option value={10}>Novembre</Option>
                      <Option value={11}>Décembre</Option>
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
                      {/* Add more years */}
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
                      {/* Add more years */}
                    </Select>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table with fixed height and scrollable body */}
      <div
        style={{
          height: "calc(100vh - 200px)",
          overflow: "auto",
          paddingRight: "9px",
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredActivities}
          pagination={{
            pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          scroll={{y: 290}} // Scrollable height for the table body
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
