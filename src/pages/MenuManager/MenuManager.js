import React, {Component} from 'react'
import {Form, Input, Checkbox, Button, Row, Col, Table} from 'antd'

import {findList} from '../../redux/actions/menu_manager'
import {connect} from 'react-redux';

import './MenuManager.css'

class MenuManager extends Component{
    componentDidMount = () => {
        this.props.findList()
    }
    render(){
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: '编码',
                dataIndex: 'coding',
                key: 'coding'
            },
            {
                title: '序号',
                dataIndex: 'num',
                key: 'num'
            },
            {
                title: '父节点',
                dataIndex: 'parent_node',
                key: 'parent_node'
            },
            {
                title: '过滤条件',
                dataIndex: 'filter_condition',
                key: 'filter_condition'
            },
            {
                title: '自定义功能',
                dataIndex: 'custom_func',
                key: 'custom_func'
            },
            {
                title: '是否隐藏',
                // dataIndex: 'whether_to_hide',
                key: 'whether_to_hide',
                render: (text, record) => (
                    record.whether_to_hide?<Checkbox defaultChecked></Checkbox>:<Checkbox></Checkbox>
                )
            }
        ] 
        return (
            <div style={{width:"98%", position:"relative", marginLeft:"auto", marginRight:"auto"}}>
                <Row>
                    <Form className="ant-advanced-search-form">
                        <Row gutter={24}>
                            <Col span={6} key={1}>
                                <Form.Item label="名称:">
                                    <Input placeholder="名称"/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={2}>
                                <Form.Item label="编码:">
                                    <Input placeholder="编码"/>
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
                        <Button type="default" size="default" className="btn">基本功能设置</Button>
                        <Button type="default" size="default" className="btn">导出菜单脚本</Button>
                        <Table dataSource={this.props.menuManager.list} columns={columns} />
                    </Form>
                </Row>
            </div>
        )
    }
}

export default connect((state) => ({menuManager: state.menuManager}),{findList})(MenuManager)