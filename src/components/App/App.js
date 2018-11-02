import React, {Component} from 'react';

import LeftMenu from 'components/Menu/Menu';
// import getRouter from 'router/router';
import Content from 'components/Content/Content';
import {Layout} from 'antd';

export default class App extends Component{

    render() {
        return (
            <Layout style={{height:"100%"}}>
                <LeftMenu/>
                <Content/>
            </Layout>
        )
    }
}
