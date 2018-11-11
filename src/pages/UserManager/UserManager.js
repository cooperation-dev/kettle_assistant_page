import React, {Component} from 'react'
import {Form, Input, Button, Row, Col, Table, Modal} from 'antd'

import {findUsers, 
        addUserShow, addUserCancel, addUserSure, 
        updateUserShow, updateUserCancel, updateUserSure} from '../../redux/actions/user_manager'
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
                        <Button type="default" size="default" className="btn" onClick={showDeleteConfirm}>删除</Button>
                        <Button type="default" size="default" className="btn">查看</Button>
                        <Button type="default" size="default" className="btn">导入</Button>
                        <Table rowSelection={rowSelection} dataSource={this.props.userManager.list} columns={columns} />
                    </Form>
                </Row>
                <AddModal visible={this.props.userManager.add_visible} onOk={() => this.props.addUserSure()} onCancel={() => this.props.addUserCancel()}></AddModal>
                <UpdateModal visible={this.props.userManager.update_visible} onOk={() => this.props.updateUserSure()} onCancel={() => this.props.updateUserCancel()} value={this.props.userManager.user}></UpdateModal>
            </div>
        )
    }
}

class AddModal extends Component{
    render(){
        return (
            <Modal title="新增用户"
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="昵称">
                    <Input placeholder="昵称"/>
                </Form.Item>
                <Form.Item label="角色">
                    <Input placeholder="角色"/>
                </Form.Item>
            </Modal>
        )
    }
}

class UpdateModal extends Component{
    render(){
        return (
            <Modal title="修改用户"
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="昵称">
                    <Input placeholder="昵称" value={this.props.value.nick_name}/>
                </Form.Item>
                <Form.Item label="角色">
                    <Input placeholder="角色" value={this.props.value.role}/>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm() {
    Modal.confirm({
      title: '删除用户',
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

export default connect((state) => ({userManager: state.userManager}), {
    findUsers, 
    addUserShow, addUserCancel, addUserSure, 
    updateUserShow, updateUserCancel, updateUserSure
})(UserManager)