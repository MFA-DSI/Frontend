import React from "react";
import { Modal } from "antd";
import './assets/index.css';
import { dateFormatter } from "./utils/dateFormatter";

const ModalComponent = ({ visible, onCancel, activity }) => {
  if (!activity) return null;

  return (
      <Modal
        title="Détails de l'Activité"
        visible={visible}
        onCancel={onCancel}
        footer={null}
        width={800}
      >
        <p>
          <strong>Description:</strong> {activity.description}
        </p>
        <p>
          <strong>Observation:</strong> {activity.observation}
        </p>
        <p>
          <strong>Date Limite:</strong> {dateFormatter(activity.dueDatetime).toLocaleString()}
        </p>
        <p>
          <strong>Tâches:</strong>
        </p>
        {activity.task.length > 0 ? (
          activity.task.map((task) => (
            <p key={task.id}>
              - {task.description} ( Effectué le  : {dateFormatter(task.dueDatetime).toLocaleString()})
            </p>
          ))
        ) : (
          <p>Aucune tâche</p>
        )}
        <p>
          <strong>Tâches Prochaines:</strong>
        </p>
        {activity.nextTask.length > 0 ? (
          activity.nextTask.map((nextTask) => (
            <p key={nextTask.id}>
              - {nextTask.description} (Doit être effectuer le : {dateFormatter(nextTask.dueDatetime).toLocaleString()})
            </p>
          ))
        ) : (
          <p>Aucune tâche prochaine</p>
        )}
        <div className="performance-recommendations">
          <div className="performance-indicators">
            <strong>Indicateurs de Performance:</strong>
            {activity.perfRealizationDTO.length > 0 ? (
              activity.perfRealizationDTO.map((realization) => (
                <p key={realization.id}>
                  - Indicateur : {realization.realization} (Réalisation: {realization.performanceIndicators})
                </p>
              ))
            ) : (
              <p>Aucun indicateur de performance</p>
            )}
          </div>
          <div className="recommendations">
            <strong>Recommandations:</strong>
            {activity.recommendation.length > 0 ? (
              activity.recommendation.map((rec, index) => (
                <p key={index.description}>- {"s"}</p>
              ))
            ) : (
              <p>Aucune recommandation</p>
            )}
          </div>
        </div>
      </Modal>
  );
};

export default ModalComponent;