// MissionModal.js
import React from "react";
import {Modal, List} from "antd";

const MissionModal = ({visible, onCancel, mission}) => {
  return (
    <Modal
      title="Détails de la Mission"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      {mission ? (
        <div>
          <div>
            <h3>Désignation : </h3>
            <p>{mission.description}</p>
          </div>

          <h4>Les Activités rattachées :</h4>
          {/* Container for the scrollable list */}
          <div style={{maxHeight: "300px", overflowY: "auto"}}>
            <List
              itemLayout="vertical"
              dataSource={mission.activityList}
              renderItem={(activity) => (
                <List.Item key={activity.id}>
                  <List.Item.Meta
                    title={<strong>{activity.description}</strong>}
                    description={
                      <ul>
                        {activity.performanceRealization.map((realization) => (
                          <li key={realization.id}>
                            Indicateurs : {realization.realization}{" "}
                            (Réalisations : {realization.indicators})
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
    </Modal>
  );
};

export default MissionModal;
