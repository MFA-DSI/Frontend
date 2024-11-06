import React, { Suspense, useState } from "react";
import {
  BarChartOutlined,
  CloudOutlined,
  UserOutlined,
  NotificationOutlined,
  LogoutOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Skeleton, message, Button, theme } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HackWebProviders } from "../../providers";
import { useQueryClient } from "react-query";
import { useAuthStore } from "../../hooks";
import "./assets/index.css";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const MainLayout = ({ children }) => {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const { role, isStaff } = useAuthStore.getState();
  
  const handleLogout = async () => {
    localStorage.clear();
    queryClient.clear();
    message.info("vous êtes déconnecté");
    navigate("/login");
  };

  const menuItems = [
    ...(role === "SUPER_ADMIN" ? [{
      key: "/",
      icon: <UsergroupDeleteOutlined />,
      label: "Toutes directions",
    }] : []),
    {
      key: "/myDirection",
      icon: <CloudOutlined />,
      label: "Ma direction",
      children: [
        { key: "/myDirection", label: "Listes des Missions" },
        { key: "/reports", label: "Générer un rapport" },
      ],
    },
    { key: "/notifications", icon: <NotificationOutlined />, label: "Notification(s)" },
    { key: "/profile", icon: <UserOutlined />, label: "Mon profil" },
    ...(role === "admin" || role === "SUPER ADMIN" || isStaff === "true" ? [{
      key: "/statistics",
      icon: <BarChartOutlined />,
      label: "Statistiques",
    }] : []),
  ];

  return (
    <Layout>
      <HackWebProviders>
        <Sider
          style={styles.siderStyle}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            style={styles.menuStyle}
          >
            {menuItems.map(item => item.children ? (
              <SubMenu
                key={item.key}
                icon={item.icon}
                title={item.label}
                style={styles.subMenuStyle}
              >
                {item.children.map(subItem => (
                  <Menu.Item key={subItem.key}>
                    <Link to={subItem.key} className="menu-item-link">
                      {subItem.label}
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                style={styles.menuItemStyle}
              >
                <Link to={item.key} className="menu-item-link">
                  <span style={{ marginLeft: collapsed ? 0 : "10px" }}>{item.label}</span>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        <Header style={styles.headerStyle}>
          <div style={styles.logoContainer}>
            <img src="src/assets/logo.jpg" alt="Logo" style={styles.logoStyle} />
            <span>MFA-ACTION</span>
          </div>
          <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout} danger>
            Déconnexion
          </Button>
        </Header>

        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Content style={styles.contentStyle}>
            <div style={styles.contentContainer}>
              <Suspense fallback={<Skeleton active />}>{children}</Suspense>
            </div>
          </Content>
        </Layout>
      </HackWebProviders>
    </Layout>
  );
};

const styles = {
  siderStyle: {
    height: "100vh",
    position: "fixed",
    top: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    padding: "20px 0",
  },
  menuStyle: {
    fontFamily: "Source Sans Pro",
    fontSize: "15px",
    flex: 1,
    marginTop: "10vh",
    
  },
  subMenuStyle: {
    margin: "10px 0",
    borderRadius: "8px",
  },
  menuItemStyle: {
    margin: "10px 0",
    padding: "10px 15px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
  },
  headerStyle: {
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
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logoStyle: {
    width: "50px",
    maxWidth: "100px",
    marginRight: "20px",
  },
  contentStyle: {
    overflow: "initial",
    marginTop: 64,
  },
  contentContainer: {
    textAlign: "center",
  
  },
};

export default MainLayout;
