// MissionModal.js
import React, { useState, useEffect } from "react";
import { Modal, List, Button, message, Input } from "antd";
import DeleteMissionModal from "./DeleteModal";

const MissionModal = ({ visible, onCancel, mission, onDelete }) => {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMission, setEditedMission] = useState(mission || { description: '', activityList: [] });

  useEffect(() => {
    // Update editedMission when mission prop changes
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

  const handleSuccessDelete = () => {
    setDeleteModalVisible(false);
    onCancel();
    message.success("Mission supprimée avec succès !");
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the changes made in editedMission
    setIsEditing(false);
    // Assuming `onDelete` is a function to save the mission
    onDelete(editedMission);
    message.success("Mission modifiée avec succès !");
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            {editedMission ? (
              <div>
                <div>
                  <h3>Désignation : </h3>
                  {isEditing ? (
                    <Input
                      value={editedMission.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                    />
                  ) : (
                    <p>{editedMission.description}</p>
                  )}
                </div>

                <h4>Les Activités rattachées :</h4>
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <List
                    itemLayout="vertical"
                    dataSource={editedMission.activityList}
                    renderItem={(activity) => (
                      <List.Item key={activity.id}>
                        <List.Item.Meta
                          title={<strong>{activity.description}</strong>}
                          description={
                            <ul>
                              {activity.performanceRealization.map((realization) => (
                                <li key={realization.id}>
                                  Indicateurs : {realization.realization} (Réalisations : {realization.indicators})
                                </li>
                              ))}
                            </ul>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            ) : (
              <p>Aucune mission sélectionnée.</p>
            )}
          </div>

          <div style={{ marginInline: '20px' }}>
            {isEditing ? (
              <>
                <Button type="primary" onClick={handleSaveClick} style={{ marginBottom: '10px', marginRight: '10px' }}>
                  Sauvegarder
                </Button>
                <Button onClick={() => { setIsEditing(false); setEditedMission(mission || { description: '', activityList: [] }); }}>
                  Annuler
                </Button>
              </>
            ) : (
              <>
                <Button type="primary" style={{ marginBottom: '10px', marginRight: '10px' }} onClick={handleEditClick}>
                  Modifier
                </Button>
                <Button danger onClick={showDeleteModal}>
                  Supprimer
                </Button>
              </>
            )}
          </div>
        </div>
      </Modal>

      <DeleteMissionModal
        visible={isDeleteModalVisible}
        onCancel={handleDeleteCancel}
        onDelete={onDelete}
        mission={mission}
        onSuccessDelete={handleSuccessDelete}
      />
    </>
  );
};

export default MissionModal;
