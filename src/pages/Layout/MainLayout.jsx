import React, { Suspense, useState } from "react";
import {
  BarChartOutlined,
  CloudOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Skeleton, message, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { HackWebProviders } from "../../providers";
import "./assets/index.css";

const { Header, Content, Sider } = Layout;

const siderStyle = {
  height: "100vh",
  position: "fixed",
  top: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
};

const MainLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false); // Gérer l'état du burger menu

  const handleLogout = () => {
    sessionStorage.clear();
    message.info("vous êtes déconnecté");
    navigate("/login"); // Redirige vers la page de login
  };

  const items = [
    {
      key: "/",
      icon: <BarChartOutlined />,
      label: !collapsed && (
        <Link className="menu-item-link" to="/">
          Toutes les directions
        </Link>
      ),
    },
    {
      key: "/myDirection",
      icon: <CloudOutlined />,
      label: !collapsed && (
        <Link className="menu-item-link" to="/myDirection">
          Ma direction
        </Link>
      ),
    },
    {
      key: "/notifications",
      icon: <UserOutlined />,
      label: !collapsed && (
        <Link className="menu-item-link" to="/notifications">
          Notification(s)
        </Link>
      ),
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: !collapsed && (
        <Link className="menu-item-link" to="/profile">
          Mon profil
        </Link>
      ),
    },
  ];

  return (
    <Layout hasSider>
      <HackWebProviders>
        <Sider
          style={siderStyle}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Button
            type="text"
            icon={<MenuOutlined />} 
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "20px", width: "100%", marginTop: "10px" }}
          />
          <Menu
            theme="dark"
            mode="inline"
            style={{
              fontFamily: "Source Sans Pro",
              fontSize: "15px",
              flex: 1,
              marginTop: "10vh",
            }}
            selectedKeys={[location.pathname]}
            items={items}
          />
        </Sider>
        <Header
          style={{
            padding: 0,
            background: "white",
            position: "fixed",
            width: "100%",
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingInline: "20px",
            borderBottom: "1px solid #e8e8e8",
            boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="src/assets/logo.jpg"
              alt="Logo"
              style={{ width: "50px", maxWidth: "100px", marginRight: "20px" }}
            />
            <span>MFA-ACTION</span>
          </div>

          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <SearchBar />
          </div>

          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            danger
          >
            Déconnexion
          </Button>
        </Header>

        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Content style={{ overflow: "initial", marginTop: 64 }}>
            <div
              style={{
                textAlign: "center",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Suspense fallback={<Skeleton active />}>{children}</Suspense>
            </div>
          </Content>
        </Layout>
      </HackWebProviders>
    </Layout>
  );
};

export default MainLayout;
