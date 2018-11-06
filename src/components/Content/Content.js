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
import UserManager from 'bundle-loader?lazy&name=[name]!pages/UserManager/UserManager';
import RoleManager from 'bundle-loader?lazy&name=[name]!pages/RoleManager/RoleManager';
import ProjectManager from 'bundle-loader?lazy&name=[name]!pages/ProjectManager/ProjectManager';
import Bundle from '../../router/Bundle';
import {Layout, Icon, Breadcrumb} from 'antd';

import './Content.css';

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
                    <Route exact path="/job_manager" component={createComponent(JobManager)}></Route>
                    <Route exact path="/job_monitor" component={createComponent(JobMonitor)}></Route>
                    <Route exact path="/sum_dic" component={createComponent(SumDic)}></Route>
                    <Route exact path="/database_manager" component={createComponent(DatabaseManager)}></Route>
                    <Route exact path="/menu_manager" component={createComponent(MenuManager)}></Route>
                    <Route exact path="/system_log" component={createComponent(SystemLog)}></Route>
                    <Route exact path="/user_manager" component={createComponent(UserManager)}></Route>
                    <Route exact path="/role_manager" component={createComponent(RoleManager)}></Route>
                    <Route exact path="/project_manager" component={createComponent(ProjectManager)}></Route>
                </Switch>
            </Layout>
        )
    }
}

export default connect((state) => ({app: state.app}), {toggleCollapsed})(Content)