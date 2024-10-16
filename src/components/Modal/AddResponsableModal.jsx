import React, { useState } from "react";
import { Form, Input, Select, Modal, Button, message } from "antd";
import { personnelOptions, Grade } from "./utils/Grade";
import { useDirectionsContext } from "../../providers";


const AddResponsableDirectionModal = ({ visible, onCancel, onSave }) => {
  const { fetchAllDirection, saveNewResponsible } = useDirectionsContext();
  const [form] = Form.useForm();
  const [personnelType, setPersonnelType] = useState(null);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [contactType, setContactType] = useState("email");
  const [directionsOptions, setDirectionsOptions] = useState([]);

  // Fetch directions directly
  if (visible && directionsOptions.length === 0) {
    const directions = fetchAllDirection(); // Fetch directions from the context
    const options = directions.map((direction) => ({
      value: direction.id, // Set id as the value
      label: direction.name, // Set name as the label
    }));
    setDirectionsOptions(options);
  }

  const handlePersonnelTypeChange = (value) => {
    setPersonnelType(value);
    setGradeOptions(Grade(value));
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      
      // Map form values to the NewResponsible interface
      const newResponsible = {
        firstname: values.firstname,
        lastname: values.lastname,
        grade: values.personnelType,
        directionId: values.direction, 
        function: values.fonction,
        ...(contactType === "email" ? { email: values.contactValue } : { phone: values.contactValue }),
        ...(personnelType && personnelType !== "PC" ? { grade: values.grade } : {}),
      };


      console.log(newResponsible);
      
      // Call the async saveNewResponsible function with the mapped object
      await saveNewResponsible(newResponsible);
      message.success("Responsable ajouté avec succès");
      form.resetFields();
      onSave(newResponsible); // Pass the transformed values to onSave if needed
    } catch (error) {
      console.error("Failed to save new responsible:", error);
    }
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
            <Form.Item name="contactType" noStyle>
              <Select
                defaultValue="email"
                onChange={(value) => setContactType(value)}
                style={{ width: "30%" }}
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
                },
                contactType === "email"
                  ? {
                      type: "email",
                      message: "Veuillez entrer un email valide",
                    }
                  : {
                      pattern: /^[0-9]+$/,
                      message: "Veuillez entrer un numéro valide",
                    },
              ]}
            >
              <Input
                placeholder={
                  contactType === "email"
                    ? "Entrez l'adresse email"
                    : "Entrez le numéro de téléphone"
                }
                style={{ width: "70%" }}
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
            options={directionsOptions} // Dynamically populated options
            placeholder="Sélectionnez une direction"
          />
        </Form.Item>

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

export default AddResponsableDirectionModal;
