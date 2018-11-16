import React, {Component} from 'react'
import {Form, Input, Checkbox, Button, Row, Col, Table, Modal, message} from 'antd'

import {findDatabases, 
        addDatabaseShow, addDatabaseCancel, addDatabaseSure, 
        deleteDatabase, 
        updateDatabaseShow, updateDatabaseCancel, updateDatabaseSure, 
        changeModalName, changeModalSort, changeModalAgencyName, changeModalAgencyCode, 
        changeModalDbType, changeModalInterviewMethod, changeModalJndiName, changeModalConnectionString} from '../../redux/actions/database_manager'
import {connect} from 'react-redux';

import './DatabaseManager.css'

class DatabaseManager extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectRows:[],
            id: '',
            name: '',
            agencyName: '',
            agencyCode: '',
            connectionString: '',
            createName: '',
            valid: '',
        }
    }
    componentDidMount = () => {
        let database = {
            id: this.state.id,
            name: this.state.name,
            agencyName: this.state.agencyName,
            agencyCode: this.state.agencyCode,
            connectionString: this.state.connectionString,
            createName: this.state.createName,
            valid: this.state.valid,
        }
        this.props.findDatabases(database)
    }
    search = () => {
        let database = {
            id: this.state.id,
            name: this.state.name,
            agencyName: this.state.agencyName,
            agencyCode: this.state.agencyCode,
            connectionString: this.state.connectionString,
            createName: this.state.createName,
            valid: this.state.valid,
        }
        this.props.findDatabases(database)
    }
    reset = () => {
        this.setState({
            selectRows:[],
            id: '',
            name: '',
            agencyName: '',
            agencyCode: '',
            connectionString: '',
            createName: '',
            valid: '',
        })
        let database = {
            id: '',
            name: '',
            agencyName: '',
            agencyCode: '',
            connectionString: '',
            createName: '',
            valid: '',
        }
        this.props.findDatabases(database)
    }
    change = (event, attribute) => {
        let newState = {};
        newState[attribute] = event.target.value;
        this.setState(newState);
    }
    changeValid = (event) => {
        this.setState({
            valid: event.target.checked?'Y':'N'
        })
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
                title: '排序',
                dataIndex: 'sort',
                key: 'sort',
                // defaultSortOrder: 'descend',
                sorter: (a, b) => a.sort - b.sort
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime'
            },
            {
                title: '创建人',
                dataIndex: 'createName',
                key: 'createName'
            },
            {
                title: '是否禁用',
                dataIndex: 'valid',
                key: 'valid',
                render: (text, record) => (
                    <Checkbox checked={record.valid=='Y'?false:true}></Checkbox>
                )
            },
            {
                title: '机构名称',
                dataIndex: 'agencyName',
                key: 'agencyName'
            },
            {
                title: '机构代码',
                dataIndex: 'agencyCode',
                key: 'agencyCode'
            },
            {
                title: '数据库类型',
                dataIndex: 'dbType',
                key: 'dbType'
            },
            {
                title: '访问方式',
                dataIndex: 'interviewMethod',
                key: 'interviewMethod'
            },
            {
                title: 'JNDI名称',
                dataIndex: 'jndiName',
                key: 'jndiName'
            },
            {
                title: '连接串',
                dataIndex: 'connectionString',
                key: 'connectionString'
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
                                <Form.Item label="数据库ID:">
                                    <Input placeholder="数据库ID" onChange={(event) => this.change(event, 'id')} value={this.state.id}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={2}>
                                <Form.Item label="名称:">
                                    <Input placeholder="名称" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={3}>
                                <Form.Item label="机构名称:">
                                    <Input placeholder="机构名称" onChange={(event) => this.change(event, 'agencyName')} value={this.state.agencyName}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={4}>
                                <Form.Item label="机构代码：">
                                    <Input placeholder="机构代码" onChange={(event) => this.change(event, 'agencyCode')} value={this.state.agencyCode}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6} key={5}>
                                <Form.Item label="连接串：">
                                    <Input placeholder="连接串" onChange={(event) => this.change(event, 'connectionString')} value={this.state.connectionString}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={6}>
                                <Form.Item label="创建人:">
                                    <Input placeholder="创建人" onChange={(event) => this.change(event, 'createName')} value={this.state.createName}/>
                                </Form.Item>
                            </Col>
                            {/* <Col span={6} key={7}>
                                <Form.Item label="状态:">
                                    <Input placeholder="状态"/>
                                </Form.Item>
                            </Col> */}
                            <Col span={6} key={7}>
                                <Form.Item label="是否禁用:">
                                    <Checkbox
                                        onChange={(event) => this.changeValid(event)}
                                        checked={this.state.valid=='Y'}
                                    ></Checkbox>
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
                        <Button type="default" size="default" className="btn" onClick={() => this.props.addDatabaseShow()}>新增</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.updateDatabaseShow(this.state.selectRows)}>修改</Button>
                        <Button type="default" size="default" className="btn" onClick={() => showDeleteConfirm(this.props.deleteDatabase, this.state.selectRows)}>删除</Button>
                        <Table rowSelection={rowSelection} dataSource={this.props.databaseManager.list} columns={columns} scroll={{x: 1300}}/>
                    </Form>
                </Row>
                <AddModal 
                visible={this.props.databaseManager.addVisible} 
                onOk={(database) => this.props.addDatabaseSure(database)} 
                onCancel={() => this.props.addDatabaseCancel()}></AddModal>
                <UpdateModal 
                visible={this.props.databaseManager.updateVisible} 
                onOk={(database) => this.props.updateDatabaseSure(database)} 
                onCancel={() => this.props.updateDatabaseCancel()} 
                id={this.props.databaseManager.id}
                name={this.props.databaseManager.name}
                sort={this.props.databaseManager.sort}
                agencyName={this.props.databaseManager.agencyName}
                agencyCode={this.props.databaseManager.agencyCode}
                dbType={this.props.databaseManager.dbType}
                interviewMethod={this.props.databaseManager.interviewMethod}
                jndiName={this.props.databaseManager.jndiName}
                connectionString={this.props.databaseManager.connectionString}
                changeName={(event) => this.props.changeModalName(event)}
                changeSort={(event) => this.props.changeModalSort(event)}
                changeAgencyName={(event) => this.props.changeModalAgencyName(event)}
                changeAgencyCode={(event) => this.props.changeModalAgencyCode(event)}
                changeDbType={(event) => this.props.changeModalDbType(event)}
                changeInterviewMethod={(event) => this.props.changeModalInterviewMethod(event)}
                changeJndiName={(event) => this.props.changeModalJndiName(event)}
                changeConnectionString={(event) => this.props.changeModalConnectionString(event)}></UpdateModal>
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
            sort: '',
            agencyName: '',
            agencyCode: '',
            dbType: '',
            interviewMethod: '',
            jndiName: '',
            connectionString: '',
            valid: 'N',
        }
    }
    change = (event, attributes) => {
        let newState = {};
        newState[attributes] = event.target.value;
        this.setState(newState);
    }
    changeValid = (event) => {
        this.setState({
            valid: event.target.checked?'Y':'N'
        })
    }
    render(){
        let database = {
            name: this.state.name,
            sort: this.state.sort,
            agencyName: this.state.agencyName,
            agencyCode: this.state.agencyCode,
            dbType: this.state.dbType,
            interviewMethod: this.state.interviewMethod,
            jndiName: this.state.jndiName,
            connectionString: this.state.connectionString,
            valid: this.state.valid,
        }
        return (
            <Modal title="新增数据库"
                visible={this.props.visible}
                onOk={() => this.props.onOk(database)}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="名称">
                    <Input placeholder="名称" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                </Form.Item>
                <Form.Item label="排序">
                    <Input placeholder="排序" onChange={(event) => this.change(event, 'sort')} value={this.state.sort}/>
                </Form.Item>
                <Form.Item label="机构名称">
                    <Input placeholder="机构名称" onChange={(event) => this.change(event, 'agencyName')} value={this.state.agencyName}/>
                </Form.Item>
                <Form.Item label="机构代码">
                    <Input placeholder="机构代码" onChange={(event) => this.change(event, 'agencyCode')} value={this.state.agencyCode}/>
                </Form.Item>
                <Form.Item label="数据库类型">
                    <Input placeholder="数据库类型" onChange={(event) => this.change(event, 'dbType')} value={this.state.dbType}/>
                </Form.Item>
                <Form.Item label="访问方式">
                    <Input placeholder="访问方式" onChange={(event) => this.change(event, 'interviewMethod')} value={this.state.interviewMethod}/>
                </Form.Item>
                <Form.Item label="JNDI名称">
                    <Input placeholder="JNDI名称" onChange={(event) => this.change(event, 'jndiName')} value={this.state.jndiName}/>
                </Form.Item>
                <Form.Item label="连接串">
                    <Input placeholder="连接串" onChange={(event) => this.change(event, 'connectionString')} value={this.state.connectionString}/>
                </Form.Item>
                <Form.Item {...formItemLayout} label="是否禁用">
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
        let database = {
            id: this.props.id,
            name: this.props.name,
            sort: this.props.sort,
            agencyName: this.props.agencyName,
            agencyCode: this.props.agencyCode,
            dbType: this.props.dbType,
            interviewMethod: this.props.interviewMethod,
            jndiName: this.props.jndiName,
            connectionString: this.props.connectionString,
        }
        return (
            <Modal title="修改数据库"
                visible={this.props.visible}
                onOk={() => this.props.onOk(database)}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="名称">
                    <Input placeholder="名称" onChange={(event) => this.props.changeName(event)} value={this.props.name}/>
                </Form.Item>
                <Form.Item label="排序">
                    <Input placeholder="排序" onChange={(event) => this.props.changeSort(event)} value={this.props.sort}/>
                </Form.Item>
                <Form.Item label="机构名称">
                    <Input placeholder="机构名称" onChange={(event) => this.props.changeAgencyName(event)} value={this.props.agencyName}/>
                </Form.Item>
                <Form.Item label="机构代码">
                    <Input placeholder="机构代码" onChange={(event) => this.props.changeAgencyCode(event)} value={this.props.agencyCode}/>
                </Form.Item>
                <Form.Item label="数据库类型">
                    <Input placeholder="数据库类型" onChange={(event) => this.props.changeDbType(event)} value={this.props.dbType}/>
                </Form.Item>
                <Form.Item label="访问方式">
                    <Input placeholder="访问方式" onChange={(event) => this.props.changeInterviewMethod(event)} value={this.props.interviewMethod}/>
                </Form.Item>
                <Form.Item label="JNDI名称">
                    <Input placeholder="JNDI名称" onChange={(event) => this.props.changeJndiName(event)} value={this.props.jndiName}/>
                </Form.Item>
                <Form.Item label="连接串">
                    <Input placeholder="连接串" onChange={(event) => this.props.changeConnectionString(event)} value={this.props.connectionString}/>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm(deleteDatabase, selectRows) {
    if(selectRows.length == 0){
        message.error('请选择行!')
    }else{
        Modal.confirm({
            title: '删除数据库',
            content: '确定要删除吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteDatabase(selectRows)
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
  }

export default connect((state) => ({databaseManager: state.databaseManager}), {
    findDatabases, 
    addDatabaseShow, addDatabaseCancel, addDatabaseSure, 
    deleteDatabase, 
    updateDatabaseShow, updateDatabaseCancel, updateDatabaseSure, 
    changeModalName, changeModalSort, changeModalAgencyName, changeModalAgencyCode, 
    changeModalDbType, changeModalInterviewMethod, changeModalJndiName, changeModalConnectionString, 
})(DatabaseManager)