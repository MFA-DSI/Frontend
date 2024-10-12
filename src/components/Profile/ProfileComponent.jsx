import React, { useState } from "react";
import { Card, Avatar, Typography, Button, Row, Col, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDirectionsContext } from "../../providers";
import { toFullName } from "./utils/nameToFullName";
import AddUserModal from "../Modal/AddUserModal";
import AddResponsableDirectionModal from "../Modal/AddDirectionModal";

export const ProfileComponent = () => {
  const { fetchActualUserInformation, fetchAllDirectionResponsibles } =
    useDirectionsContext();
  const userInformation = fetchActualUserInformation;
  const otherUsers = fetchAllDirectionResponsibles;

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
          <Col span={6}>
            <Avatar
              size={100}
              icon={<UserOutlined />}
              style={{ backgroundColor: "#87d068" }}
            />
          </Col>
          <Col span={18}>
            <Row>
              <Col span={12}>
                <Typography.Text strong>Grade:</Typography.Text>{" "}
                {userInformation.grade}
              </Col>
              <Col span={12}>
                <Typography.Title level={4} style={{ marginBottom: 0 }}>
                  {toFullName(
                    userInformation.firstname,
                    userInformation.lastname,
                  )}
                </Typography.Title>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: "8px" }}>
              <Col span={12}>
                <Typography.Text strong>Email:</Typography.Text>{" "}
                {userInformation.mail}
              </Col>
              <Col span={12}>
                <Typography.Text strong>Téléphone:</Typography.Text>{" "}
                {userInformation.phoneNumber}
              </Col>
            </Row>
            <Row style={{ marginTop: "8px" }}>
              <Col span={24}>
                <Typography.Text strong>Direction:</Typography.Text>{" "}
                {userInformation.direction}
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
