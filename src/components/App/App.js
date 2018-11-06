import React, {Component} from 'react';

import LeftMenu from 'components/Menu/Menu';
import Content from 'components/Content/Content';
import {Layout} from 'antd';

import {connect} from 'react-redux';
import {loadMenu} from '../../redux/actions/app';

class App extends Component{
    componentDidMount = () => {
        this.props.loadMenu()
    }

    render() {
        return (
            <Layout style={{height:"100%"}}>
                <LeftMenu menu_list={this.props.app.list}/>
                <Content menu_list={this.props.app.sub_list}/>
            </Layout>
        )
    }
}

export default connect(
    (state) => ({app: state.app}), {loadMenu}
)(App)