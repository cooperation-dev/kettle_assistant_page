import React, {Component} from 'react';
import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import {Layout, Icon} from 'antd';

import {selectMenu, toggleCollapsed} from '../../redux/actions/app';
import {connect} from 'react-redux';

import 'antd/dist/antd.css';
import './LeftMenu.css';

const {SubMenu} = Menu;
const {Sider} = Layout

class LeftMenu extends Component{

    render(){
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={this.props.app.collapsed}
            >
                <div className="logo" />
                <Menu
                    defaultSelectedKeys={this.props.app.selectKeys}
                    defaultOpenKeys={this.props.app.openKeys}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.props.app.collapsed}
                    onClick={(e) => this.props.selectMenu(e)}
                >
                    {
                        this.props.menu_list.map(menu => {
                            return (
                                <SubMenu 
                                    key={menu.key}
                                    title={<span><Icon type={menu.icon}/><span>{menu.title}</span></span>}
                                >
                                    {
                                        menu.children.map(child => {
                                            return (
                                                <Menu.Item key={child.key}>
                                                    <Link to={child.to}>{child.title}</Link>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            )
                        })
                    }
                    {/* <SubMenu 
                        key="job_manager" 
                        title={<span><Icon type="file"/><span>作业管理</span></span>}
                    >
                        <Menu.Item key="job_manager_detail">作业管理
                            <Link to="/job_manager">作业管理</Link>
                        </Menu.Item>
                        <Menu.Item key="job_monitor">作业监控
                            <Link to="/job_monitor">作业监控</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu 
                        key="dic_manager" 
                        title={<span><Icon type="tablet"/><span>字典管理</span></span>}
                    >
                        <Menu.Item key="sum_dic">
                            <Link to="/sum_dic">统一字典</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu 
                        key="config_manager" 
                        title={<span><Icon type="database"/><span>配置管理</span></span>}
                    >
                        <Menu.Item key="database_manager">
                            <Link to="/database_manager">数据库管理</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu 
                        key="system_manager" 
                        title={<span><Icon type="tool"/><span>系统管理</span></span>}
                    >
                        <Menu.Item key="menu_manager">
                            <Link to="/menu_manager">菜单管理</Link>
                        </Menu.Item>
                        <Menu.Item key="user_manager">
                            <Link to="/user_manager">用户管理</Link>
                        </Menu.Item>
                        <Menu.Item key="role_manager">
                            <Link to="/role_manager">角色管理</Link>
                        </Menu.Item>
                        <Menu.Item key="project_manager">
                            <Link to="/project_manager">项目管理</Link>
                        </Menu.Item>
                        <Menu.Item key="system_log">
                            <Link to="/system_log">日志管理</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu 
                        key="assistant_manager" 
                        title={<span><Icon type="tag-o"/><span>辅助工具</span></span>} 
                    >
                        <Menu.Item key="database_pool">druid</Menu.Item>
                        <Menu.Item key="interval">
                            <Link to="/aux_cron">cron</Link>
                        </Menu.Item>
                        <Menu.Item key="json">
                            <Link to="/aux_json">JSON</Link>
                        </Menu.Item>
                    </SubMenu> */}
                </Menu>
            </Sider>
        )
    }
}

export default connect((state) => ({app: state.app}), {toggleCollapsed, selectMenu})(LeftMenu)