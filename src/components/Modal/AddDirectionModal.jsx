import React, { useState } from "react";
import { Form, Input, Select, Modal, Button } from "antd";
import { personnelOptions, Grade } from "./utils/Grade"; // Import des options de grade

const directionsOptions = [
  { value: "Direction 1", label: "Direction 1" },
  { value: "Direction 2", label: "Direction 2" },
];

const servicesOptions = [
  { value: "Service 1", label: "Service 1" },
  { value: "Service 2", label: "Service 2" },
];

const AddResponsableDirectionModal = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const [personnelType, setPersonnelType] = useState(null);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [contactType, setContactType] = useState("email"); // Default to email

  const handlePersonnelTypeChange = (value) => {
    setPersonnelType(value);
    setGradeOptions(Grade(value));
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      visible={visible}
      title="Ajouter un Responsable de Direction"
      onCancel={() => {
        form.resetFields();
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
      cancelText="Annuler"
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

        <Form.Item label="Contact">
          <Input.Group compact>
            <Form.Item
              name="contactType"
              noStyle
            >
              <Select
                defaultValue="email"
                onChange={(value) => setContactType(value)}
                style={{ width: '30%' }}
                options={[
                  { value: "email", label: "Email" },
                  { value: "phone", label: "Téléphone" },
                ]}
              />
            </Form.Item>

            <Form.Item
              name="contactValue"
              noStyle
              rules={[
                { 
                  required: true, 
                  message: `Veuillez entrer ${
                    contactType === "email" ? "un email" : "un numéro de téléphone"
                  }`,
                  type: contactType === "email" ? "email" : "string",
                  pattern: contactType === "phone" ? /^[0-9]+$/ : undefined,
                  message: contactType === "phone" ? "Veuillez entrer un numéro valide" : "Veuillez entrer un email valide"
                },
              ]}
            >
              <Input 
                placeholder={
                  contactType === "email" 
                  ? "Entrez l'adresse email" 
                  : "Entrez le numéro de téléphone"
                } 
                style={{ width: '70%' }} 
              />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          label="Type de personnel"
          name="personnelType"
          rules={[{ required: true, message: "Veuillez choisir un type de personnel" }]}
        >
          <Select
            options={personnelOptions}
            onChange={handlePersonnelTypeChange}
            placeholder="Sélectionnez le type de personnel"
          />
        </Form.Item>

        {/* Display the Grade field conditionally based on personnel type */}
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
          label="Direction"
          name="direction"
          rules={[{ required: true, message: "Veuillez choisir une direction" }]}
        >
          <Select
            options={directionsOptions}
            placeholder="Sélectionnez une direction"
          />
        </Form.Item>

        <Form.Item
          label="Service rattaché"
          name="service"
          rules={[{ required: true, message: "Veuillez choisir un service" }]}
        >
          <Select
            options={servicesOptions}
            placeholder="Sélectionnez un service rattaché"
          />
        </Form.Item>

        <Form.Item
          label="Fonction"
          name="fonction"
          rules={[{ required: true, message: "Veuillez entrer une fonction" }]}
        >
          <Input placeholder="Entrez la fonction" />
        </Form.Item>

        {/* Contact Information (Email or Phone) */}
        
      </Form>
    </Modal>
  );
};

export default AddResponsableDirectionModal;
