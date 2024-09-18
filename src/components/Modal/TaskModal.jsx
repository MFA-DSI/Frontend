import React, { useState, useEffect } from "react";
import { Modal, Input, DatePicker } from "antd";
import moment from "moment";

const TaskModal = ({ visible, onCancel, task, onSave, title, type }) => {
  const [description, setDescription] = useState("");
  const [dueDatetime, setDueDatetime] = useState(null);

  useEffect(() => {
    if (task) {
      setDescription(task.description);
      setDueDatetime(moment(task.dueDatetime));
    } else {
      setDescription("");
      setDueDatetime(null);
    }
  }, [task]);

  const handleSave = () => {
    onSave({ description, dueDatetime, type });
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={`Description de la ${title}`}
        />
      </div>
      <div>
        <h3>Date Limite:</h3>
        <DatePicker
          value={dueDatetime}
          onChange={(date) => setDueDatetime(date)}
          placeholder="Date limite"
        />
      </div>
    </Modal>
  );
};

export default TaskModal;
