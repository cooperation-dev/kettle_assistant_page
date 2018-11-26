import React from 'react';

import {Form, Col, Input} from 'antd'; 

import {connect} from 'react-redux';

import {changeCaptcha, clickCaptcha} from '../../redux/actions/captcha';

class Captcha extends React.Component{
    render(){
        return (
            <Form.Item label="验证码">        
                <Col span={12}>
                    <Input value={this.props.captcha.captcha} onChange={(e)=>this.props.changeCaptcha(e)}></Input>
                </Col>
                <Col span={12} style={{textAlign: 'center'}}>
                    <img alt="验证码" style={{cursor: "pointer"}} src={this.props.captcha.source} onClick={()=>this.props.clickCaptcha()}/>
                </Col>
            </Form.Item>
        )
    }
}

export default connect((state) => ({
    captcha: state.captcha
}), {changeCaptcha, clickCaptcha})(Captcha)