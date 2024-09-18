import React, { Suspense } from "react";
import { BarChartOutlined, CloudOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { RiNotification3Fill } from "react-icons/ri";
import { Layout, Menu, theme, Skeleton,message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { HackWebProviders } from "../../providers";
import "./assets/index.css";

const { Header, Content, Sider } = Layout;

const siderStyle = {
  height: "100vh",
  width: "300px", // Taille fixe pour éviter le scroll
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

  const handleLogout = () => {
    sessionStorage.clear()
    message.info("vous êtes déconnecté")
    navigate("/login"); // Redirige vers la page de login
  };

  const items = [
    {
      key: "/",
      icon: React.createElement(BarChartOutlined),
      label: <Link className="menu-item-link" to="/">Toutes les directions</Link>,
    },
    {
      key: "/myDirection",
      icon: React.createElement(CloudOutlined),
      label: <Link className="menu-item-link" to="/myDirection">Ma direction</Link>,
    },
    {
      key: "/notifications",
      icon: React.createElement(RiNotification3Fill),
      label: <Link className="menu-item-link" to="/notifications">Notification(s)</Link>,
    },
    {
      key: "/profile",
      icon: React.createElement(UserOutlined),
      label: <Link className="menu-item-link" to="/profile">Mon profil</Link>,
    },
  ];

  return (
    <Layout hasSider>
      <HackWebProviders>
        <Sider style={siderStyle}>
          <div className="demo-logo-vertical" />
          <div
            style={{
              marginBottom: "20px",
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            <img
              src="src/assets/logo.jpg"
              alt="Logo"
              style={{ maxWidth: "100%", maxHeight: "90px" }}
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            style={{ fontFamily: "Source Sans Pro", fontSize: "15px", flex: 1 }}
            selectedKeys={[location.pathname]}
            items={items}
          />
             <Menu
            theme="dark"
            mode="inline"
            style={{ marginTop: "37vh", textAlign: "center",bottom:"0" }} // Pousse le bouton en bas
          >
            <Menu.Item
              key="logout"
              icon={<LogoutOutlined />}
              danger
              onClick={handleLogout}
              style={{ textAlign: "center" }}
            >
              Se déconnecter
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ marginInlineStart: 200 }}> {/* Ajout de 300px pour correspondre à la largeur du Sider */}
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
            }}
          >
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <SearchBar />
            </div>
          </Header>
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
