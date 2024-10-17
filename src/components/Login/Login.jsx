import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authProvider } from "../../providers/auth-provider";
import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./assets/index.scss";

const { Title } = Typography;
const { login } = authProvider;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      // Appel de la fonction login et récupération de la réponse
      const ress = await login({ email: values.email, password: values.password });
      console.log("Response:", ress);
  
      // Si premier login, rediriger vers /signin
      if (ress.message === "You must change your password upon first login") {
        navigate("/signin");
      } else {
        // Sinon, rediriger vers "/"
        setTimeout(() => {
          navigate("/"); // Redirection après la connexion réussie
        }, 500);
      }
    } catch (error) {
      console.error("Authentication failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false} style={{ width: 400 }}>
        <div className="login-logo-container">
          <img src="src/assets/logo.jpg" alt="Logo" className="login-logo" />
        </div>
        <Title level={3} style={{ textAlign: "center" }}>
          MFA - ACTION
        </Title>
        <Form
          name="admin_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Veuillez saisir votre email " },
              { type: "email", message: "Veuillez entrer un email valide" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Votre email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Veuillez saisir votre mot de passe ",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Votre mot de passe"
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
              S'authentifier
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
