import React, { useState } from "react";
import { Form, Input, Select, Modal, Button } from "antd";
import { personnelOptions, Grade } from "./utils/Grade"; // Import de vos options de grade

const AddUserModal = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm(); // Utilisation de form pour gérer les valeurs du formulaire
  const [personnelType, setPersonnelType] = useState(null);
  const [gradeOptions, setGradeOptions] = useState([]);

  const handlePersonnelTypeChange = (value) => {
    setPersonnelType(value);
    setGradeOptions(Grade(value)); // Récupérer les grades selon le type de personnel
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values); // Appel de la fonction onSave avec les valeurs du formulaire
        form.resetFields(); // Réinitialisation des champs après enregistrement
      })
      .catch((info) => {
        console.log("Erreur lors de la validation:", info);
      });
  };

  return (
    <Modal
      visible={visible}
      title="Ajouter un utilisateur"
      onCancel={() => {
        form.resetFields(); // Réinitialise le formulaire lors de l'annulation
        onCancel();
      }}
      footer={[
        <Button key="back" onClick={onCancel}>
          Annuler
        </Button>,
        <Button key="submit" type="primary" onClick={handleSave}>
          Enregistrer
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nom"
          name="firstname"
          rules={[{ required: true, message: "Veuillez entrer un nom" }]}
        >
          <Input placeholder="Entrez le nom" />
        </Form.Item>
        <Form.Item
          label="Prénom"
          name="lastname"
          rules={[{ required: true, message: "Veuillez entrer un prénom" }]}
        >
          <Input placeholder="Entrez le prénom" />
        </Form.Item>

        <Form.Item
          label="Type de personnel"
          name="personnelType"
          rules={[
            {
              required: true,
              message: "Veuillez choisir un type de personnel",
            },
          ]}
        >
          <Select
            options={personnelOptions}
            onChange={handlePersonnelTypeChange}
            placeholder="Sélectionnez le type de personnel"
          />
        </Form.Item>

        {personnelType && personnelType !== "PC" && (
          <Form.Item
            label="Grade"
            name="grade"
            rules={[{ required: true, message: "Veuillez choisir un grade" }]}
          >
            <Select
              options={gradeOptions.map((grade) => ({
                value: grade,
                label: grade,
              }))}
              placeholder="Sélectionnez le grade"
            />
          </Form.Item>
        )}

        <Form.Item
          label="Fonction"
          name="fonction"
          rules={[{ required: true, message: "Veuillez entrer une fonction" }]}
        >
          <Input placeholder="Entrez la fonction" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
