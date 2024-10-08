import React from 'react';
import { Card, List, Avatar, Typography, Badge, Space } from 'antd';
import { NotificationOutlined, MessageOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const notifications = [
  {
    id: 1,
    title: 'Nouvelle mission assignée',
    description: 'Une nouvelle mission vous a été assignée par la direction.',
    icon: <NotificationOutlined style={{ color: '#1890ff' }} />,
    isNew: true,
    time: 'Il y a 5 minutes',
  },
  {
    id: 2,
    title: 'Message de l\'équipe',
    description: 'Un nouveau message a été partagé par votre équipe.',
    icon: <MessageOutlined style={{ color: '#52c41a' }} />,
    isNew: true,
    time: 'Il y a 15 minutes',
  },
  {
    id: 3,
    title: 'Alerte de sécurité',
    description: 'Veuillez mettre à jour vos informations de sécurité.',
    icon: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
    isNew: false,
    time: 'Il y a 1 heure',
  },
  {
    id: 4,
    title: 'Rapport trimestriel disponible',
    description: 'Le rapport trimestriel de votre service est prêt à être consulté.',
    icon: <NotificationOutlined style={{ color: '#fa541c' }} />,
    isNew: false,
    time: 'Il y a 2 heures',
  },
];

const NotificationCardCompact = () => {
  return (
    <Card
      title={<Title level={3} style={{ marginBottom: 0 }}>Notifications</Title>}
      style={{
        width: '100%',
        borderRadius: '15px',  // Rounded corners
        border: '1px solid #e0e0e0',  // Subtle border
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',  // Shadow for card lift effect
        marginBottom: '24px',
        padding: '20px',
      }}
      bodyStyle={{
        padding: '24px',
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={(notification) => (
          <List.Item
            style={{
              height: '60px',  
              padding: '8px 0', 
              borderBottom: '1px solid #f0f0f0',  
              transition: 'transform 0.3s ease', 
              borderRadius: '10px',  
              display: 'flex',
              alignItems: 'center', 
              cursor: "pointer" 
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <List.Item.Meta
              avatar={
                <Badge dot={notification.isNew} offset={[0, 5]}>
                  <Avatar
                    icon={notification.icon}
                    size={36}  // Adjust avatar size to fit the smaller height
                    style={{ backgroundColor: '#f0f2f5' }}
                  />
                </Badge>
              }
              title={
                <Space direction="vertical" size={0}>
                  <Text strong style={{ fontSize: '14px' }}>{notification.title}</Text>
                </Space>
              }
              description={
                <Text type="secondary" style={{ fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {notification.description}
                </Text>
              }
            />
            <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#8c8c8c' }}>
              {notification.time}
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default NotificationCardCompact;
