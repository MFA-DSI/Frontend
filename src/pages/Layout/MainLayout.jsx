// MainLayout.js
import React, {Suspense} from "react";
import {BarChartOutlined, CloudOutlined, UserOutlined} from "@ant-design/icons";
import {RiNotification3Fill} from "react-icons/ri";
import {Layout, Menu, theme, Skeleton} from "antd";
import {Link, useLocation} from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import {HackWebProviders} from "../../providers";
import "./assets/index.css";

const {Header, Content, Sider} = Layout;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  maxWidth: "300px",
  position: "fixed",
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
};

const MainLayout = ({children}) => {
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  const location = useLocation();

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

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Avis utilisateur
      </Menu.Item>
      <Menu.Item key="2" danger>
        Se déconnecter
      </Menu.Item>
    </Menu>
  );

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
              style={{maxWidth: "100%", maxHeight: "90px"}}
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            style={{fontFamily:"Source Sans Pro",fontSize:"15px"}}
            selectedKeys={[location.pathname]}
            items={items}
          />
        </Sider>

        <Layout style={{marginInlineStart: 200}}>
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
            <div style={{flex: 1, display: "flex", justifyContent: "center"}}>
              <SearchBar />
            </div>
          </Header>
          <Content style={{overflow: "initial"}}>
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
