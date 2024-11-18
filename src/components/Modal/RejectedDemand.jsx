import React from "react";
import { Modal, Input } from "antd";

const DeleteRequestModal = ({
  visible,
  onCancel,
  onConfirm,
  comment,
  setComment,
}) => {
  return (
    <Modal
      title="Refuser la demande"
      visible={visible}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Envoyer"
      cancelText="Annuler"
      okButtonProps={{
        disabled: !comment.trim(), // Désactiver si le commentaire est vide ou espace blanc
      }}
    >
      <p>
        Veuillez indiquer la raison pour laquelle cette demande est refusée :
      </p>
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
