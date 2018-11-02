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
                    onClick={() => this.props.selectMenu()}
                >
                    <SubMenu 
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
                        <Menu.Item key="sum_dic">统一字典</Menu.Item>
                    </SubMenu>
                    <SubMenu 
                        key="config_manager" 
                        title={<span><Icon type="database"/><span>配置管理</span></span>}
                    >
                        <Menu.Item key="database_manager">数据库管理</Menu.Item>
                    </SubMenu>
                    <SubMenu 
                        key="system_manager" 
                        title={<span><Icon type="tool"/><span>系统管理</span></span>}
                    >
                        <Menu.Item key="user_manager">用户管理</Menu.Item>
                        <Menu.Item key="role_manager">角色管理</Menu.Item>
                    </SubMenu>
                    <SubMenu 
                        key="assistant_manager" 
                        title={<span><Icon type="tag-o"/><span>辅助工具</span></span>}
                    >
                        <Menu.Item key="database_pool">druid</Menu.Item>
                        <Menu.Item key="interval">cron</Menu.Item>
                        <Menu.Item key="json">JSON</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default connect((state) => ({app: state.app}), {toggleCollapsed, selectMenu})(LeftMenu)