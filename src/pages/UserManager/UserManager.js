import React, {Component} from 'react'
import {Form, Input, Button, Row, Col, Table, Modal, message} from 'antd'

import {findUsers, 
        addUserShow, addUserCancel, addUserSure, 
        deleteUser, 
        updateUserShow, updateUserCancel, updateUserSure, 
        changeModalNickName, changeModalRole} from '../../redux/actions/user_manager'
import {connect} from 'react-redux';

import './UserManager.css'

class UserManager extends Component{
    constructor(props){
        super(props);

        this.state = {
            selectRows:[]
        }
    }
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
                        <Button type="default" size="default" className="btn" onClick={() => this.props.addUserShow()}>新增</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.updateUserShow(this.state.selectRows)}>修改</Button>
                        <Button type="default" size="default" className="btn" onClick={() => showDeleteConfirm(this.props.deleteUser, this.state.selectRows)}>删除</Button>
                        <Button type="default" size="default" className="btn">查看</Button>
                        <Button type="default" size="default" className="btn">导入</Button>
                        <Table rowSelection={rowSelection} dataSource={this.props.userManager.list} columns={columns} />
                    </Form>
                </Row>
                <AddModal 
                visible={this.props.userManager.addVisible} 
                onOk={(user) => this.props.addUserSure(user)} 
                onCancel={() => this.props.addUserCancel()}></AddModal>
                <UpdateModal 
                visible={this.props.userManager.updateVisible} 
                onOk={(user) => this.props.updateUserSure(user)} 
                onCancel={() => this.props.updateUserCancel()} 
                id={this.props.userManager.id} 
                nickName={this.props.userManager.nickName} 
                role={this.props.userManager.role} 
                changeNickName={(event) => this.props.changeModalNickName(event)}
                changeRole={(event) => this.props.changeModalRole(event)}></UpdateModal>
            </div>
        )
    }
}

class AddModal extends Component{
    constructor(){
        super()
        this.state = {
            nickName: '',
            loginAccount: '',
            role: ''
        }
    }
    changeNickName = (event) => {
        this.setState({
            nickName: event.target.value
        })
    }
    changeLoginAccount = (event) => {
        this.setState({
            loginAccount: event.target.value
        })
    }
    changeRole = (event) => {
        this.setState({
            role: event.target.value
        })
    }
    render(){
        let user = {
            nickName: this.state.nickName,
            loginAccount: this.state.loginAccount,
            role: this.state.role
        }
        return (
            <Modal title="新增用户"
                visible={this.props.visible}
                onOk={() => this.props.onOk(user)}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="昵称">
                    <Input placeholder="昵称" onChange={(event) => this.changeNickName(event)} value={this.state.nickName}/>
                </Form.Item>
                <Form.Item label="登陆账号">
                    <Input placeholder="登陆账号" onChange={(event) => this.changeLoginAccount(event)} value={this.state.loginAccount}/>
                </Form.Item>
                <Form.Item label="角色">
                    <Input placeholder="角色" onChange={(event) => this.changeRole(event)} value={this.state.role}/>
                </Form.Item>
            </Modal>
        )
    }
}

class UpdateModal extends Component{
    render(){
        let user = {
            id: this.props.id,
            nickName: this.props.nickName,
            role: this.props.role
        }
        return (
            <Modal title="修改用户"
                visible={this.props.visible}
                onOk={() => this.props.onOk(user)}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="昵称">
                    <Input placeholder="昵称" onChange={(event) => this.props.changeNickName(event)} value={this.props.nickName}/>
                </Form.Item>
                <Form.Item label="角色">
                    <Input placeholder="角色" onChange={(event) => this.props.changeRole(event)} value={this.props.role}/>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm(deleteUser, selectRows) {
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
              deleteUser(selectRows)
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
  }

export default connect((state) => ({userManager: state.userManager}), {
    findUsers, 
    addUserShow, addUserCancel, addUserSure, 
    deleteUser, 
    updateUserShow, updateUserCancel, updateUserSure, 
    changeModalNickName, changeModalRole
})(UserManager)