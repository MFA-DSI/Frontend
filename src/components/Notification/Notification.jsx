import React, { useState, useEffect } from "react";
import { Card, List, Avatar, Typography, Badge, Space, Spin } from "antd";
import {
  NotificationOutlined,
  FileTextOutlined,
  BulbOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import { convertToJSDate, getTimeSince } from "./utils/TimeSince";
import { useNotificationContext } from "../../providers/context/NotificationContext";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const getIconByType = (type) => {
  switch (type) {
    case "mission":
      return <PlusCircleOutlined style={{ color: "#1890ff" }} />;
    case "recommendation":
      return <BulbOutlined style={{ color: "#52c41a" }} />;
    default:
      return <NotificationOutlined style={{ color: "#595959" }} />;
  }
};

const NotificationCardDynamicIcons = () => {
  const {
    fetchNotifications,
    isLoading: isNotificationLoading,
    updateNotification,
  } = useNotificationContext();
  const navigate = useNavigate();
  const notifications = fetchNotifications.map((notification) => ({
    ...notification,
    isNew: !notification.viewStatus,
  }));

  const [notificationTimes, setNotificationTimes] = useState(
    notifications.map((notification) => ({
      id: notification.id,
      timeSince: getTimeSince(convertToJSDate(notification.creationDatetime)),
    })),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTimes = notifications.map((notification) => ({
        id: notification.id,
        timeSince: getTimeSince(convertToJSDate(notification.creationDatetime)),
      }));
      setNotificationTimes(updatedTimes);
    }, 60000);

    return () => clearInterval(interval);
  }, [notifications]);

  const handleUpdate = async (notificationId) => {
    try {
      await updateNotification(notificationId);
      navigate("/myDirection");
    } catch (error) {
      console.error(error);
    }
  };

  if (isNotificationLoading) return <Spin />;
  return (
    <Card
      title={
        <Title level={3} style={{ marginBottom: 0 }}>
          Notifications
        </Title>
      }
      style={{
        width: "100%",
        borderRadius: "15px",
        border: "1px solid #e0e0e0",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        marginBottom: "24px",
        padding: "20px",
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        locale={{ emptyText: "Aucune notification" }}
        renderItem={(notification) => {
          const timeElapsed =
            notificationTimes.find((item) => item.id === notification.id)
              ?.timeSince || "";

          return (
            <List.Item
              style={{
                height: "60px",
                padding: "8px 0",
                margin: "5px",
                borderBottom: "1px solid #f0f0f0",
                transition: "transform 0.3s ease",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                backgroundColor: notification.viewStatus
                  ? "#f5f5f5"
                  : "#ffffff",
                color: notification.viewStatus ? "#8c8c8c" : "#000000",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              onClick={() => handleUpdate(notification.id)}
            >
              <List.Item.Meta
                avatar={
                  <Badge dot={notification.isNew} offset={[0, 5]}>
                    <Avatar
                      icon={getIconByType(notification.status)}
                      size={36}
                      style={{ backgroundColor: "#f0f2f5" }}
                    />
                  </Badge>
                }
                title={
                  <Space direction="vertical" size={0}>
                    <Text
                      strong
                      style={{
                        fontSize: "14px",
                        color: notification.viewStatus ? "#8c8c8c" : "#000000",
                      }}
                    >
                      {notification.description}
                    </Text>
                  </Space>
                }
                description={
                  <Text
                    type="secondary"
                    style={{
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {notification.description}
                  </Text>
                }
              />
              <div
                style={{
                  marginLeft: "auto",
                  fontSize: "12px",
                  color: "#8c8c8c",
                }}
              >
                {timeElapsed}
              </div>
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default NotificationCardDynamicIcons;
