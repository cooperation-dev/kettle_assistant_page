import { Layout } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import App from '../../components/App/App';
import User from '../../components/User/User';

class MainFrame extends React.Component {
    render() {
        return (
            <Layout>
                {/* <Route exact path="/login" component={Login} ></Route> */}
                <Route path="/user" component={User}></Route>
                <Route path="/app" component={App} ></Route>
            </Layout>
        )
    }
}

export default withRouter(connect((state) => ({mainFrame: state.mainFrame}), {})(MainFrame))