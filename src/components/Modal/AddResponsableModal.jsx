import React, { useEffect, useState } from "react";
import { Form, Input, Select, Modal, Button, message } from "antd";
import { personnelOptions, Grade } from "./utils/Grade";
import { useDirectionsContext } from "../../providers";

import ApprobatedUserModal from "./Forms/ApprobatedUser";
import { useResponsible } from "../../hooks/useResponsible";
import { useResponsiblesContext } from "../../providers/context/ReponsibleContext";

const AddResponsableDirectionModal = ({ visible, onCancel, onSave }) => {
  const { fetchAllDirection } = useDirectionsContext();
  const { saveNewResponsible } = useResponsiblesContext();

  const [form] = Form.useForm();
  const [personnelType, setPersonnelType] = useState(null);
  const [gradeOptions, setGradeOptions] = useState([]);
  const [contactType, setContactType] = useState("email");
  const [directionsOptions, setDirectionsOptions] = useState([]);
  const [responseModalVisible, setResponseModalVisible] = useState(false);
  const [responseData, setResponseData] = useState(null);
  useEffect(() => {
    
    return () => {
    };
  }, [contactType]);
  if (visible && directionsOptions.length === 0) {
    const directions = fetchAllDirection;
    const options = directions.map((direction) => ({
      value: direction.id,
      label: direction.name,
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
          lastname: values?.lastname || "",
          email: contactType === "email" ? values.contactValue : null,
          phoneNumbers: contactType === "phone" ? values.contactValue : null,
          grade: personnelType !== "PC" ? values.grade : "PC",
          function: values.fonction,
          directionId: values.direction
        };
      

      // Call the async saveNewResponsible function with the mapped object
      await saveNewResponsible(newResponsible, {
        onSuccess: (data) => {
          // Set the response data in state
          setResponseData(data);
          // Show the modal after successful response
          setResponseModalVisible(true);
        },
        onError: (error) => {
          console.error("Failed to add responsible:", error);
        },
      });

      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Failed to save new responsible:", error);
    }
  };

  const handleCloseModal = () => {
    setResponseModalVisible(false);
    setResponseData(null);
  };

  return (
    <>
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
  rules={[
    { required: true, message: "Veuillez entrer votre nom" },
    {
      pattern: /^[A-Za-zÀ-ÿ]+$/,
      message: "Le nom ne doit contenir que des lettres",
    },
  ]}
>
  <Input placeholder="Entrez le nom" />
</Form.Item>

<Form.Item
  label="Prénom"
  name="lastname"
  rules={[
    {  message: "Veuillez entrer votre prénom" },
    {
      pattern: /^[A-Za-zÀ-ÿ]+$/,
      message: "Le prénom ne doit contenir que des lettres",
    },
  ]}
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
            contactType === "email" ? "votre email" : "votre numéro de téléphone"
          }`,
        },
        contactType === "email"
          ? {
              type: "email",
              message: "Veuillez entrer votre email valide",
            }
          : {
              pattern: /^(034|039|038|037|033|032)\d{7}$/,
              message:
                "Veuillez entrer votre numéro de téléphone valide (commençant par 034, 039, 038, 032, 037, ou 033 et comportant 10 chiffres).",
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
            label="Direction"
            name="direction"
            rules={[
              { required: true, message: "Veuillez choisir une direction" },
            ]}
          >
            <Select
              options={directionsOptions}
              placeholder="Sélectionnez une direction"
            />
          </Form.Item>

          <Form.Item
            label="Fonction"
            name="fonction"
            rules={[
              { required: true, message: "Veuillez entrer une fonction" },
            ]}
          >
            <Input placeholder="Entrez la fonction" />
          </Form.Item>
        </Form>
      </Modal>

      {responseData && (
        <ApprobatedUserModal
          title={`Nouveau Responsable du ${responseData?.directionName}`}
          visible={responseModalVisible}
          onCancel={handleCloseModal}
          responseData={responseData}
        >
          <div>
            <p>Direction : {responseData?.directionName}</p>
            <p>Identifiant : {responseData?.identity}</p>
            <p>Mot de passe : {responseData?.password}</p>
            <p>
              Les informations d'identification ont été enregistrées dans un
              fichier Excel nommé
              <strong>{responseData?.name}.xlsx</strong>.
            </p>
          </div>
        </ApprobatedUserModal>
      )}
    </>
  );
};

export default AddResponsableDirectionModal;
