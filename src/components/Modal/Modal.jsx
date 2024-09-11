// ModalComponent.js
import React from "react";
import {Modal} from "antd";

const ModalComponent = ({visible, onCancel, activity}) => {
  if (!activity) return null;

  return (
    <Modal
      title="Détails de l'Activité"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <p>
        <strong>Misson:</strong> {activity.mission}
      </p>
      <p>
        <strong>Activité:</strong> {activity.activity}
      </p>
      <p>
        <strong>Date Limite:</strong>{" "}
        {new Date(activity.dueDatetime).toLocaleString()}
      </p>
      <p>
        <strong>Observations:</strong> {activity.observation}
      </p>
    </Modal>
  );
};

export default ModalComponent;
