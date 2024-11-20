import React, { useState } from "react";
import { Modal, Input, message } from "antd";
import { useMissionContext } from "../../providers";

const DeleteRequestModal = ({
  visible,
  onCancel,
  onConfirm,
  value,
}) => {
  const { respondToDirectionReportRequest } = useMissionContext();
  const [comment,setComment]= useState("");
  // Fonction asynchrone pour gérer l'envoi
  const handleConfirm = async () => {

    if(!comment.trim()){
      message.warning("une rapport réfusé doit obligatoirement avoir une commentaire")
      return;
    }
    try {
      await respondToDirectionReportRequest({
        requestId: value.id, // Assurez-vous que `value` contient cet ID
        targetDirectionId: value.targetDirection.id, // Paramètre requis
        status: "REJECTED", // Exemple : status de refus
        comment: comment, // Le commentaire saisi par l'utilisateur
      });
      onConfirm(); // Action à effectuer après la réussite de l'envoi
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      // Gérer les erreurs ici (par exemple : affichage de notification)
    }
  };

  return (
    <Modal
      title="Refuser la demande"
      visible={visible}
      onCancel={onCancel}
      onOk={handleConfirm} // Remplacez par handleConfirm
      okText="Envoyer"
      cancelText="Annuler"
      okButtonProps={{
        disabled: !comment.trim(), // Désactiver si le commentaire est vide ou espace blanc
      }}
    >
      <p>Veuillez indiquer la raison pour laquelle cette demande est refusée :</p>
      <Input.TextArea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Votre commentaire..."
      />
    </Modal>
  );
};

export default DeleteRequestModal;
