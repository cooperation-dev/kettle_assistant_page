import React, {Component} from 'react'
import {Form, Input, Checkbox, Button, Row, Col, Table, Modal, message} from 'antd'

import {findDatabases, 
        addDatabaseShow, addDatabaseCancel, addDatabaseSure, 
        deleteDatabasesByIds, 
        updateDatabaseShow, updateDatabaseCancel, updateDatabaseSure,} from '../../redux/actions/database_manager'
import {connect} from 'react-redux';

import axios from 'axios'

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
                title: '类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '访问方式',
                dataIndex: 'accessMode',
                key: 'accessMode',
            },
            {
                title: 'JNDI名称',
                dataIndex: 'jndiName',
                key: 'jndiName',
            },
            {
                title: '连接串',
                dataIndex: 'connectionString',
                key: 'connectionString',
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
            },
            // {
            //     title: '是否禁用',
            //     dataIndex: 'valid',
            //     key: 'valid',
            //     render: (text, record) => (
            //         <Checkbox checked={record.valid=='Y'}></Checkbox>
            //     )
            // },
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
                        <Button type="default" size="default" className="btn" onClick={() => showDeleteConfirm(this.props.deleteDatabasesByIds, this.state.selectRows)}>删除</Button>
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
                id={this.props.databaseManager.id}></UpdateModal>
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
            code: '',
            type: '',
            sort: '',
            accessMode: '',
            jndiName: '',
            connectionString: '',
        }
    }
    change = (event, attributes) => {
        let newState = {};
        newState[attributes] = event.target.value;
        this.setState(newState);
    }
    // changeValid = (event) => {
    //     this.setState({
    //         valid: event.target.checked?'Y':'N'
    //     })
    // }
    render(){
        let database = {
            name: this.state.name,
            code: this.state.code,
            type: this.state.type,
            sort: this.state.sort,
            accessMode: this.state.accessMode,
            jndiName: this.state.jndiName,
            connectionString: this.state.connectionString,
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
                <Form.Item label="编码">
                    <Input placeholder="编码" onChange={(event) => this.change(event, 'code')} value={this.state.code}/>
                </Form.Item>
                <Form.Item label="类型">
                    <Input placeholder="类型" onChange={(event) => this.change(event, 'dbType')} value={this.state.dbType}/>
                </Form.Item>
                <Form.Item label="排序">
                    <Input placeholder="排序" onChange={(event) => this.change(event, 'sort')} value={this.state.sort}/>
                </Form.Item>
                <Form.Item label="访问方式">
                    <Input placeholder="访问方式" onChange={(event) => this.change(event, 'accessMode')} value={this.state.accessMode}/>
                </Form.Item>
                <Form.Item label="JNDI名称">
                    <Input placeholder="JNDI名称" onChange={(event) => this.change(event, 'jndiName')} value={this.state.jndiName}/>
                </Form.Item>
                <Form.Item label="连接串">
                    <Input placeholder="连接串" onChange={(event) => this.change(event, 'connectionString')} value={this.state.connectionString}/>
                </Form.Item>
                {/* <Form.Item {...formItemLayout} label="是否禁用">
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
            code: '',
            type: '',
            sort: '',
            accessMode: '',
            jndiName: '',
            connectionString: '',
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if(this.props.id == nextProps.id){
            return 
        }
        let id = nextProps.id
        if(id != undefined && id != ''){
            this.findDatabaseById(id);
        }
    }
    findDatabaseById = (id) => {
        axios.get('/api/databaseController/findDatabaseById/'+id)
            .then((res) => {
                let data = res.data.data;
                this.setState({
                    id: data.id,
                    name: data.name,
                    code: data.code,
                    type: data.type,
                    sort: data.sort,
                    accessMode: data.accessMode,
                    jndiName: data.jndiName,
                    connectionString: data.connectionString,
                })
            })
    }
    change = (event, attribute) => {
        let newState = {};
        newState[attribute] = event.target.value;
        this.setState(newState);
    }
    ok = () => {
        let database = {
            id: this.state.id,
            name: this.state.name,
            code: this.state.code,
            type: this.state.type,
            sort: this.state.sort,
            accessMode: this.state.accessMode,
            jndiName: this.state.jndiName,
            connectionString: this.state.connectionString,
        }
        this.setState({
            name: '',
            code: '',
            type: '',
            sort: '',
            accessMode: '',
            jndiName: '',
            connectionString: '',
        })
        this.props.onOk(database);
    }
    cancel = () => {
        this.setState({
            name: '',
            code: '',
            type: '',
            sort: '',
            accessMode: '',
            jndiName: '',
            connectionString: '',
        })
        this.props.onCancel();
    }
    render(){
        return (
            <Modal title="修改数据库"
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
                <Form.Item label="数据库代码">
                    <Input placeholder="数据库代码" onChange={(event) => this.change(event, 'code')} value={this.state.code}/>
                </Form.Item>
                <Form.Item label="数据库类型">
                    <Input placeholder="数据库类型" onChange={(event) => this.change(event, 'type')} value={this.state.type}/>
                </Form.Item>
                <Form.Item label="排序">
                    <Input placeholder="排序" onChange={(event) => this.change(event, 'sort')} value={this.state.sort}/>
                </Form.Item>
                <Form.Item label="访问方式">
                    <Input placeholder="访问方式" onChange={(event) => this.change(event, 'accessMode')} value={this.state.accessMode}/>
                </Form.Item>
                <Form.Item label="JNDI名称">
                    <Input placeholder="JNDI名称" onChange={(event) => this.change(event, 'jndiName')} value={this.state.jndiName}/>
                </Form.Item>
                <Form.Item label="连接串">
                    <Input placeholder="连接串" onChange={(event) => this.change(event, 'connectionString')} value={this.state.connectionString}/>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm(deleteDatabasesByIds, selectRows) {
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
                deleteDatabasesByIds(selectRows)
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
    deleteDatabasesByIds, 
    updateDatabaseShow, updateDatabaseCancel, updateDatabaseSure, 
})(DatabaseManager)