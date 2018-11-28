import React, {Component} from 'react';

import {connect} from 'react-redux';

import {Input, Button, Layout, Form} from 'antd';

import axios from 'axios';

import Captcha from 'components/Captcha/Captcha';

import browserCookie from 'browser-cookies'
import {Redirect, withRouter} from 'react-router-dom';

const querystring = require('querystring')

class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
        }
    }

    change = (event, attribute) => {
        let newState = {};
        newState[attribute] = event.target.value;
        this.setState(newState);
    }

    handleClick = () => {
        
        let data = {
            username: this.state.username,
            password: this.state.password,
            validateCode: this.props.login.captcha
        }

        axios({
            method: 'post',
            url: '/api/login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: querystring.stringify(data)
        }).then((r) => {
            if(r.data.code=='200' && r.data.data=='SUCCESS'){
                this.props.history.push("/app/sum_dic");
            }
        })
    }

    render(){
        return (
            <Layout style={{width: 500, marginLeft: 'auto', marginRight: 'auto', padding: 20}}>
                <Form.Item label="用户名">        
                    <Input value={this.state.username} onChange={(event) => this.change(event, 'username')}></Input>
                </Form.Item>
                <Form.Item label="密码">        
                    <Input value={this.state.password} onChange={(event) => this.change(event, 'password')}></Input>
                </Form.Item>
                <Captcha></Captcha>
                <Button type="primary" onClick={this.handleClick} >登录</Button>
            </Layout>
        )
    }
}

export default withRouter(connect((state) => ({login: state.login}), {})(Login))