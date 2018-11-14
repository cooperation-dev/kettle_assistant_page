import React, {Component} from 'react'
import {Form, Input, Button, Row, Col, Table, Modal, message} from 'antd'

import {findRoles, 
        addRoleShow, addRoleCancel, addRoleSure, 
        deleteRole, 
        updateRoleShow, updateRoleCancel, updateRoleSure, 
        changeModalName, changeModalDescription} from '../../redux/actions/role_manager'
import {connect} from 'react-redux';

import './RoleManager.css'

class RoleManager extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectRows:[]
        }
    }
    componentDidMount = () => {
        this.props.findRoles()
    }
    render(){
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '角色名',
                dataIndex: 'role_name',
                key: 'role_name'
            },
            {
                title: '角色描述',
                dataIndex: 'role_description',
                key: 'role_description'
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
                                <Form.Item label="角色名称:">
                                    <Input placeholder="角色名称"/>
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
                        <Button type="default" size="default" className="btn" onClick={() => this.props.addRoleShow()}>新增</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.updateRoleShow(this.state.selectRows)}>修改</Button>
                        <Button type="default" size="default" className="btn" onClick={() => showDeleteConfirm(this.props.deleteRole, this.state.selectRows)}>删除</Button>
                        <Button type="default" size="default" className="btn">查看</Button>
                        <Button type="default" size="default" className="btn">导入</Button>
                        <Button type="default" size="default" className="btn">权限分配</Button>
                        <Table rowSelection={rowSelection} dataSource={this.props.roleManager.list} columns={columns} />
                    </Form>
                </Row>
                <AddModal 
                visible={this.props.roleManager.addVisible} 
                onOk={(role) => this.props.addRoleSure(role)} 
                onCancel={() => this.props.addRoleCancel()}></AddModal>
                <UpdateModal 
                visible={this.props.roleManager.updateVisible} 
                onOk={(role) => this.props.updateRoleSure(role)} 
                onCancel={() => this.props.updateRoleCancel()} 
                roleId={this.props.roleManager.modalRoleId} 
                roleName={this.props.roleManager.modalRoleName} 
                roleDescription={this.props.roleManager.modalRoleDescription} 
                changeName={(event) => this.props.changeModalName(event)} 
                changeDescription={(event) => this.props.changeModalDescription(event)}></UpdateModal>
            </div>
        )
    }
}

class AddModal extends Component{
    constructor(){
        super()

        this.state = {
            roleName: '',
            roleDescription: ''
        }
    }
    changeRoleName = (event) => {
        this.setState({roleName: event.target.value})
    }
    changeRoleDescription = (event) => {
        this.setState({roleDescription: event.target.value})
    }
    render(){
        let role = {
            roleName: this.state.roleName,
            roleDescription: this.state.roleDescription
        }
        return (
            <Modal title="新增角色"
                visible={this.props.visible}
                onOk={() => this.props.onOk(role)}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="角色名">
                    <Input placeholder="角色名" onChange={(event) => this.changeRoleName(event)} value={this.state.roleName}/>
                </Form.Item>
                <Form.Item label="角色描述">
                    <Input placeholder="角色描述" onChange={(event) => this.changeRoleDescription(event)} value={this.state.roleDescription}/>
                </Form.Item>
            </Modal>
        )
    }
}

class UpdateModal extends Component{
    render(){
        let role = {
            roleId: this.props.roleId,
            roleName: this.props.roleName,
            roleDescription: this.props.roleDescription
        }
        return (
            <Modal title="修改角色"
                visible={this.props.visible}
                onOk={() => this.props.onOk(role)}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="角色名">
                    <Input placeholder="角色名" onChange={(event) => this.props.changeName(event)} value={this.props.roleName}/>
                </Form.Item>
                <Form.Item label="角色描述">
                    <Input placeholder="角色描述" onChange={(event) => this.props.changeDescription(event)} value={this.props.roleDescription}/>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm(deleteRole, selectRows) {
    if(selectRows.length == 0){
        message.error('请选择行!')
    } else {
        Modal.confirm({
            title: '删除角色',
            content: '确定要删除吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteRole(selectRows);
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
  }

export default connect((state) => ({roleManager: state.roleManager}), {
    findRoles, 
    addRoleShow, addRoleCancel, addRoleSure, 
    deleteRole, 
    updateRoleShow, updateRoleCancel, updateRoleSure, 
    changeModalName, changeModalDescription
})(RoleManager)