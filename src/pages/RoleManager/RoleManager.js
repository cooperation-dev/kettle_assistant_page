import React, {Component} from 'react'
import {Form, Input, Button, Row, Col, Table} from 'antd'

import {findRoles} from '../../redux/actions/role_manager'
import {connect} from 'react-redux';

import './RoleManager.css'

class RoleManager extends Component{
    componentDidMount = () => {
        this.props.findRoles()
    }
    render(){
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '角色名',
                dataIndex: 'role_name',
                key: 'role_name'
            },
            {
                title: '角色描述',
                dataIndex: 'role_description',
                key: 'role_description'
            }
        ];
        return (
            <div style={{width:"98%", position:"relative", marginLeft:"auto", marginRight:"auto"}}>
                <Row>
                    <Form className="ant-advanced-search-form">
                        <Row gutter={24}>
                            <Col span={6} key={1}>
                                <Form.Item label="角色名称:">
                                    <Input placeholder="角色名称"/>
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
                        <Button type="default" size="default" className="btn">权限分配</Button>
                        <Table dataSource={this.props.roleManager.list} columns={columns} />
                    </Form>
                </Row>
            </div>
        )
    }
}

export default connect((state) => ({roleManager: state.roleManager}), {findRoles})(RoleManager)