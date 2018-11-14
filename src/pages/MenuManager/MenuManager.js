import React, {Component} from 'react'
import {Form, Input, Checkbox, Button, Row, Col, Table, Modal, message} from 'antd'

import {findMenus, 
        addMenuShow, addMenuCancel, addMenuSure, 
        updateMenuShow, updateMenuCancel, updateMenuSure} from '../../redux/actions/menu_manager'
import {connect} from 'react-redux';

import './MenuManager.css'

class MenuManager extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectRows:[]
        }
    }
    componentDidMount = () => {
        this.props.findMenus()
    }
    render(){
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '名称',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '类型',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: '编码',
                dataIndex: 'key',
                key: 'key'
            },
            {
                title: '序号',
                dataIndex: 'level',
                key: 'level'
            },
            {
                title: '父节点',
                dataIndex: 'parent_key',
                key: 'parent_key'
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
                        <Button type="default" size="default" className="btn" onClick={() => this.props.addMenuShow()}>新增</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.updateMenuShow(this.state.selectRows)}>修改</Button>
                        <Button type="default" size="default" className="btn" onClick={() => showDeleteConfirm(this.state.selectRows)}>删除</Button>
                        <Button type="default" size="default" className="btn">基本功能设置</Button>
                        <Button type="default" size="default" className="btn">导出菜单脚本</Button>
                        <Table rowSelection={rowSelection} dataSource={this.props.menuManager.list} columns={columns} />
                    </Form>
                </Row>
                <AddModal 
                visible={this.props.menuManager.addVisible} 
                onOk={() => this.props.addMenuSure()} 
                onCancel={() => this.props.addMenuCancel()}></AddModal>
                <UpdateModal 
                visible={this.props.menuManager.updateVisible} 
                onOk={() => this.props.updateMenuSure()} 
                onCancel={() => this.props.updateMenuCancel()} 
                key={this.props.menuManager.key} 
                title={this.props.menuManager.title} 
                type={this.props.menuManager.type} 
                level={this.props.menuManager.level} 
                parentKey={this.props.menuManager.parentKey} 
                filterCondition={this.props.menuManager.filterCondition} 
                customFunc={this.props.menuManager.customFunc} ></UpdateModal>
            </div>
        )
    }
}

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};

class AddModal extends Component{
    constructor(){
        super()

        this.state = {
            title: '',
            type: '',
            key: '',
            level: '',
            parentKey: '',
            filterCondition: '',
            customFunc: '',
            whetherToHide: false,
        }
    }
    changeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }
    changeType = (event) => {
        this.setState({
            type: event.target.value
        })
    }
    changeKey = (event) => {
        this.setState({
            key: event.target.value
        })
    }
    changeLevel = (event) => {
        this.setState({
            level: event.target.value
        })
    }
    changeParentKey = (event) => {
        this.setState({
            parentKey: event.target.value
        })
    }
    changeFilterCondition = (event) => {
        this.setState({
            filterCondition: event.target.value
        })
    }
    changeCustomFunc = (event) => {
        this.setState({
            customFunc: event.target.value
        })
    }
    changeWhetherToHide = (event) => {
        this.setState({
            whetherToHide: event.target.checked
        })
    }
    render(){
        let menu = {
            title: this.state.title,
            type: this.state.type,
            key: this.state.key,
            level: this.state.level,
            parentKey: this.state.parentKey,
            filterCondition: this.state.filterCondition,
            customFunc: this.state.customFunc,
            whetherToHide: this.state.whetherToHide
        }
        return (
            <Modal title="新增菜单"
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="名称">
                    <Input placeholder="名称" onChange={(event) => this.changeTitle(event)} value={this.state.title}/>
                </Form.Item>
                <Form.Item label="类型">
                    <Input placeholder="类型" onChange={(event) => this.changeType(event)} value={this.state.type}/>
                </Form.Item>
                <Form.Item label="编码">
                    <Input placeholder="编码" onChange={(event) => this.changeKey(event)} value={this.state.key}/>
                </Form.Item>
                <Form.Item label="序号">
                    <Input placeholder="序号" onChange={(event) => this.changeLevel(event)} value={this.state.level}/>
                </Form.Item>
                <Form.Item label="父节点">
                    <Input placeholder="父节点" onChange={(event) => this.changeParentKey(event)} value={this.state.parentKey}/>
                </Form.Item>
                <Form.Item label="过滤条件">
                    <Input placeholder="过滤条件" onChange={(event) => this.changeFilterCondition(event)} value={this.state.filterCondition}/>
                </Form.Item>
                <Form.Item label="自定义功能">
                    <Input placeholder="自定义功能" onChange={(event) => this.changeCustomFunc(event)} value={this.state.customFunc}/>
                </Form.Item>
                <Form.Item {...formItemLayout} label="是否隐藏">
                    <Checkbox
                        onChange={(event) => this.changeWhetherToHide(event)}
                        checked={this.state.whetherToHide}
                    ></Checkbox>
                </Form.Item>
            </Modal>
        )
    }
}

class UpdateModal extends Component{
    render(){
        let menu = {
            key: '',
            title: '',
            type: '',
            level: '',
            parentKey: '',
            filterCondition: '',
            customFunc: ''
        }
        return (
            <Modal title="修改菜单"
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="名称">
                    <Input placeholder="名称" value={this.props.title}/>
                </Form.Item>
                <Form.Item label="类型">
                    <Input placeholder="类型" value={this.props.type}/>
                </Form.Item>
                <Form.Item label="编码">
                    <Input placeholder="编码" value={this.props.key}/>
                </Form.Item>
                <Form.Item label="序号">
                    <Input placeholder="序号" value={this.props.level}/>
                </Form.Item>
                <Form.Item label="父节点">
                    <Input placeholder="父节点" value={this.props.parentKey}/>
                </Form.Item>
                <Form.Item label="过滤条件">
                    <Input placeholder="过滤条件" value={this.props.filterCondition}/>
                </Form.Item>
                <Form.Item label="自定义功能">
                    <Input placeholder="自定义功能" value={this.props.customFunc}/>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm(selectRows) {
    if(selectRows.length == 0){
        message.error('请选择行!')
    }else {
        Modal.confirm({
            title: '删除菜单',
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
  }

export default connect((state) => ({menuManager: state.menuManager}),{
    findMenus, 
    addMenuShow, addMenuCancel, addMenuSure, 
    updateMenuShow, updateMenuCancel, updateMenuSure
})(MenuManager)