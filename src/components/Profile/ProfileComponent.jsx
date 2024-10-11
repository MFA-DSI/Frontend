import React, { useState } from "react";
import { Form, Input, Button, Typography, Row, Col, Card, Avatar, Table, Select, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDirectionsContext } from "../../providers";
import { toFullName } from "./utils/nameToFullName";
import { Grade } from "./utils/Grade";

export const ProfileComponent = () => {
  const { fetchActualUserInformation, fetchAllDirectionResponsibles } = useDirectionsContext();
  const userInformation = fetchActualUserInformation;
  const [userInfo, setUserInfo] = useState(userInformation);
  const [isEditing, setIsEditing] = useState(false);
  const [personnelType, setPersonnelType] = useState(""); // Type de personnel sélectionné (PC, Gendarme, Militaire)
  const [selectedGrade, setSelectedGrade] = useState(""); // Grade sélectionné
  const [isModalVisible, setIsModalVisible] = useState(false); // Pour modal de nouveau responsable

  // Données des autres utilisateurs
  const otherUsers = fetchAllDirectionResponsibles;

  // Colonnes de la table
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
        <Typography.Text>{toFullName(record.firstName, record.lastName)}</Typography.Text>
      ),
    },
    {
      title: 'Fonction',
      dataIndex: 'function',
      key: 'function',
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
  ];

  // Fonction qui gère l'ajout d'un nouveau responsable
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    setUserInfo(values);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  // Options de personnel
  const personnelOptions = [
    { value: "PC", label: "Personnel Civil" },
    { value: "Gendarme", label: "Gendarme" },
    { value: "Militaire", label: "Militaire" },
  ];

  // Grades disponibles en fonction du type de personnel
  const gendarmeGrades = [Grade.GAV, Grade.GND, Grade.SGT, Grade.SGT_C, Grade.ADJ, Grade.ADC, Grade.MJR];
  const militaireGrades = [Grade.SLT, Grade.LTN, Grade.CNE, Grade.COM, Grade.LCL, Grade.COL, Grade.GBR, Grade.GDI, Grade.GCA, Grade.GA];

  // Déterminer les options de grade selon le type de personnel
  const gradeOptions = personnelType === "Gendarme" ? gendarmeGrades : personnelType === "Militaire" ? militaireGrades : [];

  return (
    <div style={{ maxWidth: "100%", padding: "24px" }}>
      {/* Première carte : Informations utilisateur */}
      <Card style={{ width: "100%", marginBottom: "24px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Row align="middle">
          <Col flex="100px">
            <Avatar size={100} icon={<UserOutlined />} style={{ backgroundColor: "#87d068" }} />
          </Col>
          <Col flex="auto">
            <Typography.Title level={2} style={{ marginBottom: 0 }}>
              {`${userInfo.firstname} ${userInfo.lastname}`}
            </Typography.Title>
            <Typography.Text type="secondary">{userInfo.mail}</Typography.Text>
          </Col>
        </Row>

        {/* Formulaire pour afficher ou éditer les informations utilisateur */}
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

      {/* Troisième carte : Ajouter un nouveau responsable */}
      <Card style={{ width: "100%", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Typography.Title level={4}>Ajouter un nouveau responsable</Typography.Title>
        <Button type="primary" onClick={showModal}>Ajouter un nouveau responsable</Button>
        <Typography.Title level={4}>Liste des responsables</Typography.Title>
        <Table columns={columns} dataSource={otherUsers} rowKey="id" />
        {/* Modal pour ajouter un nouveau responsable */}
        <Modal
          title="Ajouter un nouveau responsable"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Nom" name="lastname" rules={[{ required: true, message: "Veuillez entrer le nom" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Prénom" name="firstname" rules={[{ required: true, message: "Veuillez entrer le prénom" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Type de personnel" name="personnelType" rules={[{ required: true, message: "Veuillez choisir un type de personnel" }]}>
              <Select
                options={personnelOptions}
                onChange={(value) => setPersonnelType(value)}
                placeholder="Sélectionnez le type de personnel"
              />
            </Form.Item>
            {personnelType && personnelType !== "PC" && ( // Only show grade dropdown if personnel type is not "PC"
              <Form.Item label="Grade" name="grade" rules={[{ required: true, message: "Veuillez choisir un grade" }]}>
                <Select
                  options={gradeOptions.map((grade) => ({ value: grade, label: grade }))}
                  onChange={(value) => setSelectedGrade(value)}
                  placeholder="Sélectionnez le grade"
                />
              </Form.Item>
            )}
             <Form.Item label="Fonction" name="function" rules={[{ required: true, message: "Veuillez entrer votre fonction" }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Ajouter</Button>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};
