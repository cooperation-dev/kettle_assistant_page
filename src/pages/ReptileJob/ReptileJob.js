import React, {Component} from 'react';
import {Row, Col, Form, Input, Button, Table, Modal, Select, Icon, Divider, message} from 'antd';

import {findJobs, 
    addJobModalShow, addJobModalSure, addJobModalCancel,
    updateJobModalShow, updateJobModalSure, updateJobModalCancel,
    deleteJob,
    displayLogShow, displayLogClose} from '../../redux/actions/reptile_job';
import {connect} from 'react-redux';
import axios from 'axios';

import './ReptileJob.css';

const {TextArea} = Input
const {Option} = Select

class ReptileJob extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectRows: [],
            name: '',
            platform: '',
            type: '',
            timing: '',
        }
    }

    componentDidMount = () => {
        let job = {
            name: this.state.name,
            platform: this.state.platform,
            type: this.state.type,
            timing: this.state.timing,
        }
        this.props.findJobs(job)
    }

    search = () => {
        let job = {
            name: this.state.name,
            platform: this.state.platform,
            type: this.state.type,
            timing: this.state.timing,
        }
        this.props.findJobs(job)
    }

    reset = () => {
        this.setState({
            selectRows: [],
            name: '',
            platform: '',
            type: '',
            timing: '',
        })

        let job = {
            name: '',
            platform: '',
            type: '',
            timing: '',
        }
        this.props.findJobs(job)
    }
    
    change = (event, attributes) => {
        let newState = {};
        newState[attributes] = event.target.value;
        this.setState(newState);
    }

    render(){
          
          const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: '平台',
            dataIndex: 'description',
            key: 'description',
          },{
            title: '种类',
            dataIndex: 'cronSet',
            key: 'cronSet',
          },{
            title: '定时设置',
            dataIndex: 'jobType',
            key: 'jobType',
          },{
            title: '运行状态',
            dataIndex: 'state',
            key: 'state',
          },{
            title: '更新人',
            dataIndex: 'runState',
            key: 'runState',
          },{
            title: '最后更新时间',
            dataIndex: 'modifyTime',
            key: 'modifyTime',
          },{
            title: '操作',
            render: (text, record) => (
                <span>
                    <Icon type="caret-right" style={{marginRight: 10}}/>
                    <Icon type="border" style={{marginRight: 10}}/>
                    <Icon type="file-text" onClick={() => this.props.displayLogShow(record.id)} style={{marginRight: 10}}/>
                    <Icon type="edit" onClick={() => this.props.updateJobModalShow(record.id)} style={{marginRight: 10}}/>
                    <Icon type="delete" onClick={() => showDeleteConfirm(this.props.deleteJob, this.state.selectRows)}/>
                </span>
            )
          }]; 

        return (

            <div className="ant-advanced-search-form" style={{width:"98%", position:"relative", marginLeft:"auto", marginRight:"auto", marginBottom:"15px"}}>
                <Row>
                    <Button type="default" size="default" className="custom-toolbar-btn" onClick={() => this.props.addJobModalShow()}><Icon type="plus" />新增</Button>
                    <Button type="default" size="default" className="custom-toolbar-btn" onClick={() => showDeleteConfirm(this.props.deleteJob, this.state.selectRows)}><Icon type="delete" />全部删除</Button>
                </Row>
                <Divider />
                <Row>
                    <Form layout="vertical">
                        <Row gutter={24}>
                            <Col span={5} key={1}>
                                <Form.Item label="作业名称 ">
                                    <Input placeholder="请输入作业名称" value={this.state.id} onChange={(e) => this.change(e, 'id')}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} key={2}>
                                <Form.Item label="运行状态">
                                    <Input placeholder="请选择运行状态" value={this.state.name} onChange={(e) => this.change(e, 'name')}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} key={3}>
                                <Form.Item label="平台">
                                    <Input placeholder="请选择平台" value={this.state.description} onChange={(e) => this.change(e, 'description')}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} key={4}>
                                <Form.Item label="更新时间">
                                    <Input placeholder="请输入更新时间" value={this.state.jobType} onChange={(e) => this.change(e, 'jobType')}/>
                                </Form.Item>
                            </Col>
                            <Col span={4} key={5} className="custom-sr-btn">
                                <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                        <Table rowKey={(record) => {return record.id}} dataSource={this.props.reptileJob.list} columns={columns}/>
                    </Form>
                </Row>
                <AddModal visible={this.props.reptileJob.addVisible} onOk={(job) => this.props.addJobModalSure(job)} onCancel={() => this.props.addJobModalCancel()} ></AddModal>
                <UpdateModal visible={this.props.reptileJob.updateVisible} onOk={(job) => this.props.updateJobModalSure(job)} onCancel={() => this.props.updateJobModalCancel()} id={this.props.reptileJob.updateJobId} ></UpdateModal>
                <LogModal visible={this.props.reptileJob.logVisible} onOk={() => this.props.displayLogClose()} onCancel={() => this.props.displayLogClose()} id={this.props.reptileJob.logJobId}></LogModal>
            </div>
        )
    }
}

const formItemLayout = {
    labelCol:{ span: 5 },
    wrapperCol:{ span: 17 }
}

class AddModal extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            name: '',
            jobType: '',
            jobTypes: [],
            description: '',
        }
    }
    
    componentDidMount = () => {
        this.findJobTypes()
    }

    findJobTypes = () => {
        axios.get('/api/jobManagerController/findJobTypes')
            .then(r => {
                this.setState({
                    jobTypes: r.data
                })
            })
    }
    
    changeJobType = (e) => {
        this.setState({
            jobType: e
        })
    }

    change = (event, attributes) => {
        let newState = {};
        newState[attributes] = event.target.value;
        this.setState(newState);
    }

    render(){
        let job = {
            name: this.state.name,
            jobType: this.state.jobType,
            description: this.state.description,
        }
        return (
            <Modal
                title="新增作业"
                visible={this.props.visible}
                onOk={() => this.props.onOk(job)}
                onCancel={() => this.props.onCancel()}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true}>
                <Form>
                    <Form.Item label="作业名称" {...formItemLayout}>
                        <Input placeholder="作业名称" value={this.state.name} onChange={(e) => this.change(e, 'name')}/>
                    </Form.Item>
                    <Form.Item label="平台" {...formItemLayout}>
                        <Input placeholder="平台" value={this.state.name} onChange={(e) => this.change(e, 'name')}/>
                    </Form.Item>
                    <Form.Item label="种类" {...formItemLayout}>
                        <Input placeholder="种类" value={this.state.name} onChange={(e) => this.change(e, 'name')}/>
                    </Form.Item>
                    <Form.Item label="定时设置" {...formItemLayout}>
                        <Input placeholder="定时设置" value={this.state.name} onChange={(e) => this.change(e, 'name')}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

class UpdateModal extends Component{

    constructor(props){
        super(props)

        this.state = {
            id: '',
            name: '',
            jobType: '',
            jobTypes: [],
            description: '',
        }
    }

    changeType = (e) => {
        this.setState({
            jobType: e
        })
    }

    change = (event, attributes) => {
        let newState = {};
        newState[attributes] = event.target.value;
        this.setState(newState);
    }

    findJobTypes = () => {
        axios.get('/api/jobManagerController/findJobTypes')
            .then(r => {
                this.setState({
                    jobTypes: r.data
                })
            })
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props.id == nextProps.id){
            return
        }

        let id = nextProps.id
        if(id!=undefined && id!=""){
            this.findJobById(id)
        }
    }

    findJobById = (id) => {
        axios.post('/api/jobManagerController/findJobById/'+id)
            .then((response) => {
                let data = response.data
                this.setState({
                    id: data.id,
                    name: data.name,
                    code: data.code,
                    jobType: data.jobType,
                    description: data.description
                })
                this.findJobTypes()
            })
    }

    ok = () => {
        let job = {
            id: this.state.id,
            name: this.state.name,
            code: this.state.code,
            jobType: this.state.jobType,
            description: this.state.description
        }

        this.props.onOk(job)
    }

    render(){                 

        return (
            <Modal
                title="修改作业"
                visible={this.props.visible}
                onOk={this.ok}
                onCancel={() => this.props.onCancel()}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true} 
            >
                <Form.Item label="作业名称" {...formItemLayout}>
                    <Input placeholder="作业名称" onChange={(e) => this.change(e, 'name')} value={this.state.name}/>
                </Form.Item>
                <Form.Item label="平台" {...formItemLayout}>
                    <Input placeholder="平台" value={this.state.name} onChange={(e) => this.change(e, 'name')}/>
                </Form.Item>
                <Form.Item label="种类" {...formItemLayout}>
                    <Input placeholder="种类" value={this.state.name} onChange={(e) => this.change(e, 'name')}/>
                </Form.Item>
                <Form.Item label="定时设置" {...formItemLayout}>
                    <Input placeholder="定时设置" value={this.state.name} onChange={(e) => this.change(e, 'name')}/>
                </Form.Item>
            </Modal>
        )
    }
}

class LogModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            id: '',
            name: '',
            log: ''
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props.id == nextProps.id){
            return
        }

        let id = nextProps.id
        if(id!=undefined && id!=""){
            this.findJobById(id)
        }
    }

    findJobById = (id) => {
        axios.post('/api/jobManagerController/findJobById/'+id)
            .then((response) => {
                let data = response.data
                this.setState({
                    id: data.id,
                    name: data.name,
                    log: data.log
                })
            })
    }

    render(){
        return (
            <Modal
                title="运行日志"
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true}>
                <Form.Item label="作业名称">
                    <Input readOnly placeholder="作业名称" value={this.state.name}/>
                </Form.Item>
                <Form.Item label="日志类别">
                    <Input readOnly placeholder="日志类别" value={this.state.name}/>
                </Form.Item>
                <Form.Item label="日志内容">
                    <TextArea readOnly autosize={{minRows: 8, maxRows: 8}} placeholder="日志内容" value={this.state.log}/>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm(deleteJob, selectRows) {
    if(selectRows.length == 0){
        message.error('请选择行!')
    }else{
        Modal.confirm({
            title: '删除字典',
            content: '确定要删除吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteJob(selectRows)
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
}

export default connect((state) => ({
    reptileJob: state.reptileJob
}), {findJobs, 
    addJobModalShow, addJobModalSure, addJobModalCancel, 
    updateJobModalShow, updateJobModalSure, updateJobModalCancel,
    deleteJob,
    displayLogShow, displayLogClose})(ReptileJob)