// MissionModal.js
import React from "react";
import { Modal } from "antd";

const MissionModal = ({ visible, onCancel, mission }) => {
  return (
    <Modal
      title="Détails de la Mission"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      {mission ? (
        <div>
          <h3>Description</h3>
          <p>{mission.description}</p>
          <h4>Activités</h4>
          <ul>
            {mission.activityList.map((activity) => (
              <li key={activity.id}>
                <strong>{activity.description}</strong>
                <ul>
                  {activity.performanceRealization.map((realization) => (
                    <li key={realization.id}>
                      {realization.realization} (Indicateurs: {realization.indicators})
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Aucune mission sélectionnée.</p>
      )}
    </Modal>
  );
};

export default MissionModal;