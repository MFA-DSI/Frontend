import React, { Suspense } from "react";
import { BarChartOutlined, CloudOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { RiNotification3Fill } from "react-icons/ri";
import { Layout, Menu, theme, Skeleton, message, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { HackWebProviders } from "../../providers";
import "./assets/index.css";

const { Header, Content, Sider } = Layout;

const siderStyle = {
  height: "100vh",
  width: "300px",
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
    sessionStorage.clear();
    message.info("vous êtes déconnecté");
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
          <Menu
            theme="dark"
            mode="inline"
            style={{ fontFamily: "Source Sans Pro", fontSize: "15px", flex: 1 ,marginTop:"15vh"
            }}
            selectedKeys={[location.pathname]}
            items={items}
          />
          <Menu
            theme="dark"
            mode="inline"
            style={{ marginTop: "45vh", textAlign: "center" }} // Align the logout button to the bottom
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
              boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)" 
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="src/assets/logo.jpg"
                alt="Logo"
                style={{width:"50px", maxWidth: "100px", marginRight: "20px" }}
              />
              <span>MFA-ACTION</span>
            </div>

           
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <SearchBar />
            </div>

           
            <Button icon={<RiNotification3Fill />} />
          </Header>

        <Layout style={{ marginLeft: 200 }}>
          
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
