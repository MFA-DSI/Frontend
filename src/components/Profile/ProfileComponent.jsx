import React, { useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Button,
  Row,
  Col,
  Table,
  Badge,
  Modal,
  Spin,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { toFullName } from "./utils/nameToFullName";
import AddUserModal from "../Modal/AddUserModal";
import AddResponsableDirectionModal from "../Modal/AddResponsableModal";
import { useDirectionsContext } from "../../providers";
import ApprobateUserModal from "../Modal/Forms/ApprobatedUser";
import { useAuthStore } from "../../hooks";

const ProfileComponent = () => {
  const {
    fetchActualUserInformation,
    fetchAllDirectionResponsibles,
    isResponsibleLoading,
    isUserLoading,
    approveUserToDirectionMember,
  } = useDirectionsContext();

  const userInformation = fetchActualUserInformation;

  //change this from zustand

  const userId = localStorage.getItem("userId");

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isResponsableModalVisible, setIsResponsableModalVisible] =
    useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [responseModalVisible, setResponseModalVisible] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const role = useAuthStore.getState().role;

  const handleApprove = (user) => {
    setSelectedUser(user);
    setIsApproveModalVisible(true);
  };
  const grades = [
    { text: "A", value: "A" },
    { text: "B", value: "B" },
    { text: "C", value: "C" },
  ];

  const functions = [
    { text: "Designer", value: "Designer" },
    { text: "Developer", value: "Developer" },
    { text: "Manager", value: "Manager" },
  ];

  const handleApprovalAction = async (approved) => {
    if (approved) {
      // Perform approval action here

      const toApprove = {
        responsibleId: userId,
        toApproveId: selectedUser.id,
      };
      try {
        await approveUserToDirectionMember(toApprove, {
          onSuccess: (data) => {
            // Set the response data in state
            setResponseData(data);
            // Show the modal after successful response
            setResponseModalVisible(true);
          },
          onError: (error) => {
            console.error("Failed to add responsible:", error);
          },
        });

        onCancel();
      } catch (error) {
        console.error("Failed to save new responsible:", error);
      }
    }
    setIsApproveModalVisible(false);
  };

  const handleCloseModal = () => {
    setResponseModalVisible(false);
    setResponseData(null);
  };

  const columns = [
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      filters: grades.sort((a, b) => a.text.localeCompare(b.text)),
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
      filters: functions.sort((a, b) => a.text.localeCompare(b.text)),
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Personnel",
      dataIndex: "approved",
      key: "approved",
      filters: [
        { text: "Approuvé", value: true },
        { text: "En attente", value: false },
      ],
      onFilter: (value, record) => record.approved === value,
      render: (approved, record) => (
        <>
          <Badge
            status={approved ? "success" : "default"}
            text={approved ? "Approuvé" : "En attente"}
          />
          {!approved && (role === "ADMIN" || role === "SUPER_ADMIN")&& (
            <Button
              type="primary"
              onClick={() => handleApprove(record)}
              style={{ marginLeft: 8 }}
            >
              Approuver
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "100%", padding: "24px" }}>
      {isUserLoading ? (
        <Spin size="large" />
      ) : (
        <Card
          style={{
            width: "100%",
            marginBottom: "24px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Row align="middle" gutter={16}>
            <Col span={4} style={{ textAlign: "center" }}>
              <Avatar
                size={100}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#87d068" }}
              />
            </Col>
            <Col span={20}>
              {/* User Information */}
              <Row>
                <Col
                  span={12}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Text
                      strong
                      style={{
                        minWidth: "150px",
                        textAlign: "right",
                        marginRight: "10px",
                      }}
                    >
                      Grade:
                    </Typography.Text>
                    <Typography.Text>{userInformation.grade}</Typography.Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Text
                      strong
                      style={{
                        minWidth: "150px",
                        textAlign: "right",
                        marginRight: "10px",
                      }}
                    >
                      Nom:
                    </Typography.Text>
                    <Typography.Text>
                      {userInformation.lastname} {userInformation.firstname}
                    </Typography.Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Text
                      strong
                      style={{
                        minWidth: "150px",
                        textAlign: "right",
                        marginRight: "10px",
                      }}
                    >
                      Email:
                    </Typography.Text>
                    <Typography.Text>{userInformation.mail}</Typography.Text>
                  </div>
                </Col>
                <Col
                  span={12}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Text
                      strong
                      style={{
                        minWidth: "150px",
                        textAlign: "right",
                        marginRight: "10px",
                      }}
                    >
                      Direction:
                    </Typography.Text>
                    <Typography.Text>
                      {userInformation.direction}
                    </Typography.Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Text
                      strong
                      style={{
                        minWidth: "100px",
                        textAlign: "left",
                        marginRight: "4px",
                      }}
                    >
                      Téléphone (WhatsApp):
                    </Typography.Text>
                    <Typography.Text>
                      {userInformation.phoneNumbers}
                    </Typography.Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Text
                      strong
                      style={{
                        minWidth: "150px",
                        textAlign: "right",
                        marginRight: "10px",
                      }}
                    >
                      Fonction:
                    </Typography.Text>
                    <Typography.Text>
                      {userInformation.function}
                    </Typography.Text>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      )}

      {isResponsibleLoading ? (
        <Spin size="large" />
      ) : (
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

          {role === "SUPER_ADMIN" && (
            <Button
              type="primary"
              style={{ marginLeft: "8px" }}
              onClick={() => setIsResponsableModalVisible(true)}
            >
              Ajouter un responsable direction
            </Button>
          )}

          <Table
            columns={columns}
            dataSource={fetchAllDirectionResponsibles}
            rowKey="id"
          />
        </Card>
      )}

      {/* Modals */}
      <AddUserModal
        visible={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
      />

      <AddResponsableDirectionModal
        visible={isResponsableModalVisible}
        onCancel={() => setIsResponsableModalVisible(false)}
      />

      {/* Approve User Modal */}
      {selectedUser && (
        <Modal
          visible={isApproveModalVisible}
          title="Détails de l'utilisateur"
          onCancel={() => setIsApproveModalVisible(false)}
          footer={[
            <Button key="reject" onClick={() => handleApprovalAction(false)}>
              Refuser
            </Button>,
            <Button
              key="approve"
              type="primary"
              onClick={() => handleApprovalAction(true)}
            >
              Approuver
            </Button>,
          ]}
        >
          <Typography.Text strong>Nom: </Typography.Text>{" "}
          {selectedUser.firstName} {selectedUser.lastName}
          <br />
          <Typography.Text strong>Grade: </Typography.Text> {selectedUser.grade}
          <br />
          <Typography.Text strong>Fonction: </Typography.Text>{" "}
          {selectedUser.function}
        </Modal>
      )}

      {responseData && (
        <ApprobateUserModal
          title={`Nouveau Responsable du ${responseData?.directionName}`}
          visible={responseModalVisible}
          onCancel={handleCloseModal}
          responseData={responseData}
        >
          <div>
            <p>Direction : {responseData?.directionName}</p>
            <p>Identifiant : {responseData?.identity}</p>
            <p>Mot de passe : {responseData?.password}</p>
            <p>
              Les informations d'identification ont été enregistrées dans un
              fichier Excel nommé
              <strong>{responseData?.name}.xlsx</strong>.
            </p>
          </div>
        </ApprobateUserModal>
      )}
    </div>
  );
};

export default ProfileComponent;
