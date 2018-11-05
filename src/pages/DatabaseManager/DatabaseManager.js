import React, {Component} from 'react'
import {Form, Input, Checkbox, Button, Row, Col, Table} from 'antd'

import {findList} from '../../redux/actions/database_manager'
import {connect} from 'react-redux';

import './DatabaseManager.css'

class DatabaseManager extends Component{
    componentDidMount = () => {
        this.props.findList()
    }
    render(){
        const columns = [
            {
                title: '对象代码',
                dataIndex: 'obj_id',
                key: 'obj_id'
            },
            {
                title: '对象名称',
                dataIndex: 'obj_name',
                key: 'obj_name'
            },
            {
                title: '对象排序',
                dataIndex: 'obj_sort',
                key: 'obj_sort',
                // defaultSortOrder: 'descend',
                sorter: (a, b) => a.obj_sort - b.obj_sort
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time'
            },
            {
                title: '创建人',
                dataIndex: 'create_name',
                key: 'create_name'
            },
            {
                title: '是否禁用',
                // dataIndex: 'whether_to_disable',
                key: 'whether_to_disable',
                render: (text, record) => (
                    record.whether_to_disable?<Checkbox defaultChecked></Checkbox>:<Checkbox></Checkbox>
                )
            },
            {
                title: '机构名称',
                dataIndex: 'agency_name',
                key: 'agency_name'
            },
            {
                title: '机构代码',
                dataIndex: 'agency_code',
                key: 'agency_code'
            },
            {
                title: '数据库类型',
                dataIndex: 'db_type',
                key: 'db_type'
            },
            {
                title: '访问方式',
                dataIndex: 'interview_method',
                key: 'interview_method'
            },
            {
                title: 'JNDI名称',
                dataIndex: 'jndi_name',
                key: 'jndi_name'
            },
            {
                title: '连接串',
                dataIndex: 'connection_string',
                key: 'connection_string'
            }
        ];
        return (
            <div style={{width:"98%", position:"relative", marginLeft:"auto", marginRight:"auto"}}>
                <Row>
                    <Form className="ant-advanced-search-form">
                        <Row gutter={24}>
                            <Col span={6} key={1}>
                                <Form.Item label="对象代码:">
                                    <Input placeholder="对象代码"/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={2}>
                                <Form.Item label="对象名称:">
                                    <Input placeholder="对象名称"/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={3}>
                                <Form.Item label="是否禁用:">
                                    {/* <Input placeholder="是否禁用"/> */}
                                    <Checkbox></Checkbox>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={4}>
                                <Form.Item label="机构名称:">
                                    <Input placeholder="机构名称"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6} key={5}>
                                <Form.Item label="机构代码：">
                                    <Input placeholder="机构代码"/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={6}>
                                <Form.Item label="连接串：">
                                    <Input placeholder="连接串"/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={7}>
                                <Form.Item label="用户名:">
                                    <Input placeholder="用户名"/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={8}>
                                <Form.Item label="状态:">
                                    <Input placeholder="状态"/>
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
                        <Table dataSource={this.props.databaseManager.list} columns={columns} />
                    </Form>
                </Row>
            </div>
        )
    }
}

export default connect((state) => ({databaseManager: state.databaseManager}), {findList})(DatabaseManager)