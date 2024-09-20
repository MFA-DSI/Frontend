import React, { useState, useEffect } from "react";
import { Modal, Button, Input, DatePicker,message } from "antd";
import moment from "moment";
import "./assets/index.css";
import { dateFormatter } from "./utils/dateFormatter";
import TaskModal from "./TaskModal";
import DeleteModal from "./DeleteModal"; 
import { useActivitiesContext } from "../../providers";
import { toast } from "react-toastify";


const ActivityModal = ({ visible, onCancel, activity, mode, onDelete }) => {
  const {deleteActivity,updateMissionActivity } = useActivitiesContext()
  const [isEditing, setIsEditing] = useState(false);
  const [editedActivity, setEditedActivity] = useState({
    id : activity?.id ||"",
    description: activity?.description || "",
    observation: activity?.observation || "",
    dueDatetime: activity ? moment(activity.dueDatetime) : null,
    prediction: activity?.prediction || ""
  });
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskType, setTaskType] = useState("");

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Delete modal state

  useEffect(() => {
    if (activity) {
      setEditedActivity({
        id : activity.id,
        description: activity.description,
        observation: activity.observation,
        dueDatetime: moment(activity.dueDatetime),
        prediction: activity.prediction
      });
    }
  }, [activity]);
  
  const handleInputChange = (field, value) => {
    setEditedActivity((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };
  const handleSave = async () => {

    if (!activity || !activity.id) {
      message.error("Activité non valide ou ID manquant !");
      return;
    }
    try {
      const activityUpdate = {
        id : editedActivity.id,
        description : editedActivity.description,
        prediction : editedActivity.prediction,
        observation : editedActivity.observation,
        dueDatetime : editedActivity.dueDatetime
        
      }
      await updateMissionActivity(activityUpdate); 
      onCancel();
      setIsEditing(false);
      message.success("Activity modifié avec succès !");
    } catch (error) {
      message.error("Une erreur s'est produite lors de la modification de cette activité");
      toast.error(error.message);
    }
   
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

  const handleSuccessDelete = async () => {
    if (!activity || !activity.id) {
      message.error("Activité non valide ou ID manquant !");
      return;
    }
    try {
      await deleteActivity(activity.id); 
      setIsDeleteModalVisible(false);
      onCancel();
      message.success("Activity supprimée avec succès !");
    } catch (error) {
      message.error("Une erreur s'est produite lors de la suppression de cette activity");
      toast.error(error.message);
    }
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
      value={editedActivity.description}
      onChange={(e) => handleInputChange("description", e.target.value)}
      placeholder="Modifier la description"
    />
  ) : (
    <p>{activity.description}</p>
  )}
</div>

<div>
  <h3>Prédiction:</h3>
  {isEditing && mode === "mydirection" ? (
    <Input
      value={editedActivity.prediction}
      onChange={(e) => handleInputChange("prediction", e.target.value)}
      placeholder="Modifier la prédiction"
    />
  ) : (
    <p>{activity.prediction}</p>
  )}
</div>

<div>
  <h3>Observation:</h3>
  {isEditing && mode === "mydirection" ? (
    <Input
      value={editedActivity.observation}
      onChange={(e) => handleInputChange("observation", e.target.value)}
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
      value={editedActivity.dueDatetime}
      onChange={(date) => handleInputChange("dueDatetime", date)}
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
