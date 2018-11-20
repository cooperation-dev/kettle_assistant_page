import React, {Component} from 'react'
import {Form, Input, Checkbox, Button, Row, Col, Table, Modal, message} from 'antd'

import {findProjects, 
        addProjectShow, addProjectCancel, addProjectSure, 
        deleteProjectsByIds, 
        updateProjectShow, updateProjectCancel, updateProjectSure,} from '../../redux/actions/project_manager'
import {connect} from 'react-redux';

import axios from 'axios'

import './ProjectManager.css'

class ProjectManager extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectRows:[],
            id: '',
            name: '',
            status: '',
            valid: '',
        }
    }
    componentDidMount = () => {
        let project = {
            id: this.state.id,
            name: this.state.name,
            status: this.state.status,
            valid: this.state.valid,
        }
        this.props.findProjects(project)
    }
    search = () => {
        let project = {
            id: this.state.id,
            name: this.state.name,
            status: this.state.status,
            valid: this.state.valid,
        }
        this.props.findProjects(project)
    }
    reset = () => {
        this.setState({
            selectRows:[],
            id: '',
            name: '',
            status: '',
            valid: '',
        })
        let project = {
            id: '',
            name: '',
            status: '',
            valid: '',
        }
        this.props.findProjects(project)
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
                    <Checkbox checked={record.valid=='Y'}></Checkbox>
                )
            },
            {
                title: '项目URL',
                dataIndex: 'projectUrl',
                key: 'projectUrl'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
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
                                <Form.Item label="ID:">
                                    <Input placeholder="ID" onChange={(event) => this.change(event, 'id')} value={this.state.id}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={2}>
                                <Form.Item label="名称:">
                                    <Input placeholder="名称" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={3}>
                                <Form.Item label="状态:">
                                    <Input placeholder="状态" onChange={(event) => this.change(event, 'status')} value={this.state.status}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={4}>
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
                        <Button type="default" size="default" className="btn" onClick={() => this.props.addProjectShow()}>新增</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.updateProjectShow(this.state.selectRows)}>修改</Button>
                        <Button type="default" size="default" className="btn" onClick={() => showDeleteConfirm(this.props.deleteProjectsByIds, this.state.selectRows)}>删除</Button>
                        <Table rowSelection={rowSelection} dataSource={this.props.projectManager.list} columns={columns} />
                    </Form>
                </Row>
                <AddModal 
                visible={this.props.projectManager.addVisible} 
                onOk={(project) => this.props.addProjectSure(project)} 
                onCancel={() => this.props.addProjectCancel()}></AddModal>
                <UpdateModal 
                visible={this.props.projectManager.updateVisible} 
                onOk={(project) => this.props.updateProjectSure(project)} 
                onCancel={() => this.props.updateProjectCancel()} 
                id={this.props.projectManager.id}></UpdateModal>
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
            projectUrl: '',
            sort: '',
            valid: '',
        }
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
        let project = {
            name: this.state.name,
            projectUrl: this.state.projectUrl,
            sort: this.state.sort,
            valid: this.state.valid,
        }
        return (
            <Modal title="新增项目"
                visible={this.props.visible}
                onOk={() => this.props.onOk(project)}
                onCancel={() => this.props.onCancel()}
                okText='确定'
                cancelText='取消'
                destroyOnClose={true}
                >
                <Form.Item label="对象名称">
                    <Input placeholder="对象名称" onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                </Form.Item>
                <Form.Item label="项目URL">
                    <Input placeholder="项目URL" onChange={(event) => this.change(event, 'projectUrl')} value={this.state.projectUrl}/>
                </Form.Item>
                <Form.Item label="排序">
                    <Input placeholder="排序" onChange={(event) => this.change(event, 'sort')} value={this.state.sort}/>
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
    constructor(){
        super();

        this.state = {
            id: '',
            name: '',
            projectUrl: '',
            sort: '',
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if(this.props.id == nextProps.id){
            return 
        }
        let id = nextProps.id;
        if(id != undefined && id != ''){
            this.findProjectById(id);
        }
    }
    findProjectById = (id) => {
        axios.get('projectManager/findProjectById/'+id)
            .then((res) => {
                let data = res.data;
                this.setState({
                    id: data.id,
                    name: data.name,
                    projectUrl: data.projectUrl,
                    sort: data.sort,
                })
            })
    }
    change = (event, attribute) => {
        let newState = {};
        newState[attribute] = event.target.value;
        this.setState(newState);
    } 
    ok = () => {
        let project = {
            id: this.state.id,
            name: this.state.name,
            projectUrl: this.state.projectUrl,
            sort: this.state.sort,
        }
        this.setState({
            name: '',
            projectUrl: '',
            sort: '',
        })
        this.props.onOk(project);
    }
    cancel = () => {
        this.setState({
            name: '',
            projectUrl: '',
            sort: '',
        })
        this.props.onCancel();
    }
    render(){
        return (
            <Modal title='修改项目'
                visible={this.props.visible}
                onOk={this.ok}
                onCancel={this.cancel}
                okText='确定'
                cancelText='取消'
                destroyOnClose={true}
                >
                <Form.Item label='对象名称'>
                    <Input placeholder='对象名称' onChange={(event) => this.change(event, 'name')} value={this.state.name}/>
                </Form.Item>
                <Form.Item label='项目URL'>
                    <Input placeholder='项目URL' onChange={(event) => this.change(event, 'projectUrl')} value={this.state.projectUrl}/>
                </Form.Item>
                <Form.Item label='排序'>
                    <Input placeholder='排序' onChange={(event) => this.change(event, 'sort')} value={this.state.sort}/>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm(deleteProjectsByIds, selectRows) {
    if(selectRows.length == 0){
        message.error('请选择行!')
    }else {
        Modal.confirm({
            title: '删除项目',
            content: '确定要删除吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteProjectsByIds(selectRows);
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
  }

export default connect((state) => ({projectManager: state.projectManager}), {
    findProjects, 
    addProjectShow, addProjectCancel, addProjectSure, 
    deleteProjectsByIds, 
    updateProjectShow, updateProjectCancel, updateProjectSure,
})(ProjectManager)