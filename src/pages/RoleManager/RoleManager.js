import React, {Component} from 'react'
import {Form, Input, Button, Row, Col, Table, Modal, message, Tree } from 'antd'

import {findRoles, 
        addRoleShow, addRoleCancel, addRoleSure, 
        deleteRolesByIds, 
        updateRoleShow, updateRoleCancel, updateRoleSure,
        findPrivileges, closePrivilegeModal, surePrivilegeModal, } from '../../redux/actions/role_manager'
import {connect} from 'react-redux';

import axios from 'axios';

import './RoleManager.css'

class RoleManager extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectRows:[],
            name: '',
        }
    }
    componentDidMount = () => {
        let role = {
            name: this.state.name,
        }
        this.props.findRoles(role);
    }
    search = () => {
        let role = {
            name: this.state.name,
        }
        this.props.findRoles(role);
    }
    reset = () => {
        this.setState({
            selectRows:[],
            name: '',
        })
        let role = {
            name: '',
        }
        this.props.findRoles(role);
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
                title: '角色名',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '角色描述',
                dataIndex: 'description',
                key: 'description'
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
                                    <Input placeholder="角色名称" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
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
                        <Button type="default" size="default" className="btn" onClick={() => this.props.addRoleShow()}>新增</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.updateRoleShow(this.state.selectRows)}>修改</Button>
                        <Button type="default" size="default" className="btn" onClick={() => showDeleteConfirm(this.props.deleteRolesByIds, this.state.selectRows)}>删除</Button>
                        <Button type="default" size="default" className="btn">导入</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.findPrivileges(this.state.selectRows)}>权限分配</Button>
                        <Table rowKey={(record) => record.id} rowSelection={rowSelection} dataSource={this.props.roleManager.list} columns={columns} />
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
                id={this.props.roleManager.updateId}></UpdateModal>
                <Privilege
                selectRows={this.state.selectRows} 
                onOk={(privilegeKeys) => {this.props.surePrivilegeModal(privilegeKeys)}}
                onCancel={() => this.props.closePrivilegeModal()}
                visible={this.props.roleManager.privilegeVisible}
                privileges={this.props.roleManager.privileges}></Privilege>
            </div>
        )
    }
}

class AddModal extends Component{
    constructor(){
        super()

        this.state = {
            name: '',
            description: ''
        }
    }
    change = (event, attribute) => {
        let newState = {};
        newState[attribute] = event.target.value;
        this.setState(newState);
    }
    render(){
        let role = {
            name: this.state.name,
            description: this.state.description,
        }
        return (
            <Modal title="新增角色"
                visible={this.props.visible}
                onOk={() => this.props.onOk(role)}
                onCancel={() => this.props.onCancel()}
                okText='确定'
                cancelText='取消'
                destroyOnClose={true}
                >
                <Form.Item label="角色名">
                    <Input placeholder="角色名" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                </Form.Item>
                <Form.Item label="角色描述">
                    <Input placeholder="角色描述" onChange={(event) => this.change(event, 'description')} value={this.state.description}/>
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
            description: '',
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if(this.props.id == nextProps.id){
            return
        }
        let id = nextProps.id
        if(id!=undefined && id!=""){
            this.findRoleById(id)
        }
    }
    findRoleById = (id) => {
        axios.get('/api/roleController/findRoleById/'+id)
            .then(r => {
                let data = r.data.data
                this.setState({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                })
            })
    }
    change = (event, attribute) => {
        let newState = {};
        newState[attribute] = event.target.value;
        this.setState(newState);
    }
    ok = () => {
        let role = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
        }
        this.setState({
            name: '',
            description: '',
        })
        this.props.onOk(role);
    }
    cancel = () => {
        this.setState({
            name: '',
            description: '',
        })
        this.props.onCancel();
    } 
    render(){
        return (
            <Modal title="修改角色"
                visible={this.props.visible}
                onOk={this.ok}
                onCancel={this.cancel}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true} 
                >
                <Form.Item label="角色名">
                    <Input placeholder="角色名" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                </Form.Item>
                <Form.Item label="角色描述">
                    <Input placeholder="角色描述" onChange={(event) => this.change(event, 'description')} value={this.state.description}/>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm(deleteRolesByIds, selectRows) {
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
                deleteRolesByIds(selectRows);
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
  }

  class Privilege extends Component{
      constructor(){
          super();

          this.state = {
              id: '',
              keys: [],
          }
      }
      componentWillReceiveProps = (nextProps) => {
          let keys = [];
          nextProps.selectRows.map((role) => {
              this.setState({id: role.id});
              role.privileges.map(privileges => {
                  keys.push(privileges.id);
              })
          })
          this.setState({keys: keys})
      }
      ok = () => {
          let privilegs = {
              roleId: this.state.id,
              privilegeId: this.state.keys,
          };
          this.props.onOk(privilegs);
      }
      cancel = () => {
          this.setState({keys: []});
          this.props.onCancel();
      }
      onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys);
      }
      onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys);
        this.setState({keys:checkedKeys})
      }
      render(){
          return (
            <Modal title="分配權限"
            visible={this.props.visible}
            onOk={this.ok}
            onCancel={this.cancel}
            okText='确定'
            cancelText='取消'
            destroyOnClose={true}
            >
                <Tree
                checkable
                defaultExpandAll={true}
                checkedKeys={this.state.keys}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
                >
                {this.props.privileges.map(privilege => {
                    return (
                        <Tree.TreeNode title={privilege.name} key={privilege.id}>
                        {privilege.children.map(children => {
                            return (
                                <Tree.TreeNode title={children.name} key={children.id}/>
                            )
                        })}
                        </Tree.TreeNode>
                    )
                })}
                </Tree>
            </Modal>
          )
      }
  }

export default connect((state) => ({roleManager: state.roleManager}), {
    findRoles, 
    addRoleShow, addRoleCancel, addRoleSure, 
    deleteRolesByIds, 
    updateRoleShow, updateRoleCancel, updateRoleSure, 
    findPrivileges, closePrivilegeModal, surePrivilegeModal, 
})(RoleManager)