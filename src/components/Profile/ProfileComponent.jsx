// Profile.js
import React, {useState} from "react";
import {Form, Input, Button, Typography} from "antd";

export const ProfileComponent = () => {
  const [userInfo, setUserInfo] = useState({
    username: "Utilisateur",
    email: "user@example.com",
  });

  const onFinish = (values) => {
    console.log("Received values:", values);
    setUserInfo(values);
    // Here you can also add logic to update user info on the server
  };

  return (
    <div>
      <Typography.Title level={2}>Profil Utilisateur</Typography.Title>
      <Form layout="vertical" initialValues={userInfo} onFinish={onFinish}>
        <Form.Item
          label="Nom d'utilisateur"
          name="username"
          rules={[
            {
              required: true,
              message: "Veuillez entrer votre nom d'utilisateur!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{required: true, message: "Veuillez entrer votre email!"}]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Mettre à jour
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
