import React, { Suspense, useEffect, useState } from "react";
import {
  BarChartOutlined,
  CloudOutlined,
  UserOutlined,
  NotificationOutlined,
  LogoutOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Skeleton, message, Button, theme, Badge } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HackWebProviders } from "../../providers";
import { useQueryClient } from "react-query";
import { useAuthStore } from "../../hooks";
import "./assets/index.css";
import { useNotificationContext } from "../../providers/context/NotificationContext";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const MainLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { fetchNotifications, isLoading: isNotificationLoading } =
    useNotificationContext();

  const { role, isStaff } = useAuthStore.getState();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Met à jour le compteur des notifications non lues si elles sont chargées
    if (!isNotificationLoading && fetchNotifications.length > 0) {
      const count = fetchNotifications.filter(
        (notif) => notif.viewStatus === false,
      ).length;

      setUnreadCount(count);
    }
  }, [fetchNotifications, isNotificationLoading]);
  const handleLogout = async () => {
    localStorage.clear();
    queryClient.clear();
    message.info("vous êtes déconnecté");
    navigate("/login");
  };

  const menuItems = [
    ...(role === "SUPER_ADMIN"
      ? [
          {
            key: "/allDirection",
            icon: <UsergroupDeleteOutlined />,
            label: <span style={{ color: "white" }}>Toutes directions</span>,
          },
        ]
      : []),
    {
      key: "/",
      icon: <CloudOutlined />,
      label: (
        <span style={{ color: "white", fontFamily: "Quicksand, sans-serif" }}>
          Ma direction
        </span>
      ),
      children: [
        {
          key: "/myDirection",
          label: <span style={{ color: "white" }}>Listes des Missions</span>,
        },
        {
          key: "/reports",
          label: <span style={{ color: "white" }}>Générer un rapport</span>,
        },
      ],
    },
    {
      key: "/notifications",
      icon: <NotificationOutlined />,
      label: (
        <Badge count={unreadCount} offset={[10, 0]}>
          <span style={{ color: "white" }}>Notification(s)</span>
        </Badge>
      ),
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: <span style={{ color: "white" }}>Mon profil</span>,
    },
    ...(role !== "user" && isStaff === "true"
      ? [
          {
            key: "/statistics",
            icon: <BarChartOutlined />,
            label: <span style={{ color: "white" }}>Statistiques</span>,
          },
        ]
      : []),
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
            {menuItems.map((item) =>
              item.children ? (
                <SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                  style={styles.subMenuStyle}
                >
                  {item.children.map((subItem) => (
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
                    <span style={{ marginLeft: collapsed ? 0 : "10px" }}>
                      {item.label}
                    </span>
                  </Link>
                </Menu.Item>
              ),
            )}
          </Menu>
        </Sider>

        <Header style={styles.headerStyle}>
          <div style={styles.logoContainer}>
            <img
              src="data:image/png;base64,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"
              alt="Logo"
              style={styles.logoStyle}
            />
            <span>MFA-ACTION</span>
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
