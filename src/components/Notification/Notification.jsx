import React, { useState, useEffect } from "react";
import {
  Card,
  List,
  Avatar,
  Typography,
  Badge,
  Space,
  Spin,
  Dropdown,
  Button,
  Menu,
  message,
} from "antd";
import {
  NotificationOutlined,
  FileTextOutlined,
  BulbOutlined,
  PlusCircleOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import { convertToJSDate, getTimeSince } from "./utils/TimeSince";
import { useNotificationContext } from "../../providers/context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../hooks";

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
    deleteNotification,
    isLoading: isNotificationLoading,
    updateNotification,
  } = useNotificationContext();
  const navigate = useNavigate();
  const userId = useAuthStore.getState().userId;
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
      // Mise à jour de la notification
      const updatedNotification = await updateNotification(notificationId.id);

      // Vérifie le statut de la notification et la vue
      if (notificationId.viewStatus === false) {
        // Si la notification n'est pas vue, on vérifie le statut
        if (updatedNotification.status === "user_created") {
          navigate("/profile"); // Redirection vers le profil
        } else {
          navigate("/myDirection"); // Sinon, redirection vers "myDirection"
        }
      }
      // Si viewStatus est true, aucune redirection ne se fait
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (notification) => {
    const params = {
      id: notification.id,
      userId: userId,
    };
    console.log(params);

    try {
      await deleteNotification(params);
    } catch (error) {
      message.error(error);
    }
  };

  const menu = (notification) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleDelete(notification)}>
        Supprimer
      </Menu.Item>
    </Menu>
  );

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
              onClick={() => handleUpdate(notification)}
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
              <Dropdown
                overlay={menu(notification)}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button
                  icon={<EllipsisOutlined />}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#8c8c8c",
                    fontSize: "16px",
                  }}
                />
              </Dropdown>
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default NotificationCardDynamicIcons;
