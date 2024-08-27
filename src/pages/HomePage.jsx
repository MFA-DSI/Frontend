import React from 'react';
import {
  BarChartOutlined,
  CloudOutlined,
  UserOutlined,
  BellOutlined
} from '@ant-design/icons';
import { AiOutlineBarChart } from "react-icons/ai";
import { RiNotification3Fill } from "react-icons/ri";
import { Layout, Menu, theme,Avatar } from 'antd';
import "./assets/index.css"
import SearchBar from '../components/SearchBar/SearchBar';
import TableComponent from '../components/Table/Table';
const { Header, Content, Footer, Sider } = Layout;
const siderStyle = {
  overflow: 'auto',
  height: '100vh',
  maxWidth: '300px',
  width: '300px',
  position: 'fixed',
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
};

const Home = () => {
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items = [

        {
          key: '1',
          icon: React.createElement(BarChartOutlined),
          label: 'Toutes les départements',
          className: 'side__text__first'
        },
        {
          key: '2',
          icon: React.createElement(CloudOutlined),
          label: 'Mon département',
          className: 'side__text'
        },
        {
          key: '3',
          icon: React.createElement(RiNotification3Fill),
          label: 'Notification(s)',
          className: 'side__text'
        },
        {
          key: '4',
          icon: React.createElement(UserOutlined),
          label: 'Mon profil',
          className: 'side__text'
        },
      ];

      

  return (
    <Layout hasSider  >
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <div style={{ marginBottom: '20px', textAlign: 'center',marginTop:'40px' }}>
        <img
          src="src\assets\logo.jpg"
          alt="Logo"
          style={{ maxWidth: '100%', maxHeight: '90px' }}
        />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout
        style={{
          marginInlineStart: 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            paddingInlineStart : 12,
            background: 'white',
          }}
        >
          <SearchBar />
         
        </Header>
        <Content
          style={{
            margin: '24px',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              
              textAlign: 'center',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
           <TableComponent>

           </TableComponent>
          </div>
        </Content>
        
      </Layout>
    </Layout>
  );
};
export default Home;