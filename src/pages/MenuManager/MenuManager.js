import React, {Component} from 'react'
import {Form, Input, Checkbox, Button, Row, Col, Table, Modal, message, Select} from 'antd'

import {findMenus, findParents, findIcons, findTypes, 
        addMenuShow, addMenuCancel, addMenuSure, 
        deleteMenusByIds, 
        updateMenuShow, updateMenuCancel, updateMenuSure, } from '../../redux/actions/menu_manager'
import {connect} from 'react-redux';

import axios from 'axios'

import './MenuManager.css'

class MenuManager extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectRows:[],
            name: '',
            code: '',
        }
    }
    componentDidMount = () => {
        this.props.findMenus();
        this.props.findParents();
        this.props.findIcons();
        this.props.findTypes();
    }
    search = () => {
        let menu = {
            name: this.state.name,
            code: this.state.code,
        }
        this.props.findMenus(menu)
    }
    reset = () => {
        this.setState({
            selectRows:[],
            name: '',
            code: '',
        })
        let menu = {
            name: '',
            code: '',
        }
        this.props.findMenus(menu)
    }
    change = (event, attribute) => {
        let newState = {};
        newState[attribute] = event.target.value;
        this.setState(newState);
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
                dataIndex: 'privilegeType',
                key: 'privilegeType',
                render:privilegeType=>(
                    <span>{privilegeType.name}</span>
                )
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
                key: 'parentId',
                // render:text => (
                //     console.log(text)
                // )
            },
            {
                title: '图标',
                dataIndex: 'privilegeStyle',
                key: 'privilegeStyle',
                render: privilegeStyle => (
                    <span>{privilegeStyle.icon}</span>
                )
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
                                    <Input placeholder="名称" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={2}>
                                <Form.Item label="编码:">
                                    <Input placeholder="编码" onChange={(event) => this.change(event, 'code')} value={this.state.code}/>
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
                        <Button type="default" size="default" className="btn" onClick={() => showDeleteConfirm(this.props.deleteMenusByIds, this.state.selectRows)}>删除</Button>
                        <Button type="default" size="default" className="btn">基本功能设置</Button>
                        <Button type="default" size="default" className="btn">导出菜单脚本</Button>
                        <Table pagination={false} rowKey={(record) => record.id} rowSelection={rowSelection} dataSource={this.props.menuManager.list} columns={columns} scroll={{x: 1500}}/>
                    </Form>
                </Row>
                <AddModal 
                visible={this.props.menuManager.addVisible} 
                onOk={(menu) => this.props.addMenuSure(menu)} 
                onCancel={() => this.props.addMenuCancel()} 
                parents={this.props.menuManager.parents} 
                icons={this.props.menuManager.icons} 
                types={this.props.menuManager.types}></AddModal>
                <UpdateModal 
                visible={this.props.menuManager.updateVisible} 
                onOk={(menu) => this.props.updateMenuSure(menu)} 
                onCancel={() => this.props.updateMenuCancel()} 
                parents={this.props.menuManager.parents}
                icons={this.props.menuManager.icons} 
                types={this.props.menuManager.types}
                id={this.props.menuManager.updateId}></UpdateModal>
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
            parentId: '',
            icon: '',
            level: '',
            direction: '',
            code: '',
            component: '',
            filterCondition: '',
            customFunc: '',
        }
    }
    /* changeValid = (event) => {
        this.setState({
            valid: event.target.checked?'Y':'N',
        })
    } */
    change = (event, attribute) => {
        const newState = {};
        newState[attribute] = event.target.value;
        this.setState(newState);
    }
    changeValue = (value, attribute) => {
        const newState = {};
        newState[attribute] = value;
        this.setState(newState)
    }
    render(){
        let menu = {
            name: this.state.name,
            privilegeType: {
                id: this.state.type
            },
            parentId: this.state.parentId,
            privilegeStyle: {
                id: this.state.icon
            },
            level: this.state.level,
            direction: this.state.direction,
            code: this.state.code,
            component: this.state.component,
            filterCondition: this.state.filterCondition,
            customFunc: this.state.customFunc,
        }
        return (
            <Modal title="新增菜单"
                visible={this.props.visible}
                onOk={() => this.props.onOk(menu)}
                onCancel={() => this.props.onCancel()}
                okText='确定'
                cancelText='取消'
                destroyOnClose={true}
                >
                <Form.Item label="名称">
                    <Input placeholder="名称" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                </Form.Item>
                <Form>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="类型">
                                <Select style={{width: '98%'}} onChange={(value) => {this.changeValue(value, 'type')}} value={this.state.type}>
                                    {this.props.types.map(type => {
                                        return (
                                            <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="父节点">
                                <Select style={{width: '100%'}} onChange={(value) => {this.changeValue(value, 'parentId')}} value={this.state.parentId}>
                                    {this.props.parents.map(parent => {
                                        return (
                                            <Select.Option key={parent.id} value={parent.id}>{parent.name}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="图标">
                                <Select style={{width: '98%'}} onChange={(value) => {this.changeValue(value, 'icon')}} value={this.state.icon}>
                                    {this.props.icons.map(icon => {
                                        return (
                                            <Select.Option key={icon.id} value={icon.id}>{icon.icon}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="序号">
                                <Input placeholder="序号" onChange={(event) => this.change(event, 'level')} value={this.state.level}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Form.Item label="URL">
                    <Input placeholder="URL" onChange={(event) => this.change(event, 'direction')} value={this.state.direction}/>
                </Form.Item>
                <Form.Item label="编码">
                    <Input placeholder="编码" onChange={(event) => this.change(event, 'code')} value={this.state.code}/>
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
                {/* <Form.Item {...formItemLayout} label="是否隐藏">
                    <Checkbox
                        onChange={(event) => this.changeValid(event)}
                        checked={this.state.valid=='Y'}
                    ></Checkbox>
                </Form.Item> */}
            </Modal>
        )
    }
}

class UpdateModal extends Component{
    constructor(){
        super();

        this.state = {
            id: '',
            name: '',
            type: '',
            parentId: '',
            icon: '',
            level: '',
            direction: '',
            code: '',
            component: '',
            filterCondition: '',
            customFunc: '',
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if(this.props.id == nextProps.id){
            return 
        }
        let id = nextProps.id;
        if(id != undefined && id != ''){
            this.findMenuById(id);
        }
    }
    findMenuById = (id) => {
        axios.get('/api/privilegeController/findPrivilegeById/'+id)
        .then((res) => {
            let data = res.data.data;
            let icon = data.privilegeStyle != null?data.privilegeStyle.id:'';
            let type = data.privilegeType != null?data.privilegeType.id:'';
            this.setState({
                id: data.id,
                name: data.name,
                type: type,
                parentId: data.parentId,
                icon: icon,
                level: data.level,
                direction: data.direction,
                code: data.code,
                component: data.component,
                filterCondition: data.filterCondition,
                customFunc: data.customFunc,
            })
        })
    }
    change = (event, attribute) => {
        let newState = {};
        newState[attribute] = event.target.value;
        this.setState(newState);
    }
    ok = () => {
        let menu = {
            id: this.state.id,
            name: this.state.name,
            privilegeType: {
                id: this.state.type
            },
            parentId: this.state.parentId,
            privilegeStyle: {
                id: this.state.icon
            },
            level: this.state.level,
            direction: this.state.direction,
            code: this.state.code,
            component: this.state.component,
            filterCondition: this.state.filterCondition,
            customFunc: this.state.customFunc,
        }
        this.setState({
            name: '',
            type: '',
            parentId: '',
            icon: '',
            level: '',
            direction: '',
            code: '',
            component: '',
            filterCondition: '',
            customFunc: '',
        })
        this.props.onOk(menu);
    }
    cancel = () => {
        this.setState({
            name: '',
            type: '',
            parentId: '',
            icon: '',
            level: '',
            direction: '',
            code: '',
            component: '',
            filterCondition: '',
            customFunc: '',
        })
        this.props.onCancel();
    }
    render(){
        return (
            <Modal title="修改菜单"
                visible={this.props.visible}
                onOk={this.ok}
                onCancel={this.cancel}
                okText='确定'
                cancelText='取消'
                destroyOnClose={true}
                >
                <Form.Item label="名称">
                    <Input placeholder="名称" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                </Form.Item>
                <Form>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="类型">
                                <Select style={{width: '98%'}} onChange={(value) => {this.changeValue(value, 'type')}} value={this.state.type}>
                                    {this.props.types.map(type => {
                                        return (
                                            <Select.Option key={type.id} value={type.id}>{type.name}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="父节点">
                                <Select style={{width: '100%'}} onChange={(value) => {this.changeValue(value, 'parentId')}} value={this.state.parentId}>
                                    {this.props.parents.map(parent => {
                                        return (
                                            <Select.Option key={parent.id} value={parent.id}>{parent.name}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="图标">
                                <Select style={{width: '98%'}} onChange={(value) => {this.changeValue(value, 'icon')}} value={this.state.icon}>
                                    {this.props.icons.map(icon => {
                                        return (
                                            <Select.Option key={icon.id} value={icon.id}>{icon.icon}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="序号">
                                <Input placeholder="序号" onChange={(event) => this.change(event, 'level')} value={this.state.level}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Form.Item label="URL">
                    <Input placeholder="URL" onChange={(event) => this.change(event, 'direction')} value={this.state.direction}/>
                </Form.Item>
                <Form.Item label="编码">
                    <Input placeholder="编码" onChange={(event) => this.change(event, 'code')} value={this.state.code}/>
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
            </Modal>
        )
    }
}

function showDeleteConfirm(deleteMenusByIds, selectRows) {
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
                deleteMenusByIds(selectRows);
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
  }

export default connect((state) => ({menuManager: state.menuManager}),{
    findMenus, findParents, findIcons, findTypes, 
    addMenuShow, addMenuCancel, addMenuSure, 
    deleteMenusByIds, 
    updateMenuShow, updateMenuCancel, updateMenuSure,
})(MenuManager)