import React from "react";
import { Modal, Button } from "antd";
import "./assets/index.css";
import { dateFormatter } from "./utils/dateFormatter";

const ActivityModal = ({ visible, onCancel, activity }) => {
  if (!activity) return null;

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null} 
      width={800} 
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2>Détails de l'Activité</h2>
          <p>Description: {activity.description}</p>
          <p>Observation: {activity.observation}</p>
          <p>Date Limite: {dateFormatter(activity.dueDatetime).toLocaleString()}</p>

        <div>
          <h3>Tâches:</h3>
          {activity.task.length > 0 ? (
            activity.task.map((task) => (
              <p key={task.id}>- {task.description} ( Effectué le : {dateFormatter(task.dueDatetime).toLocaleString()})</p>
            ))
          ) : (
            <p>Aucune tâche</p>
          )}

          <h3>Tâches Prochaines:</h3>
          {activity.nextTask.length > 0 ? (
            activity.nextTask.map((nextTask) => (
              <p key={nextTask.id}>- {nextTask.description} (Doit être effectué le : {dateFormatter(nextTask.dueDatetime).toLocaleString()})</p>
            ))
          ) : (
            <p>Aucune tâche prochaine</p>
          )}

          <h3>Indicateurs de Performance:</h3>
          {activity.performanceRealization.length > 0 ? (
            activity.performanceRealization.map((realization) => (
              <p key={realization.id}>- Indicateur : {realization.realization} (Réalisation: {realization.indicators})</p>
            ))
          ) : (
            <p>Aucun indicateur de performance</p>
          )}

          <h3>Recommandations:</h3>
          {activity.recommendation.length > 0 ? (
            activity.recommendation.map((rec, index) => (
              <p key={index}>- {rec}</p>
            ))
          ) : (
            <p>Aucune recommandation</p>
          )}
          </div>
        </div>
        
        <div style={{marginInline: '20px'}}>
         
          <Button type="primary" style={{ marginBottom: '10px',marginRight:'10px' }}>
           Modifier 
          </Button>
          <Button danger>
            Supprimer
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ActivityModal;