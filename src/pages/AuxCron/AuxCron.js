import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Radio, Select, Row} from 'antd';

import './AuxCron.css';

const {Option} = Select

class AuxCron extends Component{


    render(){
        return (
            <div style={{width:"98%", position:"relative", marginLeft:"auto", marginRight:"auto"}}>
                <Form style={{padding: 10}} className="ant-advanced-search-form">
                    <Radio.Group defaultValue="1">
                        <Row>
                            <Radio value="1">每秒允许的通配符</Radio>
                        </Row>
                        <Row>
                            <Radio value="2">周期从
                                <Select defaultValue="1" style={{width: 60}}>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                </Select>-
                                <Select defaultValue="2" style={{width: 60}}>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                    <Option value="4">4</Option>
                                </Select>
                                秒
                            </Radio>
                        </Row>
                        <Row>
                            <Radio value="3">从
                                <Select defaultValue="1" style={{width: 60}}>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                </Select>
                                秒开始，每
                                <Select defaultValue="1" style={{width: 60}}>
                                    <Option value="1">1</Option>
                                    <Option value="2">2</Option>
                                    <Option value="3">3</Option>
                                </Select>秒执行一次
                            </Radio>
                        </Row>
                    </Radio.Group>
                </Form>    
            </div>
        )
    }
}

export default connect((state) => ({
    cron: state.cron
}), {})(AuxCron)