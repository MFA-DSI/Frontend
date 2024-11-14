import React, { useEffect, useState } from "react";
import { Form, Input, Select, Modal, Button, message } from "antd";
import { personnelOptions, Grade } from "./utils/Grade";
import { useDirectionsContext } from "../../providers";
import { useAuthStore } from "../../hooks";
import { Await } from "react-router-dom";
import { useResponsiblesContext } from "../../providers/context/ReponsibleContext";

//TODO: change this to state from zustand
const directionId = localStorage.getItem("directionId");

const AddUserModal = ({ visible, onCancel }) => {
  const { saveNewUser } = useResponsiblesContext();

  const [form] = Form.useForm();
  const [personnelType, setPersonnelType] = useState(null);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [contactType, setContactType] = useState("email");

  useEffect(() => {
    return () => {};
  }, [contactType]);
  const handlePersonnelTypeChange = (value) => {
    setPersonnelType(value);
    setGradeOptions(Grade(value));
  };

  const onSave = async (values) => {
    const user = {
      firstname: values.firstname,
      lastname: values?.lastname || "",
      email: contactType === "email" ? values.contactValue : null,
      phoneNumbers: contactType === "phone" ? values.contactValue : null,
      grade: personnelType !== "PC" ? values.grade : "PC",
      function: values.fonction,
      directionId: directionId,
    };

    try {
      const savedUser = await saveNewUser(user);
      console.log(savedUser);

      if (savedUser) {
        form.resetFields();

        return true; // Indicate that the save was successful
      }
    } catch (error) {
      message.error("Error saving user: " + error.message);
    }

    return false; // Indicate that the save failed
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const isSaved = await onSave(values);
      if (isSaved) {
        onCancel(); // Call onCancel only if saving was successful
      }
    } catch (info) {
      console.log("Erreur lors de la validation:", info);
    }
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
          rules={[{ message: "Veuillez entrer un prénom" }]}
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
                      pattern: /^(034|038|032|037|020|033|039)\d{7}$/,
                      message:
                        "Veuillez entrer un numéro de téléphone valide (commençant par 034, 032, 039, 038, 037, ou 033 et comportant 10 chiffres).",
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
                maxLength={contactType === "phone" ? 10 : undefined} // Limite à 10 caractères uniquement pour téléphone
                onChange={(e) => {
                  // Filtrer uniquement les chiffres
                  if (contactType === "phone") {
                    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                    e.target.value = onlyNums;
                  }
                }}
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
