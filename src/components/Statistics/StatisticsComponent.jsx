import React, { useEffect, useState } from "react";
import { Table, Card, Row, Col } from "antd";
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuthStore, useDirections } from "../../hooks";
import { useDirectionsContext } from "../../providers";

const updatedData = [
  {
    directionId: "550e8400-e29b-41d4-a716-446655440014",
    directionName: "DSI",
    totalActivities: 2,
    completedActivities: 1,
    ongoingActivities: 1,
    overdueActivities: 0,
    efficiencyPercentage: 50.0,
    averagePerformanceIndicator: 50.0,
  },
  {
    directionId: "550e8400-e29b-41d4-a716-446655440001",
    directionName: "Finance",
    totalActivities: 8,
    completedActivities: 1,
    ongoingActivities: 7,
    overdueActivities: 0,
    efficiencyPercentage: 12.5,
    averagePerformanceIndicator: 14.0,
  },
  {
    directionId: "550e8400-e29b-41d4-a716-446655440002",
    directionName: "Ressources Humaines",
    totalActivities: 5,
    completedActivities: 3,
    ongoingActivities: 1,
    overdueActivities: 1,
    efficiencyPercentage: 60.0,
    averagePerformanceIndicator: 45.0,
  },
  {
    directionId: "550e8400-e29b-41d4-a716-446655440003",
    directionName: "Marketing",
    totalActivities: 6,
    completedActivities: 2,
    ongoingActivities: 3,
    overdueActivities: 1,
    efficiencyPercentage: 33.33,
    averagePerformanceIndicator: 30.0,
  },
  {
    directionId: "550e8400-e29b-41d4-a716-446655440004",
    directionName: "Commercial",
    totalActivities: 10,
    completedActivities: 5,
    ongoingActivities: 4,
    overdueActivities: 1,
    efficiencyPercentage: 50.0,
    averagePerformanceIndicator: 40.0,
  },
  {
    directionId: "550e8400-e29b-41d4-a716-446655440005",
    directionName: "Production",
    totalActivities: 7,
    completedActivities: 4,
    ongoingActivities: 2,
    overdueActivities: 1,
    efficiencyPercentage: 57.14,
    averagePerformanceIndicator: 65.0,
  },
  {
    directionId: "550e8400-e29b-41d4-a716-446655440006",
    directionName: "Recherche et Développement",
    totalActivities: 3,
    completedActivities: 1,
    ongoingActivities: 2,
    overdueActivities: 0,
    efficiencyPercentage: 33.33,
    averagePerformanceIndicator: 55.0,
  },
  {
    directionId: "550e8400-e29b-41d4-a716-446655440007",
    directionName: "Logistique",
    totalActivities: 9,
    completedActivities: 6,
    ongoingActivities: 2,
    overdueActivities: 1,
    efficiencyPercentage: 66.67,
    averagePerformanceIndicator: 70.0,
  },
  {
    directionId: "550e8400-e29b-41d4-a716-446655440008",
    directionName: "Qualité",
    totalActivities: 4,
    completedActivities: 2,
    ongoingActivities: 1,
    overdueActivities: 1,
    efficiencyPercentage: 50.0,
    averagePerformanceIndicator: 47.5,
  },
  {
    directionId: "550e8400-e29b-41d4-a716-446655440009",
    directionName: "Achats",
    totalActivities: 5,
    completedActivities: 2,
    ongoingActivities: 2,
    overdueActivities: 1,
    efficiencyPercentage: 40.0,
    averagePerformanceIndicator: 52.0,
  },
];

const activityDataDSI = [
  { date: "2024-01-01", totalActivities: 2 },
  { date: "2024-02-01", totalActivities: 3 },
  { date: "2024-03-01", totalActivities: 4 },
  { date: "2024-04-01", totalActivities: 5 },
  { date: "2024-05-01", totalActivities: 6 },
  { date: "2024-06-01", totalActivities: 7 },
  { date: "2024-07-01", totalActivities: 5 },
  { date: "2024-08-01", totalActivities: 6 },
  { date: "2024-09-01", totalActivities: 8 },
  { date: "2024-10-01", totalActivities: 9 },
  { date: "2024-11-01", totalActivities: 7 },
  { date: "2024-12-01", totalActivities: 10 },
];

const StatisticsComponents = () => {
  const [directionStats] = useState(updatedData);
  const { fetchActualDirectionName } = useDirectionsContext();
  const isStaff = useAuthStore.getState().isStaff;
  const role = useAuthStore.getState().role;

  const name = fetchActualDirectionName?.data.name || "Chargement...";
  const data = activityDataDSI;
  const title = `Évolution des Activités de ma Direction ${name}`;
  useEffect(() => {}, [name,isStaff,role]);
  return (
    <div style={{ padding: 20 }}>
      <h2>Statistiques des Activités Interdirections</h2>

      {/* Classement des Directions par Nombre d'Activités */}
      {role === "SUPER_ADMIN" && (
  <Card title="Directions les plus actives" style={{ marginBottom: 20 }}>
    <Table
      dataSource={directionStats.sort(
        (a, b) => b.totalActivities - a.totalActivities,
      )}
      columns={[
        {
          title: "Direction",
          dataIndex: "directionName",
          key: "directionName",
        },
        {
          title: "Total des Activités",
          dataIndex: "totalActivities",
          key: "totalActivities",
        },
        {
          title: "Terminées",
          dataIndex: "completedActivities",
          key: "completedActivities",
        },
        {
          title: "En Cours",
          dataIndex: "ongoingActivities",
          key: "ongoingActivities",
        },
        {
          title: "Efficacité (%)",
          dataIndex: "efficiencyPercentage",
          key: "efficiencyPercentage",
        },
        {
          title: "Indicateur Moyenne de Performance",
          dataIndex: "averagePerformanceIndicator",
          key: "averagePerformanceIndicator",
        },
      ]}
      rowKey="directionId"
      pagination={false}
      scroll={{ y: 300 }}
    />
  </Card>
)}

{isStaff === "true" && (role === "ADMIN" || role === "SUPER_ADMIN") && (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalActivities"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
)}



        
   

      
    
    </div>
  );
};

export default StatisticsComponents;
