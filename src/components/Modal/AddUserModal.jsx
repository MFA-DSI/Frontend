import React, { useState } from "react";
import { Form, Input, Select, Modal, Button } from "antd";
import { personnelOptions, Grade } from "./utils/Grade";
import { useDirectionsContext } from "../../providers";
import { useAuthStore } from "../../hooks";

const role = useAuthStore.getState().role;

//TODO: change this to state from zustand
const directionId = localStorage.getItem("directionId");

const AddUserModal = ({ visible, onCancel }) => {
  const { saveNewUser } = useDirectionsContext();
  const [form] = Form.useForm();
  const [personnelType, setPersonnelType] = useState(null);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [contactType, setContactType] = useState("email");

  const handlePersonnelTypeChange = (value) => {
    setPersonnelType(value);
    setGradeOptions(Grade(value));
  };

  const onSave = (values) => {
    // Construct the user object according to the interface
    const user = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: contactType === "email" ? values.contactValue : null,
      phoneNumbers: contactType === "phone" ? values.contactValue : null,
      grade: personnelType !== "PC" ? values.grade : "PC",
      function: values.fonction,
      directionId: directionId,
    };

    saveNewUser(user)
      .then(() => {
        console.log("User saved successfully");
        form.resetFields();
      })
      .catch((error) => {
        console.error("Error saving user:", error);
      });
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
      })
      .catch((info) => {
        console.log("Erreur lors de la validation:", info);
      })
      .finally(onCancel());
  };

  return (
    <Modal
      visible={visible}
      title="Ajouter un utilisateur"
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      centered
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
                    contactType === "email"
                      ? "un email"
                      : "un numéro de téléphone"
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
