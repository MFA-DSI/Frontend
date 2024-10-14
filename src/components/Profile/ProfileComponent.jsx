import React, { useState } from "react";
import { Card, Avatar, Typography, Button, Row, Col, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDirectionsContext } from "../../providers";
import { toFullName } from "./utils/nameToFullName";
import AddUserModal from "../Modal/AddUserModal";
import AddResponsableDirectionModal from "../Modal/AddDirectionModal";
import { useAuthStore } from "../../hooks";

export const ProfileComponent = () => {
  const { fetchActualUserInformation, fetchAllDirectionResponsibles } =
    useDirectionsContext();
  const userInformation = fetchActualUserInformation;
  const otherUsers = fetchAllDirectionResponsibles;
  
  const role = useAuthStore.getState().role;
  
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isResponsableModalVisible, setIsResponsableModalVisible] =
    useState(false);

  const columns = [
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Nom et Prénom",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, record) => (
        <Typography.Text>
          {toFullName(record.firstName, record.lastName)}
        </Typography.Text>
      ),
    },
    {
      title: "Fonction",
      dataIndex: "function",
      key: "function",
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
  ];

  return (
    <div style={{ maxWidth: "100%", padding: "24px" }}>
      <Card
        style={{
          width: "100%",
          marginBottom: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Row align="middle" gutter={16}>
          {/* Left side: Avatar */}
          <Col span={4} style={{ textAlign: "center" }}>
            <Avatar
              size={100}
              icon={<UserOutlined />}
              style={{ backgroundColor: "#87d068" }}
            />
          </Col>

          {/* Right side: User Details */}
          <Col span={20}>
  <Row>
    <Col span={12} style={{ display: "flex", flexDirection: "column" }}>

  
      <div style={{ display: "flex", marginBottom: "8px", alignItems: "center" }}>
        <Typography.Text strong style={{ minWidth: "150px", textAlign: "right", marginRight: "10px" }}>
          Grade:
        </Typography.Text>
        <Typography.Text>{userInformation.grade}</Typography.Text>
      </div>
      <div style={{ display: "flex", marginBottom: "8px", alignItems: "center" }}>
        <Typography.Text strong style={{ minWidth: "150px", textAlign: "right", marginRight: "10px" }}>
          Nom:
        </Typography.Text>
        <Typography.Text>
          {userInformation.lastname} {userInformation.firstname}
        </Typography.Text>
      </div>
      <div style={{ display: "flex", marginBottom: "8px", alignItems: "center" }}>
        <Typography.Text strong style={{ minWidth: "150px", textAlign: "right", marginRight: "10px" }}>
          Email:
        </Typography.Text>
        <Typography.Text>{userInformation.mail}</Typography.Text>
      </div>
    </Col>
    <Col span={12} style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", marginBottom: "8px", alignItems: "center" }}>
        <Typography.Text strong style={{ minWidth: "150px", textAlign: "right", marginRight: "10px" }}>
          Direction:
        </Typography.Text>
        <Typography.Text>{userInformation.direction}</Typography.Text>
      </div>
      <div style={{ display: "flex", marginBottom: "8px", alignItems: "center" }}>
        <Typography.Text strong style={{ minWidth: "100px", textAlign: "left", marginRight: "4px" }}>
          Téléphone (WhatsApp):
        </Typography.Text>
        <Typography.Text>{userInformation.phoneNumbers}</Typography.Text>
      </div>
      <div style={{ display: "flex", marginBottom: "8px", alignItems: "center" }}>
        <Typography.Text strong style={{ minWidth: "150px", textAlign: "right", marginRight: "10px" }}>
          Fonction:
        </Typography.Text>
        <Typography.Text>{userInformation.function}</Typography.Text>
      </div>
    </Col>
  </Row>
</Col>

        </Row>
      </Card>

      <Card
        style={{
          width: "100%",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography.Title level={4}>Actions</Typography.Title>
        <Button type="primary" onClick={() => setIsUserModalVisible(true)}>
          Ajouter un utilisateur
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: "8px" }}
          onClick={() => setIsResponsableModalVisible(true)}
        >
          Ajouter un responsable direction
        </Button>

        <Table columns={columns} dataSource={otherUsers} rowKey="id" />
      </Card>

      {/* Modals */}
      <AddUserModal
        visible={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
      />
      <AddResponsableDirectionModal
        visible={isResponsableModalVisible}
        onCancel={() => setIsResponsableModalVisible(false)}
      />
    </div>
  );
};
