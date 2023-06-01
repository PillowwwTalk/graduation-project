import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps} from 'antd';
import {Menu, theme } from 'antd';
import { useNavigate,useLocation } from 'react-router-dom';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
    getItem('AdvCaptcha Sys', '/page1', <PieChartOutlined />),
    getItem('Safety Sys', '/page2', <DesktopOutlined />),
    getItem('Database Sys', '/page3', <FileOutlined />),
    // getItem('栏目4', '/page4', <UserOutlined />),
    // getItem('栏目5', '/page5', <TeamOutlined />, [getItem('401', '/page4/page401'), getItem('402', '/page4/page402')]),

  ];
  const Comp: React.FC = () =>{
    const {
        token: { colorBgContainer },
      } = theme.useToken();

      const navigateTo = useNavigate()
      const currentRoute = useLocation()
      const  menuClick = (e:{key:string})=>{
        navigateTo(e.key);
      }
      let firstOpenkey:string = "";

      function findKey(obj:{key:string}){
          return obj.key === currentRoute.pathname
      }
      for(let i=0;i<items.length;i++){
        if(items[i]!['children'] && items[i]!['children'].length>0 && items[i]!['children'].find(findKey)){
        firstOpenkey = items[i]!.key as string;
        break;
        }
      }
      
      const [openKeys, setOpenKeys] = useState([firstOpenkey]);
       const handleOpenChange = (keys:string[])=>{
        setOpenKeys([keys[keys.length-1]])
       }

  return (
    <Menu 
    theme="dark" 
    defaultSelectedKeys={[currentRoute.pathname]} 
    mode="inline" items={items} 
    onClick={menuClick}
    onOpenChange={handleOpenChange}
    openKeys={openKeys}
    />
  )
}
  export default Comp;