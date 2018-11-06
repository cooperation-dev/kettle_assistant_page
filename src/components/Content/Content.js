import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import {connect} from 'react-redux';
import {toggleCollapsed} from '../../redux/actions/app';

import JobManager from 'bundle-loader?lazy&name=[name]!pages/JobManager/JobManager';
import JobMonitor from 'bundle-loader?lazy&name=[name]!pages/JobMonitor/JobMonitor';
import SumDic from 'bundle-loader?lazy&name=[name]!pages/SumDic/SumDic';
import DatabaseManager from 'bundle-loader?lazy&name=[name]!pages/DatabaseManager/DatabaseManager';
import MenuManager from 'bundle-loader?lazy&name=[name]!pages/MenuManager/MenuManager';
import SystemLog from 'bundle-loader?lazy&name=[name]!pages/SystemLog/SystemLog';
import AuxCron from 'bundle-loader?lazy&name=[name]!pages/AuxCron/AuxCron';
import AuxJson from 'bundle-loader?lazy&name=[name]!pages/AuxJson/AuxJson';
import UserManager from 'bundle-loader?lazy&name=[name]!pages/UserManager/UserManager';
import RoleManager from 'bundle-loader?lazy&name=[name]!pages/RoleManager/RoleManager';
import ProjectManager from 'bundle-loader?lazy&name=[name]!pages/ProjectManager/ProjectManager';
import Bundle from '../../router/Bundle';
import {Layout, Icon, Breadcrumb} from 'antd';

import './Content.css';
import MenuItem from 'antd/lib/menu/MenuItem';
import { runInThisContext } from 'vm';

const Loading = function () {
    return <div>Loading...</div>
};

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);


class Content extends Component{
    
    render(){
        let a = require('bundle-loader?lazy&name=[name]!pages/JobManager/JobManager')
        return (
            <Layout>
                <Layout.Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className="trigger"
                        type={this.props.app.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={() => this.props.toggleCollapsed()}
                    />
                </Layout.Header>
                <Breadcrumb separator=">" style={{padding: "15px"}}>
                    <Breadcrumb.Item>作业管理</Breadcrumb.Item>
                    <Breadcrumb.Item>作业管理</Breadcrumb.Item>
                </Breadcrumb>
                <Switch>
                    {
                        this.props.menu_list.filter(menu => menu.component!="").map(menu => {
                            return (
                                <Route key={menu.key} exact path={menu.to} component={createComponent(require(`bundle-loader?lazy&name=[name]!pages/${menu.component}/${menu.component}`))}></Route>
                            )
                        })
                    }
                </Switch>
            </Layout>
        )
    }
}

export default connect((state) => ({app: state.app}), {toggleCollapsed})(Content)