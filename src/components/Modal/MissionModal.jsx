import React, { useState, useEffect } from "react";
import { Modal, List, Button, message, Input } from "antd";
import DeleteModal from "./DeleteModal";
import { useMissionContext } from "../../providers";
import { toast } from "react-toastify";
import { useAuthStore } from "../../hooks";

const MissionModal = ({ visible, onCancel, mission, onDelete, mode }) => {
  const { deleteMission, updateMission } = useMissionContext();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMission, setEditedMission] = useState(
    mission || { description: "", activityList: [] },
  );

  const role = useAuthStore.getState().role;
  useEffect(() => {
    if (mission) {
      setEditedMission(mission);
    }
  }, [mission]);

  const showDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleSuccessDelete = async () => {
    if (!mission || !mission.id) {
      message.error("Mission non valide ou ID manquant !");
      return;
    }

    try {
      await deleteMission(mission.id);
      setDeleteModalVisible(false);
      onCancel();
    } catch (error) {
      message.error(
        "Une erreur s'est produite lors de la suppression de cette mission",
      );
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (!mission || !mission.id) {
      message.error("Mission non valide ou ID manquant !");
      return;
    }

    try {
      const missionToUpdate = {
        id: editedMission.id,
        name: editedMission.description,
      };
      await updateMission(missionToUpdate);
      setIsEditing(false);
      onCancel();
      onDelete(editedMission);
      message.success("Mission modifiée avec succès !");
      setEditedMission(mission || { description: "", activityList: [] });
    } catch (error) {
      message.error(
        "Une erreur s'est produite lors de la suppression de cette mission",
      );
    }
  };

  const handleChange = (field, value) => {
    setEditedMission({ ...editedMission, [field]: value });
  };

  return (
    <>
      <Modal
        title="Détails de la Mission"
        visible={visible}
        onCancel={onCancel}
        footer={null}
        width={800}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Left Section with Mission Details */}
          <div style={{ flex: 1 }}>
            {editedMission ? (
              <div>
                <div>
                  <h3>Désignation : </h3>
                  {isEditing ? (
                    <Input
                      value={editedMission.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                    />
                  ) : (
                    <p>{editedMission.description}</p>
                  )}
                </div>

                <h4>Les Activités rattachées :</h4>
                <List
                  itemLayout="vertical"
                  dataSource={editedMission.activityList}
                  renderItem={(activity) => (
                    <List.Item key={activity.id}>
                      <List.Item.Meta
                        title={<strong>{activity.description}</strong>}
                        description={
                          <ul>
                            {activity.performanceRealization.map(
                              (realization) => (
                                <li key={realization.id}>
                                  Indicateur : {realization.realization}{" "}
                                  (Réalisations : {realization.indicators})
                                </li>
                              ),
                            )}
                          </ul>
                        }
                      />
                    </List.Item>
                  )}
                />
              </div>
            ) : (
              <p>Aucune mission sélectionnée.</p>
            )}
          </div>

          {/* Right Section with Edit and Delete Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              paddingRight: "12px",
            }}
          >
            {mode === "mydirection" && (
              <>
                {isEditing ? (
                  <>
                    <Button
                      type="primary"
                      onClick={handleSaveClick}
                      style={{ marginBottom: "10px", marginInline: "12px" }}
                    >
                      Sauvegarder
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        setEditedMission(
                          mission || { description: "", activityList: [] },
                        );
                      }}
                    >
                      Annuler
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="primary"
                      style={{ marginBottom: "10px", marginInline: "12px" }}
                      onClick={handleEditClick}
                    >
                      Modifier
                    </Button>
                    {(role === "ADMIN" || role === "SUPER_ADMIN") && (
                      <Button
                        color="danger"
                        variant="solid"
                        danger
                        style={{ marginBottom: "10px", marginRight: "10px" }}
                        onClick={showDeleteModal}
                      >
                        Supprimer
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Modal>

      <DeleteModal
        itemType={"mission"}
        visible={isDeleteModalVisible}
        onCancel={handleDeleteCancel}
        onDelete={onDelete}
        item={mission}
        onSuccessDelete={handleSuccessDelete}
      />
    </>
  );
};

export default MissionModal;
