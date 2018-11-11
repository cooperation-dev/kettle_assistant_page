import React, {Component} from 'react'
import {Form, Input, Checkbox, Button, Row, Col, Table, Modal} from 'antd'

import {findDatabases, 
        addDatabaseShow, addDatabaseCancel, addDatabaseSure, 
        updateDatabaseShow, updateDatabaseCancel, updateDatabaseSure} from '../../redux/actions/database_manager'
import {connect} from 'react-redux';

import './DatabaseManager.css'

class DatabaseManager extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectRows:[]
        }
    }
    componentDidMount = () => {
        this.props.findDatabases()
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
                dataIndex: 'whether_to_disable',
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
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({
                  selectRows: selectedRows
              })
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          };
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
                        <Button type="default" size="default" className="btn" onClick={() => this.props.addDatabaseShow()}>新增</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.updateDatabaseShow(this.state.selectRows)}>修改</Button>
                        <Button type="default" size="default" className="btn" onClick={showDeleteConfirm}>删除</Button>
                        <Button type="default" size="default" className="btn">查看</Button>
                        <Table rowSelection={rowSelection} dataSource={this.props.databaseManager.list} columns={columns} scroll={{x: 1300}}/>
                    </Form>
                </Row>
                <AddModal visible={this.props.databaseManager.add_visible} onOk={() => this.props.addDatabaseSure()} onCancel={() => this.props.addDatabaseCancel()}></AddModal>
                <UpdateModal visible={this.props.databaseManager.update_visible} onOk={() => this.props.updateDatabaseSure()} onCancel={() => this.props.updateDatabaseCancel()} value={this.props.databaseManager.database}></UpdateModal>
            </div>
        )
    }
}

class AddModal extends Component{
    render(){
        return (
            <Modal title="新增数据库"
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="对象名称">
                    <Input placeholder="对象名称"/>
                </Form.Item>
                <Form.Item label="对象排序">
                    <Input placeholder="对象排序"/>
                </Form.Item>
                <Form.Item label="是否警用">
                    <Input placeholder="角色名"/>
                </Form.Item>
                <Form.Item label="机构名称">
                    <Input placeholder="机构名称"/>
                </Form.Item>
                <Form.Item label="机构代码">
                    <Input placeholder="机构代码"/>
                </Form.Item>
                <Form.Item label="数据库类型">
                    <Input placeholder="数据库类型"/>
                </Form.Item>
                <Form.Item label="访问方式">
                    <Input placeholder="访问方式"/>
                </Form.Item>
                <Form.Item label="JNDI名称">
                    <Input placeholder="JNDI名称"/>
                </Form.Item>
                <Form.Item label="连接串">
                    <Input placeholder="连接串"/>
                </Form.Item>
            </Modal>
        )
    }
}

class UpdateModal extends Component{
    render(){
        return (
            <Modal title="修改数据库"
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="对象名称">
                    <Input placeholder="对象名称" value={this.props.value.obj_name}/>
                </Form.Item>
                <Form.Item label="对象排序">
                    <Input placeholder="对象排序" value={this.props.value.obj_sort}/>
                </Form.Item>
                <Form.Item label="机构名称">
                    <Input placeholder="机构名称" value={this.props.value.agency_name}/>
                </Form.Item>
                <Form.Item label="机构代码">
                    <Input placeholder="机构代码" value={this.props.value.agency_code}/>
                </Form.Item>
                <Form.Item label="数据库类型">
                    <Input placeholder="数据库类型" value={this.props.value.db_type}/>
                </Form.Item>
                <Form.Item label="访问方式">
                    <Input placeholder="访问方式" value={this.props.value.interview_method}/>
                </Form.Item>
                <Form.Item label="JNDI名称">
                    <Input placeholder="JNDI名称" value={this.props.value.jndi_name}/>
                </Form.Item>
                <Form.Item label="连接串">
                    <Input placeholder="连接串" value={this.props.value.connection_string}/>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm() {
    Modal.confirm({
      title: '删除数据库',
      content: '确定要删除吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

export default connect((state) => ({databaseManager: state.databaseManager}), {
    findDatabases, 
    addDatabaseShow, addDatabaseCancel, addDatabaseSure, 
    updateDatabaseShow, updateDatabaseCancel, updateDatabaseSure
})(DatabaseManager)