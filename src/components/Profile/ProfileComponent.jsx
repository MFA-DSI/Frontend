import React, { useEffect, useState } from "react";
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
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { toFullName } from "./utils/nameToFullName";
import AddUserModal from "../Modal/AddUserModal";
import AddResponsableDirectionModal from "../Modal/AddResponsableModal";
import { useDirectionsContext } from "../../providers";
import ApprobateUserModal from "../Modal/Forms/ApprobatedUser";
import { useAuthStore } from "../../hooks";
import { useResponsiblesContext } from "../../providers/context/ReponsibleContext";
import { EditableField } from "../Modal/Forms/ActivityDetails";
import { validateEmail } from "../Modal/utils/validateEmail";
import { Note } from "../Note/Note";

const ProfileComponent = () => {
  const {
    fetchActualUserInformation,
    isResponsibleLoading,
    isUserLoading,
    updateUser,
  } = useDirectionsContext();

  const { fetchResponsibles, approveUserToDirectionMember } =
    useResponsiblesContext();

  const userInformation = fetchActualUserInformation;
  const allDirection = fetchResponsibles;
  //change this from zustand

  const userId = localStorage.getItem("userId");
  const directionId = localStorage.getItem("directionId");
  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isResponsableModalVisible, setIsResponsableModalVisible] =
    useState(false);
  const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [responseModalVisible, setResponseModalVisible] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const { fetchActualDirectionName } = useDirectionsContext();
  const role = useAuthStore.getState().role;

  const handleApprove = (user) => {
    setSelectedUser(user);
    setIsApproveModalVisible(true);
  };
  const name = fetchActualDirectionName?.data?.acronym || "Chargement...";

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

  const localeSettings = {
    filterConfirm: "Filtrer ", // Remplace "OK" par "Valider"
    filterReset: "Réinitialiser", // Remplace "Reset" par "Réinitialiser"
    emptyText: "Aucune utilisateur correpondante",
  };
  const columns = [
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      filters: [...new Set(allDirection.map((item) => item.grade))] // Valeurs uniques pour les grades
        .sort((a, b) => a.localeCompare(b)) // Tri alphabétique
        .map((value) => ({ text: value, value })), // Transformation en objets de filtre
      onFilter: (value, record) => record.grade === value, // Logique de filtrage
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
      filters: [...new Set(allDirection.map((item) => item.function))] // Utilisation des valeurs uniques
        .sort((a, b) => a.localeCompare(b)) // Tri alphabétique
        .map((value) => ({ text: value, value })), // Transformation en structure de filtre
      onFilter: (value, record) => record.function === value, // Logique de filtrage
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
          {!approved && (role === "ADMIN" || role === "SUPER_ADMIN") && (
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
  const [userInfo, setUserInfo] = useState({
    userId: userId,
    grade: userInformation.grade,
    lastname: userInformation.lastname,
    firstname: userInformation?.firstname || "",
    mail: userInformation.mail,
    direction: userInformation.direction,
    phoneNumbers: userInformation?.phoneNumbers,
    fonction: userInformation.function,
  });

  useEffect(() => {}, [name, userInfo]);

  const handleFieldChange = (field, value) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const {
      grade,
      lastname,
      firstname,
      mail,
      direction,
      phoneNumbers,
      fonction,
    } = userInfo;

    // Vérification des validations
    if (!firstname) {
      message.error("Votre nom est requis !");
      return;
    }

    // Vérifiez si au moins un des champs mail ou phoneNumbers est rempli
    if (!mail && !phoneNumbers) {
      message.error(
        "Veuillez fournir soit un e-mail soit un numéro de téléphone !",
      );
      return;
    }
    const phonePattern = /^(034|038|032|037|020|033|039)\d{7}$/;
    if (phoneNumbers && !phonePattern.test(phoneNumbers)) {
      message.error(
        "Le numéro de téléphone doit commencer par 034, 038, 032, 037, 020, 033, ou 039 et contenir exactement 10 chiffres.",
      );
      return;
    }

    // Validation de l'email si fourni
    if (mail && !validateEmail(mail)) {
      message.error("Veuillez entrer une adresse e-mail valide !");
      return;
    }

    try {
      const updatedUserInfo = {
        firstname,
        lastname,
        grade,
        mail,
        phoneNumbers,
        fonction,
      };

      const updateParams = { userId, userInfoUpdate: updatedUserInfo };

      // Appel de la fonction udpdateUser avec les données mises à jour
      await updateUser(updateParams);

      // Réinitialisation de l'édition si la mise à jour réussit
      setIsEditing(false);
    } catch (error) {
      message.error("Échec de la mise à jour des informations.");
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  const buttonStyle = {
    marginBottom: "12px",
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^(034|038|032|037|020|033|039)\d{7}$/;
    if (!phonePattern.test(phoneNumber)) {
      return "Le numéro de téléphone doit commencer par 034, 038, 032, 037, 020, 033, ou 039 et contenir exactement 10 chiffres.";
    }
    return null; // No error
  };

  return (
    <>
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
            <Button
              onClick={!isEditing ? handleToggleEdit : handleSave}
              style={{ float: "right", marginBottom: "16px" }}
            >
              {isEditing ? "Sauvegarder" : "Modifier"}
            </Button>
            <Row align="middle" gutter={16}>
              <Col span={4} style={{ textAlign: "center" }}>
                <Avatar
                  size={100}
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#87d068" }}
                />
              </Col>
              <Col span={20}>
                <Row>
                  <Col
                    span={12}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <EditableField
                      editable={true}
                      label="Grade"
                      value={userInfo.grade}
                      isEditing={isEditing}
                      mode="mydirection"
                      onChange={(e) =>
                        handleFieldChange("grade", e.target.value)
                      }
                    />
                    <EditableField
                      editable={true}
                      label="Nom"
                      value={userInfo.firstname}
                      isEditing={isEditing}
                      mode="mydirection"
                      onChange={(e) => {
                        handleFieldChange(
                          "firstname",
                          e.target.value || userInfo.firstname,
                        );
                      }}
                    />
                    <EditableField
                      editable={true}
                      label="Prénom"
                      value={userInfo.lastname}
                      isEditing={isEditing}
                      required={false}
                      mode="mydirection"
                      onChange={(e) => {
                        handleFieldChange("lastname", e.target.value);
                      }}
                    />
                    <EditableField
                      editable={true}
                      label="Email"
                      value={userInfo.mail}
                      isEditing={isEditing}
                      mode="mydirection"
                      onChange={(e) =>
                        handleFieldChange("mail", e.target.value)
                      }
                    />{" "}
                  </Col>

                  <Col
                    span={12}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <EditableField
                      label="Direction"
                      value={userInfo.direction}
                      isEditing={isEditing}
                      mode="mydirection"
                      onChange={(e) =>
                        handleFieldChange("direction", e.target.value)
                      }
                    />
                    <EditableField
                      editable={true}
                      label="Téléphone (WhatsApp)"
                      value={userInfo.phoneNumbers}
                      isEditing={isEditing}
                      mode="mydirection"
                      onChange={(e) =>
                        handleFieldChange("phoneNumbers", e.target.value)
                      }
                      validate={validatePhoneNumber}
                    />
                    <EditableField
                      editable={true}
                      label="Fonction"
                      value={userInfo.fonction}
                      isEditing={isEditing}
                      mode="mydirection"
                      onChange={(e) =>
                        handleFieldChange("fonction", e.target.value)
                      }
                    />
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
            <div>
              {role === "SUPER_ADMIN" ? (
                <h3>
                  Personnels de la {name} et administrateurs de la MFA-ACTION :
                </h3>
              ) : (
                <h3>Personnels de la {name}</h3>
              )}
            </div>

            <Button
              type="primary"
              style={buttonStyle}
              onClick={() => setIsUserModalVisible(true)}
            >
              Ajouter un utilisateur
            </Button>

            {role === "SUPER_ADMIN" && (
              <Button
                type="primary"
                style={{ ...buttonStyle, marginLeft: "8px" }}
                onClick={() => setIsResponsableModalVisible(true)}
              >
                Ajouter un responsable direction
              </Button>
            )}

            <Table
              columns={columns}
              dataSource={allDirection}
              locale={localeSettings}
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
            <Typography.Text strong>Grade: </Typography.Text>{" "}
            {selectedUser.grade}
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
      <Note />
    </>
  );
};

export default ProfileComponent;
