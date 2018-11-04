import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import {connect} from 'react-redux';
import {toggleCollapsed} from '../../redux/actions/app';

import JobManager from 'bundle-loader?lazy&name=[name]!pages/JobManager/JobManager';
import JobMonitor from 'bundle-loader?lazy&name=[name]!pages/JobMonitor/JobMonitor';
import SumDic from 'bundle-loader?lazy&name=[name]!pages/SumDic/SumDic';
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
                </Switch>
            </Layout>
        )
    }
}

export default connect((state) => ({app: state.app}), {toggleCollapsed})(Content)