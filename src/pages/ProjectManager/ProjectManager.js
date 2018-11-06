import React, {Component} from 'react'
import {Form, Input, Checkbox, Button, Row, Col, Table} from 'antd'

import {findProjects} from '../../redux/actions/project_manager'
import {connect} from 'react-redux';

import './ProjectManager.css'

class ProjectManager extends Component{
    componentDidMount = () => {
        this.props.findProjects()
    }
    render(){
        const columns = [
            {
                title: '对象代码',
                dataIndex: 'obj_code',
                key: 'obj_code'
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
                dataIndex: 'whether_to_disable',
                key: 'whether_to_disable'
            },
            {
                title: '项目URL',
                dataIndex: 'project_url',
                key: 'project_url'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
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
                                    <Input placeholder="是否禁用"/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={3}>
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
                        <Table dataSource={this.props.projectManager.list} columns={columns} />
                    </Form>
                </Row>
            </div>
        )
    }
}

export default connect((state) => ({projectManager: state.projectManager}), {findProjects})(ProjectManager)