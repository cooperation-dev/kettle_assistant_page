import React from 'react';

import {Route, Redirect} from 'react-router-dom';

import {Layout} from 'antd';
import {connect} from 'react-redux';
import Login from '../../pages/Login/Login';

class User extends React.Component {
    render() {
        return (
            <Layout>
                <Route exact path="/user/login" component={Login}></Route>
                <Redirect exact from="/user" to="/user/login"></Redirect>
            </Layout>
        )
    }
}

export default connect((state)=>({user: state.user}), {})(User)