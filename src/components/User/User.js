import React from 'react';

import {Route} from 'react-router-dom';

import {Layout} from 'antd';
import {connect} from 'react-redux';
import Login from '../../pages/Login/Login';

class User extends React.Component {
    render() {
        return (
            <Layout>
                <Route exact path="/user/login" component={Login}></Route>
            </Layout>
        )
    }
}

export default connect((state)=>({user: state.user}), {})(User)