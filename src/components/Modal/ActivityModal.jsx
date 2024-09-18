import React, { useState, useEffect } from "react";
import { Modal, Button, Input, DatePicker } from "antd";
import moment from "moment";
import "./assets/index.css";
import { dateFormatter } from "./utils/dateFormatter";
import TaskModal from "./TaskModal";
import DeleteModal from "./DeleteModal"; // Import DeleteModal

const ActivityModal = ({ visible, onCancel, activity, mode, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(activity?.description || "");
  const [editedObservation, setEditedObservation] = useState(activity?.observation || "");
  const [editedDueDatetime, setEditedDueDatetime] = useState(activity ? moment(activity.dueDatetime) : null);
  
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskType, setTaskType] = useState("");

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Delete modal state

  useEffect(() => {
    if (activity) {
      setEditedDescription(activity.description);
      setEditedObservation(activity.observation);
      setEditedDueDatetime(moment(activity.dueDatetime));
    }
  }, [activity]);

  const handleSave = () => {
    console.log("Saving changes...", {
      description: editedDescription,
      observation: editedObservation,
      dueDatetime: editedDueDatetime,
    });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTaskSave = (task) => {
    console.log("Saving task...", task);
    setIsTaskModalVisible(false);
  };

  const openTaskModal = (task, type) => {
    setSelectedTask(task);
    setTaskType(type);
    setIsTaskModalVisible(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalVisible(false);
  };

  const handleSuccessDelete = () => {
    setIsDeleteModalVisible(false);
    onCancel(); // Close the activity modal
    console.log("Activity deleted successfully!");
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  if (!activity) return null;

  return (
    <Modal visible={visible} onCancel={onCancel} footer={null} width={800}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2>Détails de l'Activité</h2>

          <div>
            <h3>Description:</h3>
            {isEditing && mode === "mydirection" ? (
              <Input
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Modifier la description"
              />
            ) : (
              <p>{activity.description}</p>
            )}
          </div>

          <div>
            <h3>Observation:</h3>
            {isEditing && mode === "mydirection" ? (
              <Input
                value={editedObservation}
                onChange={(e) => setEditedObservation(e.target.value)}
                placeholder="Modifier l'observation"
              />
            ) : (
              <p>{activity.observation}</p>
            )}
          </div>

          <div>
            <h3>Date Limite:</h3>
            {isEditing && mode === "mydirection" ? (
              <DatePicker
                value={editedDueDatetime}
                onChange={(date) => setEditedDueDatetime(date)}
              />
            ) : (
              <p>{dateFormatter(activity.dueDatetime).toLocaleString()}</p>
            )}
          </div>

          <div>
            <h3>Tâches:</h3>
            {activity.task.length > 0 ? (
              activity.task.map((task) => (
                <p key={task.id}>
                  - {task.description} (Effectué le : {dateFormatter(task.dueDatetime).toLocaleString()})
                  {mode === "mydirection" && !isEditing && (
                    <Button
                      type="link"
                      onClick={() => openTaskModal(task, "task")}
                    >
                      Modifier
                    </Button>
                  )}
                </p>
              ))
            ) : (
              <p>Aucune tâche</p>
            )}

            {mode === "mydirection" && !isEditing && (
              <Button
                type="dashed"
                onClick={() => openTaskModal(null, "task")}
              >
                + Ajouter une tâche
              </Button>
            )}

            <h3>Tâches Prochaines:</h3>
            {activity.nextTask.length > 0 ? (
              activity.nextTask.map((nextTask) => (
                <p key={nextTask.id}>
                  - {nextTask.description} (Doit être effectué le : {dateFormatter(nextTask.dueDatetime).toLocaleString()})
                  {mode === "mydirection" && !isEditing && (
                    <Button
                      type="link"
                      onClick={() => openTaskModal(nextTask, "nextTask")}
                    >
                      Modifier
                    </Button>
                  )}
                </p>
              ))
            ) : (
              <p>Aucune tâche prochaine</p>
            )}

            {mode === "mydirection" && !isEditing && (
              <Button
                type="dashed"
                onClick={() => openTaskModal(null, "nextTask")}
              >
                + Ajouter une tâche prochaine
              </Button>
            )}
          </div>
        </div>

        <div style={{ marginInline: '20px' }}>
          {isEditing ? (
            <div>
              <Button
                type="primary"
                style={{ marginBottom: '10px', marginRight: '10px' }}
                onClick={handleSave}
              >
                Sauvegarder
              </Button>
              <Button
                style={{ marginBottom: '10px', marginRight: '10px' }}
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </Button>
            </div>
          ) : (
            mode === "mydirection" && (
              <Button
                type="primary"
                style={{ marginBottom: '10px', marginRight: '10px' }}
                onClick={handleEdit}
              >
                Modifier
              </Button>
            )
          )}

          {mode === "mydirection" && !isEditing && (
            <Button danger onClick={showDeleteModal}>
              Supprimer
            </Button>
          )}
        </div>
      </div>

      <TaskModal
        visible={isTaskModalVisible}
        onCancel={() => setIsTaskModalVisible(false)}
        task={selectedTask}
        onSave={handleTaskSave}
        title={taskType === "task" ? "Tâche" : "Tâche Prochaine"}
        type={taskType}
      />

      <DeleteModal
        itemType={'activity'}
        visible={isDeleteModalVisible}
        onCancel={handleDeleteCancel}
        onDelete={() => { onDelete(); handleSuccessDelete(); }}
        item={activity}
        onSuccessDelete={handleSuccessDelete}
      />
    </Modal>
  );
};

export default ActivityModal;
