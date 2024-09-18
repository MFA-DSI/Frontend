// DeleteMissionModal.js
import React, { useState } from "react";
import { Modal, Input } from "antd";

const DeleteMissionModal = ({ visible, onCancel, onDelete, mission, onSuccessDelete }) => {
  const [confirmMissionName, setConfirmMissionName] = useState("");
  const [deleteStatus,setDeleteStatus] = useState("");

  // Action de suppression si le nom correspond
  const handleDelete = () => {
    if (confirmMissionName === mission?.description) {
      onDelete(); // Appeler l'action de suppression (si nécessaire, gestion côté parent)
      setConfirmMissionName(""); 
      setDeleteStatus(true)
    } else {
      console.error("Les noms ne correspondent pas.");
    }
  };

  const resetModal = () => {
    setConfirmMissionName("");
    setDeleteStatus(false);
  };


  return (
    <Modal
      title="Confirmer la suppression"
      visible={visible}
      onCancel={()=> {resetModal(); 
        onCancel();}}
      onOk={deleteStatus ?()=>{handleDelete();resetModal()} :()=>{onSuccessDelete();resetModal()} }
      okButtonProps={{ disabled: confirmMissionName !== mission?.description }} // Désactiver le bouton si les noms ne correspondent pas
      okText="Supprimer"
      cancelText="Annuler"
    >
      <p>
        Pour supprimer la mission <strong>{mission?.description}</strong>, veuillez le retaper la désignation dans la case ci-dessous :
      </p>
      <Input
        value={confirmMissionName}
        onChange={(e) => setConfirmMissionName(e.target.value)}
        placeholder="Retapez la désignation de la mission"
      />
    </Modal>
  );
};

export default DeleteMissionModal;
