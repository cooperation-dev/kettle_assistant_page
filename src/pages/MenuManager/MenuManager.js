import React, {Component} from 'react'
import {Form, Input, Checkbox, Button, Row, Col, Table, Modal, message} from 'antd'

import {findMenus, 
        addMenuShow, addMenuCancel, addMenuSure, 
        deleteMenu, 
        updateMenuShow, updateMenuCancel, updateMenuSure, 
        changeModalName, changeModalType, changeModalCode, changeModalLevel, changeModalParentId, 
        changeModalIcon, changeModalDirection, changeModalComponent, changeModalFilterCondition, changeModalCustomFunc, } from '../../redux/actions/menu_manager'
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
                dataIndex: 'code',
                key: 'code'
            },
            {
                title: '序号',
                dataIndex: 'level',
                key: 'level'
            },
            {
                title: '父节点',
                dataIndex: 'parentId',
                key: 'parentId'
            },
            {
                title: '图标',
                dataIndex: 'icon',
                key: 'icon'
            },
            {
                title: 'URL',
                dataIndex: 'direction',
                key: 'direction'
            },
            {
                title: '组件',
                dataIndex: 'component',
                key: 'component'
            },
            {
                title: '过滤条件',
                dataIndex: 'filterCondition',
                key: 'filterCondition'
            },
            {
                title: '自定义功能',
                dataIndex: 'customFunc',
                key: 'customFunc'
            },
            {
                title: '是否隐藏',
                dataIndex: 'valid',
                key: 'valid',
                render: (text, record) => (
                    <Checkbox checked={record.valid=='Y'}></Checkbox>
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
                        <Button type="default" size="default" className="btn" onClick={() => showDeleteConfirm(this.props.deleteMenu, this.state.selectRows)}>删除</Button>
                        <Button type="default" size="default" className="btn">基本功能设置</Button>
                        <Button type="default" size="default" className="btn">导出菜单脚本</Button>
                        <Table rowSelection={rowSelection} dataSource={this.props.menuManager.list} columns={columns} scroll={{x: 1500}}/>
                    </Form>
                </Row>
                <AddModal 
                visible={this.props.menuManager.addVisible} 
                onOk={(menu) => this.props.addMenuSure(menu)} 
                onCancel={() => this.props.addMenuCancel()}></AddModal>
                <UpdateModal 
                visible={this.props.menuManager.updateVisible} 
                onOk={(menu) => this.props.updateMenuSure(menu)} 
                onCancel={() => this.props.updateMenuCancel()} 
                id={this.props.menuManager.id} 
                name={this.props.menuManager.name} 
                type={this.props.menuManager.type} 
                code={this.props.menuManager.code} 
                level={this.props.menuManager.level} 
                parentId={this.props.menuManager.parentId} 
                icon={this.props.menuManager.icon} 
                direction={this.props.menuManager.direction}
                component={this.props.menuManager.component}
                filterCondition={this.props.menuManager.filterCondition} 
                customFunc={this.props.menuManager.customFunc} 
                changeName={(event) => this.props.changeModalName(event)} 
                changeType={(event) => this.props.changeModalType(event)} 
                changeCode={(event) => this.props.changeModalCode(event)} 
                changeLevel={(event) => this.props.changeModalLevel(event)}
                changeParentId={(event) => this.props.changeModalParentId(event)} 
                changeDirection={(event) => this.props.changeModalIcon(event)} 
                changeDirection={(event) => this.props.changeModalDirection(event)} 
                changeComponent={(event) => this.props.changeModalComponent(event)} 
                changeFilterCondition={(event) => this.props.changeModalFilterCondition(event)} 
                changeCustomFunc={(event) => this.props.changeModalCustomFunc(event)} ></UpdateModal>
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
            name: '',
            type: '',
            code: '',
            level: '',
            parentId: '',
            icon: '',
            direction: '',
            component: '',
            filterCondition: '',
            customFunc: '',
            valid: 'N',
        }
    }
    changeValid = (event) => {
        this.setState({
            valid: event.target.checked?'Y':'N',
        })
    }
    change = (event, obj) => {
        const newState = {};
        newState[obj] = event.target.value;
        this.setState(newState);
    }
    render(){
        let menu = {
            name: this.state.name,
            type: this.state.type,
            code: this.state.code,
            level: this.state.level,
            parentId: this.state.parentId,
            icon: this.state.icon,
            direction: this.state.direction,
            component: this.state.component,
            filterCondition: this.state.filterCondition,
            customFunc: this.state.customFunc,
            valid: this.state.valid,
        }
        return (
            <Modal title="新增菜单"
                visible={this.props.visible}
                onOk={() => this.props.onOk(menu)}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="名称">
                    <Input placeholder="名称" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                </Form.Item>
                <Form.Item label="类型">
                    <Input placeholder="类型" onChange={(event) => this.change(event, 'type')} value={this.state.type}/>
                </Form.Item>
                <Form.Item label="编码">
                    <Input placeholder="编码" onChange={(event) => this.change(event, 'code')} value={this.state.code}/>
                </Form.Item>
                <Form.Item label="序号">
                    <Input placeholder="序号" onChange={(event) => this.change(event, 'level')} value={this.state.level}/>
                </Form.Item>
                <Form.Item label="父节点">
                    <Input placeholder="父节点" onChange={(event) => this.change(event, 'parentId')} value={this.state.parentId}/>
                </Form.Item>
                <Form.Item label="图标">
                    <Input placeholder="图标" onChange={(event) => this.change(event, 'icon')} value={this.state.icon}/>
                </Form.Item>
                <Form.Item label="URL">
                    <Input placeholder="URL" onChange={(event) => this.change(event, 'direction')} value={this.state.direction}/>
                </Form.Item>
                <Form.Item label="组件">
                    <Input placeholder="组件" onChange={(event) => this.change(event, 'component')} value={this.state.component}/>
                </Form.Item>
                <Form.Item label="过滤条件">
                    <Input placeholder="过滤条件" onChange={(event) => this.change(event, 'filterCondition')} value={this.state.filterCondition}/>
                </Form.Item>
                <Form.Item label="自定义功能">
                    <Input placeholder="自定义功能" onChange={(event) => this.change(event, 'customFunc')} value={this.state.customFunc}/>
                </Form.Item>
                <Form.Item {...formItemLayout} label="是否隐藏">
                    <Checkbox
                        onChange={(event) => this.changeValid(event)}
                        checked={this.state.valid=='Y'}
                    ></Checkbox>
                </Form.Item>
            </Modal>
        )
    }
}

class UpdateModal extends Component{
    render(){
        let menu = {
            id: this.props.id,
            name: this.props.name,
            type: this.props.type,
            code: this.props.code,
            level: this.props.level,
            parentId: this.props.parentId,
            icon: this.props.icon,
            direction: this.props.direction,
            component: this.props.component,
            filterCondition: this.props.filterCondition,
            customFunc: this.props.customFunc,
        }
        return (
            <Modal title="修改菜单"
                visible={this.props.visible}
                onOk={() => this.props.onOk(menu)}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="名称">
                    <Input placeholder="名称" onChange={(event) => this.props.changeName(event)} value={this.props.name}/>
                </Form.Item>
                <Form.Item label="类型">
                    <Input placeholder="类型" onChange={(event) => this.props.changeType(event)} value={this.props.type}/>
                </Form.Item>
                <Form.Item label="编码">
                    <Input placeholder="编码" onChange={(event) => this.props.changeCode(event)} value={this.props.code}/>
                </Form.Item>
                <Form.Item label="序号">
                    <Input placeholder="序号" onChange={(event) => this.props.changeLevel(event)} value={this.props.level}/>
                </Form.Item>
                <Form.Item label="父节点">
                    <Input placeholder="父节点" onChange={(event) => this.props.changeParentId(event)} value={this.props.parentKey}/>
                </Form.Item>
                <Form.Item label="图标">
                    <Input placeholder="图标" onChange={(event) => this.props.changeIcon(event)} value={this.props.icon}/>
                </Form.Item>
                <Form.Item label="URL">
                    <Input placeholder="URL" onChange={(event) => this.props.changeDirection(event)} value={this.props.direction}/>
                </Form.Item>
                <Form.Item label="组件">
                    <Input placeholder="组件" onChange={(event) => this.props.changeComponent(event)} value={this.props.component}/>
                </Form.Item>
                <Form.Item label="过滤条件">
                    <Input placeholder="过滤条件" onChange={(event) => this.props.changeFilterCondition(event)} value={this.props.filterCondition}/>
                </Form.Item>
                <Form.Item label="自定义功能">
                    <Input placeholder="自定义功能" onChange={(event) => this.props.changeCustomFunc(event)} value={this.props.customFunc}/>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm(deleteMenu, selectRows) {
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
                deleteMenu(selectRows);
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
    deleteMenu, 
    updateMenuShow, updateMenuCancel, updateMenuSure, 
    changeModalName, changeModalType, changeModalCode, changeModalLevel, changeModalParentId, 
    changeModalIcon, changeModalDirection, changeModalComponent, changeModalFilterCondition, changeModalCustomFunc,  
})(MenuManager)