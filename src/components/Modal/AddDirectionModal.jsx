import React from "react";
import { Form, Input, Select, Modal } from "antd";

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
      onOk={handleSave}
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
          <Input placeholder="Entrez le nom" />
        </Form.Item>

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
      </Form>
    </Modal>
  );
};

export default AddResponsableDirectionModal;
