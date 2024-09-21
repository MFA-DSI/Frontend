import React, {useState} from "react";
import {Modal, Input} from "antd";

const DeleteModal = ({
  visible,
  onCancel,
  onDelete,
  item,
  onSuccessDelete,
  itemType,
}) => {
  const [confirmName, setConfirmName] = useState("");
  const [deleteStatus, setDeleteStatus] = useState(false);

  const handleDelete = () => {
    if (confirmName === item?.description) {
      onDelete();
      setConfirmName("");
      setDeleteStatus(true);
    } else {
      console.error("Les noms ne correspondent pas.");
    }
  };

  const resetModal = () => {
    setConfirmName("");
    setDeleteStatus(false);
  };

  return (
    <Modal
      title={`Confirmer la suppression`}
      visible={visible}
      onCancel={() => {
        resetModal();
        onCancel();
      }}
      onOk={
        deleteStatus
          ? () => {
              handleDelete();
              resetModal();
            }
          : () => {
              onSuccessDelete();
              resetModal();
            }
      }
      okButtonProps={{disabled: confirmName !== item?.description}} // Désactiver le bouton si les noms ne correspondent pas
      okText="Supprimer"
      cancelText="Annuler"
    >
      <p>
        Pour supprimer {itemType === "mission" ? "la mission" : "l'activité"}{" "}
        <strong>{item?.description}</strong>, veuillez retaper la désignation
        dans la case ci-dessous :
      </p>
      <Input
        value={confirmName}
        onChange={(e) => setConfirmName(e.target.value)}
        placeholder={`Retapez la désignation de ${itemType === "mission" ? "la mission" : "l'activité"}`}
      />
    </Modal>
  );
};

export default DeleteModal;
