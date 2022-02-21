import React, {useEffect, useState} from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import {Divider, Layout, Menu, Typography} from 'antd';
import {CalendarOutlined, PieChartOutlined, UnorderedListOutlined,} from '@ant-design/icons';
import {Routing} from "./routing/routing";
import {NavLink, useLocation} from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function App() {
    let pathname = useLocation().pathname;
    const [currentMenu,setCurrentMenu]=useState(['0'])
    useEffect(()=>{
        if(pathname==='/calendar'){
            setCurrentMenu(['2'])
        }
        else if (pathname==='/statistics'){
            setCurrentMenu(['3'])
        }
        else{
            setCurrentMenu(['1'])
        }
    },[setCurrentMenu,pathname])
    const [collapsedMenu, setCollapsedMenu] = useState(false)
    const toggleCollapse = () => {
        setCollapsedMenu(!collapsedMenu)
    }
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider theme="light" collapsible collapsed={collapsedMenu} onCollapse={toggleCollapse}>
                <div style={{textAlign:"center",height: 64,lineHeight:"64px"}}>
                    <Title level={collapsedMenu ?5 :2} style={{color:"#1890ff",lineHeight: "normal",
                        display: "inline-block",
                        verticalAlign: "middle"}}>TODOList</Title>
                </div>
                <Divider style={{margin:0}}/>
                <Menu  selectedKeys={currentMenu} mode="inline">
                    <Menu.Item key="1" icon={<UnorderedListOutlined />} >
                        <NavLink to={"/tasks"}>
                            Задачаи
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<CalendarOutlined />}>
                        <NavLink to={"/calendar"}>
                        Календарь
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<PieChartOutlined/>}>
                        <NavLink to={"/statistics"}>
                        Статистика
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{ margin: '8px 8px 0', overflow: 'initial' }}>
                    <div className="site-layout-background" style={{height:"100%",padding:10}}>
                        <Routing/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
