import React, { useState } from "react";
import { Modal, Button, Input, DatePicker } from "antd";
import moment from "moment";
import TaskModal from "./TaskModal"; // Importer le TaskModal
import "./assets/index.css";
import { dateFormatter } from "./utils/dateFormatter";

const ActivityModal = ({ visible, onCancel, activity, mode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(activity?.description || "");
  const [editedObservation, setEditedObservation] = useState(activity?.observation || "");
  const [editedDueDatetime, setEditedDueDatetime] = useState(activity ? moment(activity.dueDatetime) : null);

  // Task modal state for adding/editing
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); 
  const [taskType, setTaskType] = useState(""); // For distinguishing between tasks and nextTasks

  const handleSave = () => {
    console.log("Sauvegarde en cours...", {
      description: editedDescription,
      observation: editedObservation,
      dueDatetime: editedDueDatetime,
    });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const openTaskModal = (task = null, type = "task") => {
    setSelectedTask(task);
    setTaskType(type); // To distinguish between task and nextTask
    setTaskModalVisible(true);
  };

  const handleTaskSave = (newTask) => {
    console.log("Nouvelle tâche enregistrée:", newTask);
    setTaskModalVisible(false);
    setSelectedTask(null);
  };

  const closeTaskModal = () => {
    setTaskModalVisible(false);
    setSelectedTask(null);
  };

  if (!activity) return null;

  return (
    <Modal visible={visible} onCancel={onCancel} footer={null} width={800}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2>Détails de l'Activité</h2>

          <div>
            <h3>Description:</h3>
            {isEditing ? (
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
            {isEditing ? (
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
            {isEditing ? (
              <DatePicker value={editedDueDatetime} onChange={(date) => setEditedDueDatetime(date)} />
            ) : (
              <p>{dateFormatter(activity.dueDatetime).toLocaleString()}</p>
            )}
          </div>

          <div>
            <h3>Tâches:</h3>
            {activity.task.length > 0 ? (
              activity.task.map((task) => (
                <div key={task.id}>
                  <p>
                    - {task.description} (Effectué le : {dateFormatter(task.dueDatetime).toLocaleString()})
                  </p>
                  {mode === "mydirection" && (
                    <Button type="link" onClick={() => openTaskModal(task, "task")}>
                      Modifier
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <p>Aucune tâche</p>
            )}
            {mode === "mydirection" && (
              <Button type="dashed" onClick={() => openTaskModal(null, "task")}>
                + Ajouter une tâche
              </Button>
            )}

            <h3>Tâches Prochaines:</h3>
            {activity.nextTask.length > 0 ? (
              activity.nextTask.map((nextTask) => (
                <div key={nextTask.id}>
                  <p>
                    - {nextTask.description} (Doit être effectué le : {dateFormatter(nextTask.dueDatetime).toLocaleString()})
                  </p>
                  {mode === "mydirection" && (
                    <Button type="link" onClick={() => openTaskModal(nextTask, "nextTask")}>
                      Modifier
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <p>Aucune tâche prochaine</p>
            )}
            {mode === "mydirection" && (
              <Button type="dashed" onClick={() => openTaskModal(null, "nextTask")}>
                + Ajouter une tâche prochaine
              </Button>
            )}
          </div>
        </div>

        <div style={{ marginInline: "20px" }}>
          {isEditing ? (
            <div>
              <Button type="primary" style={{ marginBottom: "10px", marginRight: "10px" }} onClick={handleSave}>
                Sauvegarder
              </Button>
              <Button type="info" style={{ marginBottom: "10px", marginRight: "10px" }} onClick={onCancel}>
                Annuler
              </Button>
            </div>
          ) : (
            <Button type="primary" style={{ marginBottom: "10px", marginRight: "10px" }} onClick={handleEdit}>
              Modifier
            </Button>
          )}

          {mode === "mydirection" && !isEditing && <Button danger>Supprimer</Button>}
        </div>
      </div>

      <TaskModal
        visible={taskModalVisible}
        onCancel={closeTaskModal}
        task={selectedTask}
        onSave={handleTaskSave}
        title={taskType === "task" ? "tâche" : "tâche prochaine"}
        type={taskType}
      />
    </Modal>
  );
};

export default ActivityModal;
