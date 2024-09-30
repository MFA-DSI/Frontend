import React, { useState, useEffect } from "react";
import { Modal, Button, Input, DatePicker, message, Badge } from "antd";
import moment from "moment";
import "./assets/index.css";
import { dateFormatter } from "./utils/dateFormatter";
import TaskModal from "./TaskModal";
import DeleteModal from "./DeleteModal";
import { useActivitiesContext } from "../../providers";
import { toast } from "react-toastify";
import PerformanceModal from "./PerformanceModal";
import { EditableField } from "./Forms/ActivityDetails";
import { TaskList } from "./Forms/TaskDetails";
import RecommendationModal from "./RecommendationModal";

const ActivityModal = ({ visible, onCancel, activity, mode, onDelete }) => {
  const { deleteActivity, updateMissionActivity } = useActivitiesContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedActivity, setEditedActivity] = useState({
    id: activity?.id || "",
    description: activity?.description || "",
    observation: activity?.observation || "",
    dueDatetime: activity ? moment(activity.dueDatetime) : null,
    prediction: activity?.prediction || "",
  });
  const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskType, setTaskType] = useState("");
  const [isPerformanceModalVisible, setIsPerformanceModalVisible] =
    useState(false);
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isRecommendationVisible, setIsRecommendationVisible] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    if (activity) {
      setEditedActivity({
        id: activity.id,
        description: activity.description,
        observation: activity.observation,
        dueDatetime: moment(activity.dueDatetime),
        prediction: activity.prediction,
      });
    }
  }, [activity]);

  const handleInputChange = (field, value) => {
    setEditedActivity((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handleSave = async () => {
    if (!activity || !activity.id) {
      message.error("Activité non valide ou ID manquant !");
      return;
    }
    try {
      const activityUpdate = {
        id: editedActivity.id,
        description: editedActivity.description,
        prediction: editedActivity.prediction,
        observation: editedActivity.observation,
        dueDatetime: editedActivity.dueDatetime,
      };
      await updateMissionActivity(activityUpdate);
      onCancel();
      setIsEditing(false);
    } catch (error) {
      message.error(
        "Une erreur s'est produite lors de la modification de cette activité",
      );
      toast.error(error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTaskSave = () => {
    setIsTaskModalVisible(false);
  };

  const openTaskModal = (task, type) => {
    setSelectedTask(task);
    setTaskType(type);
    setIsTaskModalVisible(true);
  };

  const openPerformanceModal = (performance) => {
    setSelectedPerformance(performance);
    setIsPerformanceModalVisible(true);
  };

  const openRecommendationModal = () => {
    setSelectedActivity(editedActivity);
    setIsRecommendationVisible(true);
  };
  const handlePerformanceModalCancel = () => {
    setSelectedPerformance(null);
    setIsPerformanceModalVisible(false);
  };
  const handlePerformanceSave = () => {
    setIsPerformanceModalVisible(false);
    onCancel();
  };

  const handleRecommendationSave = () => {
    setIsRecommendationVisible(false);
  };
  const handleRecommendationCancel = () => {
    setIsRecommendationVisible(false);
    onCancel();
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
    } catch (error) {
      message.error(
        "Une erreur s'est produite lors de la suppression de cette activity",
      );
      toast.error(error.message);
    }
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  if (!activity) return null;

  return (
    <Modal visible={visible} onCancel={onCancel} footer={null} width={800}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h2>Détails de l'Activité</h2>

          <div>
            <EditableField
              label="Description"
              value={editedActivity.description}
              isEditing={isEditing}
              mode={mode}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Modifier la description"
            />
          </div>

          <div>
            <EditableField
              label="Prédiction"
              value={editedActivity.prediction}
              isEditing={isEditing}
              mode={mode}
              onChange={(e) => handleInputChange("prediction", e.target.value)}
              placeholder="Modifier la prédiction"
            />
          </div>

          <div>
            <EditableField
              label="Observation"
              value={editedActivity.observation}
              isEditing={isEditing}
              mode={mode}
              onChange={(e) => handleInputChange("observation", e.target.value)}
              placeholder="Modifier l'observation"
            />
          </div>

          <div>
            <EditableField
              label="Date Limite"
              value={editedActivity.dueDatetime}
              isEditing={isEditing}
              mode={mode}
              onChange={(date) => handleInputChange("dueDatetime", date)}
              inputType="date"
            />
          </div>

          <div>
            <TaskList
              title="Tâches"
              tasks={activity.task}
              isEditing={isEditing}
              mode={mode}
              openTaskModal={openTaskModal}
              type="task"
            />

            <TaskList
              title="Tâches Prochaines"
              tasks={activity.nextTask}
              isEditing={isEditing}
              mode={mode}
              openTaskModal={openTaskModal}
              type="nextTask"
            />

            <h3>Performance:</h3>
            {activity.performanceRealization.length > 0 ? (
              activity.performanceRealization.map((performanceIndicator) => (
                <p key={performanceIndicator.id}>
                  - {performanceIndicator.realization} (
                  {performanceIndicator.indicators}{" "}
                  {performanceIndicator.realizationType === "percentage"
                    ? "%"
                    : ""}{" "}
                  )
                  {mode === "mydirection" && !isEditing && (
                    <Button
                      type="link"
                      onClick={() => openPerformanceModal(performanceIndicator)}
                    >
                      Modifier
                    </Button>
                  )}
                </p>
              ))
            ) : (
              <p>Aucune indicateur de performance</p>
            )}
            {mode === "mydirection" && !isEditing && (
              <Button
                type="dashed"
                onClick={() => openPerformanceModal(editedActivity)}
              >
                + Ajouter une indicateur de performance
              </Button>
            )}

            <h3>Recommandation:</h3>
            {activity.recommendation.length > 0 ? (
              activity.recommendation.map((e) => (
                <p key={e.id}>
                  - {e.description}
                  {e.validate_status ? (
                    <Badge color="green" count="Approuvé" />
                  ) : (
                    <>
                      <Badge color="blue" count="Non approuvé" />
                      {mode === "mydirection" && !isEditing && (
                        <Button
                          type="link"
                          onClick={() => openRecommendationModal()}
                        >
                          Approuver
                        </Button>
                      )}
                    </>
                  )}
                </p>
              ))
            ) : (
              <p>Aucune Recommandation</p>
            )}
            {mode === "mydirection" && !isEditing && (
              <Button
                type="dashed"
                onClick={() => openRecommendationModal(selectedActivity)}
              >
                + Ajouter une recommendation
              </Button>
            )}
          </div>
        </div>

        <div style={{ marginInline: "20px" }}>
          {isEditing ? (
            <div>
              <Button
                type="primary"
                style={{ marginBottom: "10px", marginRight: "10px" }}
                onClick={handleSave}
              >
                Sauvegarder
              </Button>
              <Button
                style={{ marginBottom: "10px", marginRight: "10px" }}
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </Button>
            </div>
          ) : (
            mode === "mydirection" && (
              <Button
                type="primary"
                style={{ marginBottom: "10px", marginRight: "10px" }}
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
        activityId={activity}
        task={selectedTask}
        onSave={handleTaskSave}
        title={taskType === "task" ? "Tâche" : "Tâche Prochaine"}
        type={taskType}
        reopenMainModal={() => {
          onCancel();
          setTimeout(() => {
            onCancel(false);
          }, 200);
        }}
      />
      <PerformanceModal
        visible={isPerformanceModalVisible}
        onCancel={handlePerformanceModalCancel}
        performance={selectedPerformance}
        onSave={handlePerformanceSave}
        activityId={activity}
        reopenMainModal={() => {
          onCancel();
          setTimeout(() => {
            onCancel(false);
          }, 200);
        }}
      />

      <RecommendationModal
        visible={isRecommendationVisible}
        onCancel={handleRecommendationCancel}
        activity={selectedActivity}
        onSave={handleRecommendationSave}
        recommendation={selectedActivity}
        onCloseSuccess={() => {
          onCancel();
          setTimeout(() => {
            onCancel(false);
          }, 200);
        }}
      />

      <DeleteModal
        itemType={"activity"}
        visible={isDeleteModalVisible}
        onCancel={handleDeleteCancel}
        onDelete={() => {
          onDelete();
          handleSuccessDelete();
        }}
        item={activity}
        onSuccessDelete={handleSuccessDelete}
      />
    </Modal>
  );
};

export default ActivityModal;
