import React, { Suspense, useState } from "react";
import {
  BarChartOutlined,
  CloudOutlined,
  UserOutlined,
  NotificationOutlined,
  LogoutOutlined,
  DownOutlined, // Petite flèche pour le sous-menu
} from "@ant-design/icons";
import { Layout, Menu, Skeleton, message, Button, theme } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { HackWebProviders } from "../../providers";
import "./assets/index.css";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu; // Utilisation du SubMenu pour les dropdowns

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

  const handleLogout = () => {
    sessionStorage.clear();
    message.info("vous êtes déconnecté");
    navigate("/login");
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
      children: [
        {
          key: "/myDirection",
          label: "Listes des Missions",
        },
        {
          key: "/reports",
          label: "Générer un rapport",
        },
        {
          key: "/myDirection/rapport-activite",
          label: "Rapport d'Activité",
        },
      ],
    },
    {
      key: "/notifications",
      icon: <NotificationOutlined />,
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
            {/* Mapping des items du menu */}
            {items.map((item) => (
              item.children ? (
                <SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                  style={{
                    margin: "10px 0",
                   
                    borderRadius: "8px",
                  }}
                >
                  {/* Sous-menu pour la section "Ma direction" */}
                  {item.children.map((subItem) => (
                    <Menu.Item key={subItem.key}>
                      <Link className="menu-item-link" to={subItem.key}>
                        {subItem.label}
                      </Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  style={{
                    margin: "10px 0",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Link className="menu-item-link" to={item.key}>
                    <span style={{ marginLeft: collapsed ? "0" : "10px" }}>
                      {item.label}
                    </span>
                  </Link>
                </Menu.Item>
              )
            ))}
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
