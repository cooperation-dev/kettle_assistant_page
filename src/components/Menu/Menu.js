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
                                    key={menu.code}
                                    title={<span><Icon type={menu.icon}/><span>{menu.name}</span></span>}
                                >
                                    {
                                        menu.children.map(child => {
                                            return (
                                                <Menu.Item key={child.code}>
                                                    <Link to={child.direction}>{child.name}</Link>
                                                </Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            )
                        })
                    }
                </Menu>
            </Sider>
        )
    }
}

export default connect((state) => ({app: state.app}), {toggleCollapsed, selectMenu})(LeftMenu)