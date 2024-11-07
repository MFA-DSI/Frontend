import { Card, Table, Select, Button } from 'antd';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuthStore } from '../../hooks';
import { useDirectionsContext } from '../../providers';
import { useActivitiesContext } from '../../providers';

const { Option } = Select;

const StatisticsComponents = () => {

  const { fetchActualDirectionName } = useDirectionsContext();
  const { ownDiretionStatistics } = useActivitiesContext();  // Fetch function for statistics
  const isStaff = useAuthStore.getState().isStaff;
  const role = useAuthStore.getState().role;
  const directionId = useAuthStore.getState().directionId;
  const [selectedYear, setSelectedYear] = useState(null);
  const [ownDirectionData, setOwnDirectionData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);

  const name = fetchActualDirectionName?.data?.name || "Chargement...";

  const title = `Évolution des Activités de ma Direction ${name}`;

  // Function to fetch statistics based on directionId and selectedYear
  const fetchStatistics = async () => {
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

  // Trigger fetch when selectedYear or directionId changes
  useEffect(() => {
  }, [directionId, selectedYear, page]);

  // Extract unique years from data for dropdown options
  const years = Array.from({ length: 36 }, (_, i) => 2015 + i);


  return (
    <div style={{ padding: 20 }}>
      <h2>Statistiques des Activités Interdirections</h2>

      {/* Classement des Directions par Nombre d'Activités */}
      {/* {role === "SUPER_ADMIN" && (
        <Card title="Directions les plus actives" style={{ marginBottom: 20 }}>
          <Table
            dataSource={directionStats.sort(
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
      )} */}

      {isStaff === "true" && (role === "ADMIN" || role === "SUPER_ADMIN") && (
        <Card title={title} style={{ marginBottom: 20 }}>
          {/* Dropdown for selecting year */}
          <Select
            placeholder="Sélectionner une année"
            onChange={setSelectedYear}
            style={{ width: 200, marginBottom: 20 }}
            allowClear
          >
            {years.map(year => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
          <Button 
            type="primary" 
            onClick={fetchStatistics}
            disabled={!selectedYear}
            style={{ marginBottom: 20,marginInline : "12px" }}
          >
            Obtenir la statistique de cette année
          </Button>

          {/* Line chart showing activities over time */}
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
      name="nombre total d'activités"  // Custom label for legend
    />
  </LineChart>
</ResponsiveContainer>

        </Card>
      )}
    </div>
  );
};

export default StatisticsComponents;
