// MainLayout.js
import React, { Suspense } from "react";
import {
  BarChartOutlined,
  CloudOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { RiNotification3Fill } from "react-icons/ri";
import { Layout, Menu, theme, Skeleton } from "antd";
import { Link, useLocation } from 'react-router-dom';
import SearchBar from "../../components/SearchBar/SearchBar";
import { ActivityProvider } from "../../providers/context/ActivitiesContext";

const { Header, Content, Sider } = Layout;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  maxWidth: "300px",
  width: "300px",
  position: "fixed",
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const MainLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();

  const items = [
    {
      key: "/",
      icon: React.createElement(BarChartOutlined),
      label: <Link to="/">Toutes les départements</Link>,
    },
    {
      key: "/myDirection",
      icon: React.createElement(CloudOutlined),
      label: <Link to="/myDirection">Ma direction</Link>,
    },
    {
      key: "/notifications",
      icon: React.createElement(RiNotification3Fill),
      label: <Link to="/notifications">Notification(s)</Link>,
    },
    {
      key: "/profile",
      icon: React.createElement(UserOutlined),
      label: <Link to="/profile">Mon profil</Link>,
    },
  ];

  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <div style={{ marginBottom: "20px", textAlign: "center", marginTop: "40px" }}>
          <img
            src="src/assets/logo.jpg"
            alt="Logo"
            style={{ maxWidth: "100%", maxHeight: "90px" }}
          />
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={items} />
      </Sider>

      <Layout style={{ marginInlineStart: 200 }}>
        <Header style={{ padding: 0, paddingInlineStart: 12, background: "white" }}>
          <SearchBar />
        </Header>
        <Content style={{ margin: "24px", overflow: "initial" }}>
          <div style={{ textAlign: "center", background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <ActivityProvider>
              <Suspense fallback={<Skeleton active />}>
                {children}
              </Suspense>
            </ActivityProvider>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;