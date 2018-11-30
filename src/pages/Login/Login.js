import React, {Component} from 'react';

import {connect} from 'react-redux';

import {Input, Button, Layout, Form, Icon} from 'antd';

import axios from 'axios';

import Captcha from 'components/Captcha/Captcha';

import browserCookie from 'browser-cookies'
import {withRouter} from 'react-router-dom';

import './Login.css';
import 'antd/dist/antd.css';
import { relative } from 'path';

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
                this.props.history.push("/app");
            }else if(r.data.code == '401'){
                this.props.history.push("/user/login")
            }
        })
    }

    render(){

        return (
            <Layout.Content className="layout-style">
                <div style={{textAlign: "center"}}>用户登录</div>
                <Form className="login-form">
                    <Form.Item >        
                        {/* <Input value={this.state.username} onChange={(event) => this.change(event, 'username')}></Input> */}
                        {/* {getFieldDecorator('username', { */}
                            {/* rules: [{ required: true, message: 'Please input your username!' }], */}
                        {/* })( */}
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" value={this.state.username} onChange={(event) => this.change(event, 'username')}/>
                        {/* )} */}
                    </Form.Item>
                    <Form.Item >        
                        {/* <Input value={this.state.password} onChange={(event) => this.change(event, 'password')}></Input> */}
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" value={this.state.password} onChange={(event) => this.change(event, 'password')}/>
                    </Form.Item>
                    <Captcha></Captcha>
                    <Button type="primary" onClick={this.handleClick} className="login-form-button">登录</Button>

                </Form>
            </Layout.Content>
        )
    }
}

export default withRouter(connect((state) => ({login: state.login}), {})(Login))