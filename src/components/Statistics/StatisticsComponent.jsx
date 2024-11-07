import { Card, Table, DatePicker, Button } from 'antd';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuthStore } from '../../hooks';
import { useDirectionsContext } from '../../providers';
import { useActivitiesContext } from '../../providers';
import moment from 'moment';

const StatisticsComponents = () => {
  const { fetchActualDirectionName } = useDirectionsContext();
  const { ownDiretionStatistics, allDirectionStatistics } = useActivitiesContext();
  const isStaff = useAuthStore.getState().isStaff;
  const role = useAuthStore.getState().role;
  const directionId = useAuthStore.getState().directionId;

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // For allDirectionStatistics
  const [ownDirectionData, setOwnDirectionData] = useState([]);
  const [allDirectionData, setAllDirectionData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);

  const name = fetchActualDirectionName?.data?.name || "Chargement...";
  const title = `Évolution des Activités de ma Direction ${name}`;

  // Function to fetch statistics for the user's own direction based on the selected year
  const fetchOwnDirectionStatistics = async () => {
    if (directionId && selectedYear) {
      try {
        const params = { directionId, year: selectedYear, page, pageSize };
        const response = await ownDiretionStatistics(params);
        setOwnDirectionData(response || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques", error);
      }
    }
  };

  // Function to fetch statistics for all directions based on the selected date
  const fetchAllDirectionStatistics = async () => {
    if (selectedDate) {
      try {
        const params = { weekStartDate: moment(selectedDate).format("YYYY-MM-DD"), page, pageSize };
        const response = await allDirectionStatistics(params);
        setAllDirectionData(response || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques interdirections", error);
      }
    }
  };

  useEffect(() => {
  }, [directionId, selectedYear, selectedDate, page]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Statistiques des Activités</h2>

      {/* Table for all-direction statistics, shown only to SUPER_ADMIN */}
      {role === "SUPER_ADMIN" && (
        <Card title="Directions les plus actives" style={{ marginBottom: 20 }}>
          <DatePicker
            placeholder="Sélectionner une date"
            onChange={setSelectedDate}
            format="DD-MM-YYYY"
            style={{ marginBottom: 20, marginRight: 12 }}
          />
          <Button 
            type="default" 
            onClick={fetchAllDirectionStatistics}
            disabled={!selectedDate}
            style={{ marginBottom: 20 }}
          >
            Obtenir les statistiques interdirections
          </Button>

          <Table
            dataSource={allDirectionData.sort(
              (a, b) => b.totalActivities - a.totalActivities
            )}
            columns={[
              { title: "Direction", dataIndex: "directionName", key: "directionName" },
              { title: "Total des Activités", dataIndex: "totalActivities", key: "totalActivities" },
              { title: "Terminées", dataIndex: "completedActivities", key: "completedActivities" },
              { title: "En Cours", dataIndex: "ongoingActivities", key: "ongoingActivities" },
              { title: "Efficacité (%)", dataIndex: "efficiencyPercentage", key: "efficiencyPercentage" },
              { title: "Indicateur Moyenne de Performance", dataIndex: "averagePerformanceIndicator", key: "averagePerformanceIndicator" },
            ]}
            rowKey="directionId"
            pagination={false}
            scroll={{ y: 300 }}
          />
        </Card>
      )}

      {/* Own Direction Statistics */}
      {isStaff === "true" && (role === "ADMIN" || role === "SUPER_ADMIN") && (
        <Card title={title} style={{ marginBottom: 20 }}>
          <DatePicker
            picker="year"
            placeholder="Sélectionner une année"
            onChange={(date) => setSelectedYear(date ? date.year() : null)}
            style={{ width: 200, marginBottom: 20 }}
            allowClear
          />
          <Button 
            type="primary" 
            onClick={fetchOwnDirectionStatistics}
            disabled={!selectedYear}
            style={{ marginBottom: 20, marginLeft: 12 }}
          >
            Obtenir la statistique de cette année
          </Button>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={600}
              height={300}
              data={ownDirectionData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                labelFormatter={(label) => `Date: ${label}`}
                formatter={(value, name) => [
                  value,
                  name === "totalActivities" ? "nombre total d'activités" : name
                ]}
              />
              <Legend formatter={(value) => 
                value === "totalActivities" ? "nombre total d'activités" : value
              } />
              <Line
                type="monotone"
                dataKey="totalActivities"
                stroke="#8884d8"
                name="nombre total d'activités"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
};

export default StatisticsComponents;
