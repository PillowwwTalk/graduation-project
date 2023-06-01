import React, { useState } from 'react';
import { UserOutlined, SlackOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, theme, Avatar} from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Mainmenu from "../components/Mainmenu"

const { Header, Content, Footer, Sider } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'left',
  color: '#fff',
  height: 54,
  lineHeight: 2.3,
  backgroundColor: '#1E90FF',
  fontSize: 22
};

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={headerStyle}>
        <SlackOutlined />&nbsp;
        对抗验证码生成系统
      </Header>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} trigger={null}>
          <div style={{height: 32, margin: 16, color: 'white', fontSize: 16}}>
            &nbsp;&nbsp;
            <Avatar style={{ backgroundColor: '#1e90ff'}} icon={<UserOutlined /> } size={'large'}/>
            &nbsp; &nbsp;Admin
          </div>
          <Mainmenu></Mainmenu>
        </Sider>
        <Content style={{ margin: '16px 16px 0' }}>
          <div style={{padding:24, minHeight: 715, background: colorBgContainer }}>
            <Outlet/>
          </div>
        </Content>
      </Layout>
      <Layout className="site-layout">
        {/* 右边底部 */}
        <Footer style={{ textAlign: 'center', padding:0, lineHeight:"48px" }}>Designed and developed by pillow</Footer>
      </Layout>
    </Layout>
  );
};

export default View;