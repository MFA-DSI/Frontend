import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "./assets/index.scss";
import { authProvider } from "../../providers";

const { Title } = Typography;
const { signin } = authProvider;

const FirstLoginComponent = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      // Console logs for debugging
      console.log("Old Password:", values.oldPassword);
      console.log("New Password:", values.newPassword);
      console.log("Confirm Password:", values.confirmPassword);

      // Simulate first login password change
      await signin({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Password change failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      {" "}
      {/* Changed to match Login component */}
      <Card className="login-card" bordered={false} style={{ width: 400 }}>
        <div className="welcome-container login-logo-container">
          {" "}
          {/* Reuse similar structure */}
          <Title level={3} style={{ textAlign: "center" }}>
            Bienvenue, {username}
          </Title>
        </div>
        <Form name="change_password" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre ancien mot de passe",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Ancien mot de passe"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre nouveau mot de passe",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Nouveau mot de passe"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Veuillez confirmer votre nouveau mot de passe",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Les mots de passe ne correspondent pas"),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Confirmez le mot de passe"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              size="large"
              loading={isLoading}
            >
              Changer le mot de passe
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default FirstLoginComponent;
