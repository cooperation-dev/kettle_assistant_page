import React, {Component} from 'react'
import {Form, Input, Checkbox, Button, Row, Col, Table} from 'antd'

import {findUsers} from '../../redux/actions/user_manager'
import {connect} from 'react-redux';

import './UserManager.css'

class UserManager extends Component{
    componentDidMount = () => {
        this.props.findUsers()
    }
    render(){
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '昵称',
                dataIndex: 'nick_name',
                key: 'nick_name'
            },
            {
                title: '登陆账号',
                dataIndex: 'login_account',
                key: 'login_account',
            },
            {
                title: '角色',
                dataIndex: 'role',
                key: 'role'
            }
        ];
        return (
            <div style={{width:"98%", position:"relative", marginLeft:"auto", marginRight:"auto"}}>
                <Row>
                    <Form className="ant-advanced-search-form">
                        <Row gutter={24}>
                            <Col span={6} key={1}>
                                <Form.Item label="昵称:">
                                    <Input placeholder="昵称"/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={2}>
                                <Form.Item label="登陆账号:">
                                    <Input placeholder="登陆账号"/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={3}>
                                <Form.Item label="角色:">
                                    <Input placeholder="角色"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{textAlign:"center"}}>
                                <Button type="primary" htmlType="submit" style={{marginRight:8}}>查询</Button>
                                <Button style={{ marginLeft: 8 }}>重置</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row style={{marginTop:"15px"}}>
                    <Form className="ant-advanced-search-form" style={{marginBottom: "15px"}}>
                        <Button type="default" size="default" className="btn">新增</Button>
                        <Button type="default" size="default" className="btn">修改</Button>
                        <Button type="default" size="default" className="btn">删除</Button>
                        <Button type="default" size="default" className="btn">查看</Button>
                        <Button type="default" size="default" className="btn">导入</Button>
                        <Table dataSource={this.props.userManager.list} columns={columns} />
                    </Form>
                </Row>
            </div>
        )
    }
}

export default connect((state) => ({userManager: state.userManager}), {findUsers})(UserManager)