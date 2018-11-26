import React, {Component} from 'react';

import {connect} from 'react-redux';

import {Input, Button, Layout, Form, Col} from 'antd';

import axios from 'axios';

const querystring = require('querystring')

class Login extends Component{
    constructor(props){
        super(props)

        this.state = {
            username: '',
            password: '',
            validateCode: '',
            captcha: ''
        }
    }

    componentDidMount = () => {
        axios.get('/api/loginController/produceValidateCode?d='+new Date()*1)
                .then((r) => {
                    this.setState({captcha: r.data})
                })
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
            validateCode: this.state.validateCode
        }

        axios({
            method: 'post',
            url: '/api/login',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: querystring.stringify(data)
        }).then((r) => {
            return r.data.data
        })
    }

    handleValidateCode = () => {
        /* axios({
            method: 'get',
            url: '/api/loginController/produceValidateCode'
        }) */
        this.src='/api/loginController/produceValidateCode'
        // this.src='/api/loginController/produceValidateCode?d='+new Date()*1
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
                <Form.Item label="验证码">        
                    <Col span={12}>
                        <Input value={this.state.validateCode} onChange={(event) => this.change(event, 'validateCode')}></Input>
                    </Col>
                    <Col span={12} style={{textAlign: 'center'}}>
                        <img alt="验证码" style={{cursor: "pointer"}} src={this.state.captcha} />
                        {/* <img alt="验证码" style={{cursor: "pointer"}} onClick = {() => {this.src='/api/loginController/produceValidateCode?d='+new Date()*1}} src="/api/loginController/produceValidateCode" /> */}
                    </Col>
                </Form.Item>
                <Button type="primary" onClick={this.handleClick} >登录</Button>
            </Layout>
        )
    }
}

export default connect((state) => ({login: state.login}), {})(Login)