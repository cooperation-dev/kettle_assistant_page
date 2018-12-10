import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {toggleCollapsed} from '../../redux/actions/app';

import Bundle from '../../router/Bundle';
import {Layout, Icon, Breadcrumb} from 'antd';

import axios from 'axios';

import './Content.css';
import 'antd/dist/antd.css';


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

    logout = () => {
        axios.get("/api/loginController/logout")
            .then(r => {
                this.props.history.push("/user/login")
            })
    }
    
    render(){

        return (
            <Layout>
                <Layout.Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className="trigger"
                        type={this.props.app.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={() => this.props.toggleCollapsed()}
                    />
                    <Icon
                        className="trigger"
                        type="logout"
                        style={{float: "right"}}
                        onClick={this.logout}
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
                                <Route key={menu.code} exact path={menu.direction} component={createComponent(require(`bundle-loader?lazy&name=[name]!pages/${menu.component}/${menu.component}`))}></Route>
                            )
                        })
                    }
                    <Redirect exact from="/app" to="/app/sum_dic"></Redirect>
                    <Route path="*" component={createComponent(require(`bundle-loader?lazy&name=[name]!pages/Exception/404`))} />
                </Switch>
            </Layout>
        )
    }
}

export default withRouter(connect((state) => ({app: state.app}), {toggleCollapsed})(Content))