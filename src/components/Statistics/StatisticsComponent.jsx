import React, { useState } from 'react';
import { Table, Card, Row, Col } from 'antd';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const staticData = [
  { id: 1, name: 'Réunion de coordination', direction: 'Direction1', type: 'réunion', date: '2024-01-15', status: 'terminé' },
  { id: 2, name: 'Projet de développement', direction: 'Direction2', type: 'projet', date: '2024-02-10', status: 'en cours' },
  { id: 3, name: 'Formation continue', direction: 'Direction1', type: 'formation', date: '2024-02-18', status: 'terminé' },
    { id: 6, name: 'Séminaire sur la gestion de projets', direction: 'Direction1', type: 'formation', date: '2024-05-12', status: 'terminé' },
    { id: 7, name: 'Rencontre avec partenaires', direction: 'Direction4', type: 'réunion', date: '2024-06-07', status: 'en cours' },
    { id: 8, name: 'Inspection annuelle', direction: 'Direction5', type: 'audit', date: '2024-06-15', status: 'en retard' },
    { id: 9, name: 'Formation leadership', direction: 'Direction1', type: 'formation', date: '2024-07-01', status: 'terminé' },
    { id: 10, name: 'Implémentation nouvelle procédure', direction: 'Direction3', type: 'projet', date: '2024-07-20', status: 'en cours' },
    { id: 11, name: 'Réunion de crise', direction: 'Direction2', type: 'réunion', date: '2024-08-05', status: 'terminé' },
    { id: 12, name: 'Projet de digitalisation', direction: 'Direction4', type: 'projet', date: '2024-08-18', status: 'en cours' },
    { id: 13, name: 'Enquête de satisfaction', direction: 'Direction5', type: 'audit', date: '2024-09-09', status: 'terminé' },
    { id: 14, name: 'Atelier de renforcement des capacités', direction: 'Direction1', type: 'formation', date: '2024-09-17', status: 'terminé' },
    { id: 15, name: 'Lancement d’un nouveau produit', direction: 'Direction3', type: 'projet', date: '2024-10-01', status: 'en retard' },
    { id: 16, name: 'Visite d’usine', direction: 'Direction4', type: 'réunion', date: '2024-10-20', status: 'en cours' },
    { id: 17, name: 'Formation Excel avancé', direction: 'Direction2', type: 'formation', date: '2024-11-10', status: 'prévu' },
    { id: 18, name: 'Evaluation semestrielle', direction: 'Direction5', type: 'audit', date: '2024-11-15', status: 'prévu' },
    { id: 19, name: 'Réunion d’évaluation de projets', direction: 'Direction1', type: 'réunion', date: '2024-12-01', status: 'terminé' },
    { id: 20, name: 'Projet de cybersécurité', direction: 'Direction2', type: 'projet', date: '2024-12-10', status: 'en cours' },
    { id: 21, name: 'Suivi des indicateurs de performance', direction: 'Direction4', type: 'audit', date: '2024-12-18', status: 'en cours' },
    { id: 22, name: 'Atelier sur les techniques de vente', direction: 'Direction5', type: 'formation', date: '2025-01-10', status: 'prévu' },
    { id: 23, name: 'Révision des contrats', direction: 'Direction3', type: 'projet', date: '2025-01-20', status: 'terminé' },
    { id: 24, name: 'Réunion de fin d’année', direction: 'Direction1', type: 'réunion', date: '2025-01-28', status: 'prévu' },
    { id: 25, name: 'Audit de conformité', direction: 'Direction2', type: 'audit', date: '2025-02-05', status: 'en retard' },  
];

const getActivitiesByDirection = (data) => {
  const activityCount = {};
  data.forEach((item) => {
    if (!activityCount[item.direction]) {
      activityCount[item.direction] = { total: 0, completed: 0, ongoing: 0, overdue: 0 };
    }
    activityCount[item.direction].total += 1;
    if (item.status === 'terminé') activityCount[item.direction].completed += 1;
    else if (item.status === 'en cours') activityCount[item.direction].ongoing += 1;
    else if (item.status === 'en retard') activityCount[item.direction].overdue += 1;
  });
  return Object.entries(activityCount).map(([key, value]) => ({
    direction: key,
    ...value,
    efficiency: ((value.completed / value.total) * 100).toFixed(2),
  }));
};

const StatisticsComponents = () => {
  const [filteredData] = useState(staticData);
  const directionStats = getActivitiesByDirection(filteredData);

  return (
    <div style={{ padding: 20 }}>
      <h2>Statistiques des Activités Interdirections</h2>

      {/* Classement des Directions par Nombre d'Activités avec Virtualisation */}
      <Card title="Directions les plus actives" style={{ marginBottom: 20 }}>
        <Table
          dataSource={directionStats.sort((a, b) => b.total - a.total)}
          columns={[
            { title: 'Direction', dataIndex: 'direction', key: 'direction' },
            { title: 'Total des Activités', dataIndex: 'total', key: 'total' },
            { title: 'Terminées', dataIndex: 'completed', key: 'completed' },
            { title: 'En Cours', dataIndex: 'ongoing', key: 'ongoing' },
            { title: 'En Retard', dataIndex: 'overdue', key: 'overdue' },
            { title: 'Efficacité (%)', dataIndex: 'efficiency', key: 'efficiency' },
          ]}
          rowKey="direction"
          pagination={false}
          scroll={{ y: 300 }} // Hauteur fixe pour activer le défilement virtuel
        />
      </Card>

      {/* Graphiques */}
      <Row gutter={16}>
        {/* Évolution des Activités par Direction */}
        <Col span={12}>
          <Card title="Évolution des Activités par Direction">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Array.from(new Set(filteredData.map(item => item.direction))).map((direction, index) => (
                  <Line
                    key={direction}
                    type="monotone"
                    dataKey={() => filteredData.filter(item => item.direction === direction).length}
                    name={direction}
                    stroke={['#8884d8', '#82ca9d', '#ffc658'][index % 3]}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Efficacité des Directions */}
        <Col span={12}>
          <Card title="Efficacité des Directions">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={directionStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="direction" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="efficiency" name="Efficacité (%)" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsComponents;
