import { Modal, Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useActivitiesContext } from "../../providers";

const { TextArea } = Input;

const RecommendationModal = ({ visible, onCancel, activity, onSave, recommendation }) => {
  const {addRecommendation} = useActivitiesContext();
  const [recommendationUpdate, setRecommendationUpdate] = useState("");
  const [activityTitle, setActivityTitle] = useState("");

  const handleSend =async () => {
    if (onSave) {
      onSave(recommendationUpdate); 
    }

    try {
        const recommandationToUpdate = {
            activityId : activity.id,
            description : recommendationUpdate
          }
        console.log(recommandationToUpdate);
        
      await addRecommendation(recommandationToUpdate);

      onSave(performanceData);
      onCancel();
     
    } catch (error) {
      message.error(
        "Une erreur s'est produite lors de la modification de cette activité"
      );
      toast.error(error.message);
    }
  
  };

  useEffect(() => {
    if (recommendation && activity) {
      setActivityTitle(activity.description);
    } else {
      setRecommendationUpdate("");
      setActivityTitle("");
    }
  }, [recommendation, activity]);

  return (
    <Modal
      visible={visible}
      title={`Recommandation pour l'activité: ${activityTitle}`}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Annuler
        </Button>,
        <Button key="submit" type="primary" onClick={handleSend}>
          Envoyer
        </Button>,
      ]}
    >
      <p>Votre recommandation sur cette activité:</p>
      <TextArea
        rows={4}
        placeholder="Entrez votre recommandation ici"
        value={recommendationUpdate}
        onChange={(e) => setRecommendationUpdate(e.target.value)}
      />
    </Modal>
  );
};

export default RecommendationModal;