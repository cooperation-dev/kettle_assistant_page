import React, {Component} from 'react'
import {Form, Input, Button, Row, Col, Table, Modal, message, Select, Tag} from 'antd'

import {findUsers, findRoles,
        addUserShow, addUserCancel, addUserSure, 
        deleteUsersByIds, 
        updateUserShow, updateUserCancel, updateUserSure,} from '../../redux/actions/user_manager'
import {connect} from 'react-redux';

import axios from 'axios';

import './UserManager.css'

class UserManager extends Component{
    constructor(props){
        super(props);

        this.state = {
            selectRows:[],
            name: '',
            description: '',
            role: '',
        }
    }
    componentDidMount = () => {
        let user = {
            name: this.state.name,
            description: this.state.description,
            role: this.state.role,
        }
        this.props.findUsers(user)
        let role = {
            name: '',
        }
        this.props.findRoles(role);
    }
    search = () => {
        let user = {
            name: this.state.name,
            description: this.state.description,
            role: this.state.role,
        }
        this.props.findUsers(user)
    }
    reset = () => {
        this.setState({
            selectRows:[],
            name: '',
            description: '',
            role: '',
        })
        let user = {
            name: '',
            description: '',
            role: '',
        }
        this.props.findUsers(user)
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
                title: '昵称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '角色',
                dataIndex: 'roles',
                key: 'roles',
                render:roles => (
                    <span>
                        {roles.map(role => <Tag key={role.id}>{role.name}</Tag>)}
                    </span>
                )
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'desctiption',
            },
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
                                <Form.Item label="昵称:">
                                    <Input placeholder="昵称" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={2}>
                                <Form.Item label="角色:">
                                    <Input placeholder="角色" onChange={(event) => this.change(event, 'role')} value={this.state.role}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={3}>
                                <Form.Item label="描述:">
                                    <Input placeholder="描述" onChange={(event) => this.change(event, 'description')} value={this.state.description}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{textAlign:"center"}}>
                                <Button type="primary" htmlType="submit" style={{marginRight:8}} onClick={this.search}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row style={{marginTop:"15px"}}>
                    <Form className="ant-advanced-search-form" style={{marginBottom: "15px"}}>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.addUserShow()}>新增</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.updateUserShow(this.state.selectRows)}>修改</Button>
                        <Button type="default" size="default" className="btn" onClick={() => showDeleteConfirm(this.props.deleteUsersByIds, this.state.selectRows)}>删除</Button>
                        <Button type="default" size="default" className="btn">导入</Button>
                        <Table rowKey={(record) => record.id} rowSelection={rowSelection} dataSource={this.props.userManager.list} columns={columns} />
                    </Form>
                </Row>
                <AddModal 
                visible={this.props.userManager.addVisible} 
                onOk={(user) => this.props.addUserSure(user)} 
                onCancel={() => this.props.addUserCancel()} 
                roles={this.props.userManager.roles}></AddModal>
                <UpdateModal 
                visible={this.props.userManager.updateVisible} 
                onOk={(user) => this.props.updateUserSure(user)} 
                onCancel={() => this.props.updateUserCancel()} 
                roles={this.props.userManager.roles} 
                id={this.props.userManager.id}></UpdateModal>
            </div>
        )
    }
}

class AddModal extends Component{
    constructor(){
        super()
        this.state = {
            name: '',
            code: '',
            description: '',
            password: '',
            roles: [],
        }
    }
    change = (event, attribute) => {
        let newState = {};
        newState[attribute] = event.target.value;
        this.setState(newState);
    }
    rolesChange = (value) => {
        this.setState({roles: value});
    }
    render(){
        let user = {
            name: this.state.name,
            code: this.state.code,
            description: this.state.description,
            roleList: this.state.roles,
            password: this.state.password,
        }
        return (
            <Modal title="新增用户"
                visible={this.props.visible}
                onOk={() => this.props.onOk(user)}
                onCancel={() => this.props.onCancel()}
                okText='确定'
                cancelText='取消'
                destroyOnClose={true}
                >
                <Form.Item label="昵称">
                    <Input placeholder="昵称" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                </Form.Item>
                <Form.Item label="登陆账号">
                    <Input placeholder="登陆账号" onChange={(event) => this.change(event, 'code')} value={this.state.code}/>
                </Form.Item>
                <Form.Item label="角色">
                    <Select mode="multiple" style={{width: '100%' }} placeholder='角色' onChange={(value) => {this.rolesChange(value)}}>
                        {this.props.roles.map(role => {
                            return (
                                <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label='密码'>
                    <Input placeholder='密码' type='password' onChange={(event) => this.change(event, 'password')} value={this.state.password}/>
                </Form.Item>
                <Form.Item label='描述'>
                    <Input placeholder='描述' onChange={(event) => this.change(event, 'description')} value={this.state.description}/>
                </Form.Item>
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
            roles: [],
            description: '',
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if(this.props.id == nextProps.id){
            return
        }
        let id = nextProps.id
        if(id!=undefined && id!=""){
            this.findUserById(id)
        }
    }
    findUserById = (id) => {
        axios.get('/api/userController/findUserById/'+id)
            .then(r => {
                let data = r.data.data
                let rolesStr = [];
                data.roles.map(role => {
                    rolesStr.push(role.id);
                })
                this.setState({
                    id: data.id,
                    name: data.name,
                    roles: rolesStr,
                    description: data.description,
                })
            })
    }
    change = (event, attribute) => {
        let newState = {};
        newState[attribute] = event.target.value;
        this.setState(newState);
    }
    rolesChange = (value) => {
        this.setState({roles: value});
    }
    ok = () => {
        let user = {
            id: this.state.id,
            name: this.state.name,
            roleList: this.state.roles,
            description: this.state.description,
        }
        this.setState({
            name: '',
            roles: [],
            description: '',
        })
        this.props.onOk(user);
    }
    cancel = () => {
        this.setState({
            name: '',
            roles: '',
            description: '',
        })
        this.props.onCancel();
    }
    render(){
        return (
            <Modal title="修改用户"
                visible={this.props.visible}
                onOk={this.ok}
                onCancel={this.cancel}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true} 
                >
                <Form.Item label="昵称">
                    <Input placeholder="昵称" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                </Form.Item>
                <Form.Item label="角色">
                    <Select mode="multiple" style={{width: '100%' }} placeholder='角色' value={this.state.roles} onChange={(value) => this.rolesChange(value)}>
                        {this.props.roles.map(role => {
                            return (
                                <Select.Option key={role.id} value={role.id}>{role.name}</Select.Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label='描述'>
                    <Input placeholder='描述' onChange={(event) => this.change(event, 'description')} value={this.state.description}/>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm(deleteUsersByIds, selectRows) {
    if(selectRows.length == 0){
        message.error('请选择行!')
    }else {
        Modal.confirm({
            title: '删除用户',
            content: '确定要删除吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteUsersByIds(selectRows)
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
  }

export default connect((state) => ({userManager: state.userManager}), {
    findUsers, findRoles, 
    addUserShow, addUserCancel, addUserSure, 
    deleteUsersByIds, 
    updateUserShow, updateUserCancel, updateUserSure, 
})(UserManager)