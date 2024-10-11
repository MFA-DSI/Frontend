import React, { useState } from "react";
import { Form, Input, Button, Typography, Row, Col, Card, Avatar, Table } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDirectionsContext } from "../../providers";
import { toFullName } from "./utils/nameToFullName";

export const ProfileComponent = () => {
  const { fetchActualUserInformation, fetchAllDirectionResponsibles} = useDirectionsContext();
  const userInformation = fetchActualUserInformation
  const [userInfo, setUserInfo] = useState(userInformation);

  const [isEditing, setIsEditing] = useState(false);

  // Sample data for other users
  const otherUsers = fetchAllDirectionResponsibles

  const columns = [
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: 'Nom et Prénom',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, record) => (
        <Typography.Text>
          {toFullName(record.firstName, record.lastName)}
        </Typography.Text>
      ),
    },
    {
      title: 'Fonction',
      dataIndex: 'function',
      key: 'function',
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
  ];

  const onFinish = (values) => {
    setUserInfo(values);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

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
        <Row align="middle">
          <Col flex="100px">
            <Avatar
              size={100}
              icon={<UserOutlined />}
              style={{
                backgroundColor: "#87d068",
              }}
            />
          </Col>
          <Col flex="auto">
            <Typography.Title level={2} style={{ marginBottom: 0 }}>
              {`${userInfo.firstname} ${userInfo.lastname}`}
            </Typography.Title>
            <Typography.Text type="secondary">{userInfo.mail}</Typography.Text>
          </Col>
        </Row>
      </Card>

      {/* User Information Form */}
      <Card
        style={{
          width: "100%",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Form
          layout="vertical"
          initialValues={userInfo}
          onFinish={onFinish}
          onValuesChange={(changedValues, allValues) => setUserInfo(allValues)}
        >
          <Row gutter={16}>
            <Col span={12}>
              {isEditing ? (
                <Form.Item label="Prénom" name="firstname">
                  <Input />
                </Form.Item>
              ) : (
                <Typography.Paragraph style={{ fontSize: '16px' }}>
                  <strong>Prénom: </strong> {userInfo.firstname}
                </Typography.Paragraph>
              )}
            </Col>
            <Col span={12}>
              {isEditing ? (
                <Form.Item label="Nom" name="lastname">
                  <Input />
                </Form.Item>
              ) : (
                <Typography.Paragraph style={{ fontSize: '16px' }}>
                  <strong>Nom: </strong> {userInfo.lastname}
                </Typography.Paragraph>
              )}
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              {isEditing ? (
                <Form.Item label="Grade" name="grade">
                  <Input />
                </Form.Item>
              ) : (
                <Typography.Paragraph style={{ fontSize: '16px' }}>
                  <strong>Grade: </strong> {userInfo.grade}
                </Typography.Paragraph>
              )}
            </Col>
            <Col span={12}>
              {isEditing ? (
                <Form.Item label="Fonction" name="function">
                  <Input />
                </Form.Item>
              ) : (
                <Typography.Paragraph style={{ fontSize: '16px' }}>
                  <strong>Fonction: </strong> {userInfo.function}
                </Typography.Paragraph>
              )}
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              {isEditing ? (
                <Form.Item label="Email" name="mail">
                  <Input />
                </Form.Item>
              ) : (
                <Typography.Paragraph style={{ fontSize: '16px' }}>
                  <strong>Email: </strong> {userInfo.mail}
                </Typography.Paragraph>
              )}
            </Col>
            <Col span={12}>
              {isEditing ? (
                <Form.Item label="Direction" name="direction">
                  <Input />
                </Form.Item>
              ) : (
                <Typography.Paragraph style={{ fontSize: '16px' }}>
                  <strong>Direction: </strong> {userInfo.direction}
                </Typography.Paragraph>
              )}
            </Col>
          </Row>

          <Form.Item>
            {isEditing ? (
              <>
                <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                  Enregistrer
                </Button>
                <Button onClick={toggleEdit}>Annuler</Button>
              </>
            ) : (
              <Button type="primary" onClick={toggleEdit}>
                Modifier
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>

      {/* Table of Other Users */}
      <Card
        style={{
          marginTop: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography.Title level={3} style={{ marginBottom: "16px" }}>
          Autres Utilisateurs
        </Typography.Title>
        <Table
          columns={columns}
          dataSource={otherUsers}
          pagination={false}
          style={{ width: "100%" }}
          bordered
        />
      </Card>
    </div>
  );
};
