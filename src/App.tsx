import React, {useEffect, useState} from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import {Divider, Layout, Menu, Typography} from 'antd';
import {CalendarOutlined, PieChartOutlined, UnorderedListOutlined,} from '@ant-design/icons';
import {Routing} from "./routing/routing";
import {NavLink, useLocation} from "react-router-dom";

const {Header, Content, Sider} = Layout;
const {Title} = Typography;

function App() {
    let pathname = useLocation().pathname;
    const [currentMenu, setCurrentMenu] = useState(['0'])
    useEffect(() => {
        if (pathname === '/calendar') {
            setCurrentMenu(['2'])
        } else if (pathname === '/statistics') {
            setCurrentMenu(['3'])
        } else {
            setCurrentMenu(['1'])
        }
    }, [setCurrentMenu, pathname])
    const [collapsedMenu, setCollapsedMenu] = useState(false)
    const toggleCollapse = () => {
        setCollapsedMenu(!collapsedMenu)
    }
    return (
        <Layout className={'app-layout'}>
            <Sider theme="light" collapsible collapsed={collapsedMenu} onCollapse={toggleCollapse}>
                <div className={'app-menu-header'}>
                    <Title level={collapsedMenu ? 5 : 2} className={'app-menu-header-title'}>TODOList</Title>
                </div>
                <Divider className={'app-menu-divider'}/>
                <Menu selectedKeys={currentMenu} mode="inline">
                    <Menu.Item key="1" icon={<UnorderedListOutlined/>}>
                        <NavLink to={"/tasks"}>
                            Задачаи
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<CalendarOutlined/>}>
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
            <Layout className="app-main-layout">
                <Header className="app-main-layout-background"/>
                <Content className='app-main-content'>
                    <div className="app-main-content-background">
                        <Routing/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
