import React from 'react';

import {Form, Col, Input, Icon} from 'antd'; 

import {connect} from 'react-redux';

import {changeCaptcha, clickCaptcha, resetCaptcha} from '../../redux/actions/captcha';

class Captcha extends React.Component{
    componentDidMount(){
        this.props.resetCaptcha()
        this.props.clickCaptcha()
    }

    render(){
        return (
            <Form.Item>        
                <Col span={12}>
                    <Input prefix={<Icon type="switcher" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Captcha" value={this.props.captcha.captcha} onChange={(e)=>this.props.changeCaptcha(e)}/>
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
}), {changeCaptcha, clickCaptcha, resetCaptcha})(Captcha)