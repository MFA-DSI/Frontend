import React, { useState, useEffect } from "react";
import { Modal, Input, DatePicker } from "antd";
import moment from "moment";

const TaskModal = ({ visible, onCancel, task, onSave, title, type }) => {
  
  const [taskToEdit, setTaskEdit] = useState({
    id: "",
    description: "",
    dueDatetime: null,
  });

  const updateTask = (property, value) => {
    setTaskEdit((prevTask) => ({
      ...prevTask,
      [property]: value,
    }));
  };

  useEffect(() => {
    if (task) {
      setTaskEdit({
        id: task.id || "",
        description: task.description || "",
        dueDatetime: task.dueDatetime ? moment(task.dueDatetime) : null, // utiliser moment pour gérer les dates
      });
    } else {
      setTaskEdit({ id: "", description: "", dueDatetime: null });
    }
  }, [task]);

  const handleSave = () => {
    onSave({
      ...taskToEdit,
      dueDatetime: taskToEdit.dueDatetime ? taskToEdit.dueDatetime.toISOString() : null, 
      type,
    });
    
  };

  return (
    <Modal
      title={task ? `Modifier la ${title}` : `Ajouter une ${title}`}
      visible={visible}
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
        <DatePicker
          value={taskToEdit.dueDatetime}
          onChange={(date) => updateTask("dueDatetime", date)}
          placeholder="Date limite"
        />
      </div>
    </Modal>
  );
};

export default TaskModal;
