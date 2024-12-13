import React, { useState, useEffect } from "react";
import { Modal, Input, DatePicker, message, ConfigProvider } from "antd";
import moment from "moment";
import { useActivitiesContext } from "../../providers";
import { toast } from "react-toastify";

import frLocale from "antd/locale/fr_FR";
const TaskModal = ({
  visible,
  onCancel,
  task,
  onSave,
  title,
  type,
  activityId,
  reopenMainModal,
}) => {
  const { addTaskToActivty } = useActivitiesContext();
  const [taskToEdit, setTaskEdit] = useState({
    id: "",
    description: "",
    dueDatetime: null,
  });
  const [activity, setActivity] = useState("");

  const updateTask = (property, value) => {
    setTaskEdit((prevTask) => ({
      ...prevTask,
      [property]: value,
    }));
  };

  useEffect(() => {
    if (task && activityId) {
      setTaskEdit({
        id: task.id || "",
        description: task.description || "",
        dueDatetime: task.dueDatetime ? moment(task.dueDatetime) : null,
      });
      setActivity(activityId);
    } else {
      setTaskEdit({ id: "", description: "", dueDatetime: null });
      setActivity("");
    }
  }, [task, activityId]);

  const handleSave = async () => {
    if (!taskToEdit.description.trim() || !taskToEdit.dueDatetime) {
      message.error("Veuillez remplir tous les champs.");
      return;
    }
    const updateTask = {
      ...taskToEdit,
      id: taskToEdit.id,
      dueDatetime: taskToEdit.dueDatetime
        ? taskToEdit.dueDatetime.toISOString()
        : null,
      description: taskToEdit.description,
    };

    try {
      const Task = {
        id: activityId.id,
        task: updateTask,
        type: type,
      };
      await addTaskToActivty(Task);
      onSave();
      reopenMainModal();
      message.success("Tâche modifié avec succès !");
    } catch (error) {
      message.error(
        "Une erreur s'est produite lors de la modification de cette activité",
      );
    }
  };

  return (
    <Modal
      title={task ? `Modifier la ${title}` : `Ajouter une ${title}`}
      open={visible}
      onCancel={onCancel}
      onOk={handleSave}
      okText={task ? "Sauvegarder" : "Ajouter"}
      cancelText="Annuler"
    >
      <div>
        <h3>Description:</h3>
        <Input
          value={taskToEdit.description}
          onChange={(e) => updateTask("description", e.target.value)}
          placeholder={`Description de la ${title}`}
        />
      </div>
      <div>
        <h3>Date Limite:</h3>

        <ConfigProvider locale={frLocale}>
          <DatePicker
            disabledDate={(current) =>
              current && current.isBefore(moment(), "day")
            }
            value={taskToEdit.dueDatetime}
            onChange={(date) => updateTask("dueDatetime", date)}
            placeholder="Date limite"
            getPopupContainer={(trigger) => trigger.parentNode} // Assure que le popup reste dans le même conteneur
            dropdownAlign={{
              points: ["tl", "bl"], // Définit le point d'alignement (always bottom)
              offset: [0, 10], // Ajuste l'espace entre le champ et le popup
            }}
          />
        </ConfigProvider>
      </div>
    </Modal>
  );
};

export default TaskModal;
