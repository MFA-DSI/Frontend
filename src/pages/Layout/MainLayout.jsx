
import React, { Suspense, useState } from "react";
import {
  BarChartOutlined,
  CloudOutlined,
  UserOutlined,
  NotificationOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Skeleton, message, Button, Drawer } from "antd";
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
  padding: "20px 0", 
};

const MainLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false); 
  const [visible, setVisible] = useState(false); 

  const handleLogout = () => {
    sessionStorage.clear();
    message.info("vous êtes déconnecté");
    navigate("/login"); // Redirige vers la page de login
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const items = [
    {
      key: "/",
      icon: <BarChartOutlined />,
      label: "Toutes les directions",
    },
    {
      key: "/myDirection",
      icon: <CloudOutlined />,
      label: "Ma direction",
    },
    {
      key: "/notifications",
      icon: <UserOutlined />,
      label: "Notification(s)",
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Mon profil",
    },
  ];

  return (
    <Layout>
      <HackWebProviders>
        {/* Sider pour les grands écrans */}
        <Sider
          style={siderStyle}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
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
          >
            {items.map((item) => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                style={{
                  margin: "10px 0", // Ajout de marge pour chaque item
                  padding: "10px 15px", // Ajout de padding pour chaque item
                  borderRadius: "8px", // Arrondi des coins
                  display: "flex", // Utilisation de flex pour aligner l'icône et le label
                  alignItems: "center", // Aligner les éléments au centre
                }}
              >
                <Link className="menu-item-link" to={item.key}>
                  <span style={{ marginLeft: collapsed ? "0" : "10px" }}>
                    {item.label}
                  </span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        {/* Header avec le bouton burger et la SearchBar */}
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
          <Button
            type="text"
            icon={<MenuOutlined />} // Icône du menu burger
            onClick={showDrawer}
            style={{ fontSize: "20px" }} 
            className="burger-menu" // Pour les styles responsives
          />
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

          {/* Bouton de déconnexion dans l'en-tête */}
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            danger
          >
            Déconnexion
          </Button>
        </Header>

        {/* Drawer pour les petits écrans */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={closeDrawer}
          visible={visible}
        >
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
          >
            {items.map((item) => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                style={{
                  margin: "10px 0", // Ajout de marge pour chaque item
                  padding: "10px 15px", // Ajout de padding pour chaque item
                  borderRadius: "8px", // Arrondi des coins
                  display: "flex", // Utilisation de flex pour aligner l'icône et le label
                  alignItems: "center", // Aligner les éléments au centre
                }}
              >
                <Link className="menu-item-link" to={item.key}>
                  <span>{item.label}</span>
                </Link>
              </Menu.Item>
            ))}
            <Menu.Item key="logout" icon={<LogoutOutlined />} danger onClick={handleLogout}>
              Se déconnecter
            </Menu.Item>
          </Menu>
        </Drawer>

        {/* Contenu principal */}
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
