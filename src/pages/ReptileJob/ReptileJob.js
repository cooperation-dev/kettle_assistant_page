import React, {Component} from 'react';
import {Row, Col, Form, Input, Button, Table, Modal, Select, Icon, Divider, message, AutoComplete } from 'antd';

import {findJobs, 
    addJobModalShow, addJobModalSure, addJobModalCancel,
    updateJobModalShow, updateJobModalSure, updateJobModalCancel,
    deleteJob,
    displayLogShow, displayLogClose,
    startingJob, pauseJob} from '../../redux/actions/reptile_job';
import {connect} from 'react-redux';
import axios from 'axios';

import './ReptileJob.css';

const {TextArea} = Input
const {Option} = Select

const statusData = ['正在运行', '运行失败', '未开始运行'];
const platformData = ['京东','天猫','淘宝']

class ReptileJob extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectRows: [],
            name: '',
            status: '',
            platform: '',
            updateTime: '',
        }
    }

    componentDidMount = () => {
        let job = {
            name: this.state.name,
            status: this.state.status,
            platform: this.state.platform,
            updateTime: this.state.updateTime,
        }
        this.props.findJobs(job)
    }

    search = () => {
        let job = {
            name: this.state.name,
            status: this.state.status,
            platform: this.state.platform,
            updateTime: this.state.updateTime,
        }
        this.props.findJobs(job)
    }

    reset = () => {
        this.setState({
            selectRows: [],
            name: '',
            status: '',
            platform: '',
            updateTime: '',
        })

        let job = {
            name: '',
            status: '',
            platform: '',
            updateTime: '',
        }
        this.props.findJobs(job)
    }
    
    change = (event, attributes) => {
        let newState = {};
        newState[attributes] = event.target.value;
        this.setState(newState);
    }

    changeValue = (value, attributes) => {
        let newState = {};
        newState[attributes] = value;
        this.setState(newState);
    }

    render(){
        const columns = [{
            title: 'ID',
            dataIndex: 'reptileId',
            key: 'reptileId',
        },{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '平台',
            dataIndex: 'platform',
            key: 'platform',
        },{
            title: '种类',
            dataIndex: 'type',
            key: 'type',
        },{
            title: '定时设置',
            dataIndex: 'timing',
            key: 'timing',
        },{
            title: '运行状态',
            dataIndex: 'status',
            key: 'status',
        },{
            title: '更新人',
            dataIndex: 'updater',
            key: 'updater',
        },{
            title: '最后更新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
        },{
            title: '操作',
            render: (text, record) => (
                <span>
                    <Icon type="caret-right" onClick={() => this.props.startingJob(record.reptileId)} style={{marginRight: 10}}/>
                    <Icon type="border" onClick={() => this.props.pauseJob(record.reptileId)} style={{marginRight: 10}}/>
                    <Icon type="file-text" onClick={() => this.props.displayLogShow(record.reptileId)} style={{marginRight: 10}}/>
                    <Icon type="edit" onClick={() => this.props.updateJobModalShow(record.reptileId)} style={{marginRight: 10}}/>
                    <Icon type="delete" onClick={() => showDeleteConfirm(this.props.deleteJob, record.reptileId)}/>
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
                                    <Input placeholder="请输入作业名称" value={this.state.name} onChange={(e) => this.change(e, 'name')}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} key={2}>
                                <Form.Item label="运行状态">
                                    <AutoComplete
                                        value={this.state.status}
                                        dataSource={statusData}
                                        placeholder="请选择运行状态"
                                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                        onChange={(value) => this.changeValue(value, 'status')}
                                        />
                                </Form.Item>
                            </Col>
                            <Col span={5} key={3}>
                                <Form.Item label="平台">
                                    <AutoComplete
                                        value={this.state.platform}
                                        dataSource={platformData}
                                        placeholder="请选择平台"
                                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                        onChange={(value) => this.changeValue(value, 'platform')}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} key={4}>
                                <Form.Item label="更新时间">
                                    <Input placeholder="请输入更新时间" value={this.state.updateTime} onChange={(e) => this.change(e, 'updateTime')}/>
                                </Form.Item>
                            </Col>
                            <Col span={4} key={5} className="custom-sr-btn">
                                <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                        <Table rowKey={(record) => {return record.reptileId}} dataSource={this.props.reptileJob.list} columns={columns}/>
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
            platform: '',
            type: '',
            timing: '',
        }
    }

    change = (event, attributes) => {
        let newState = {};
        newState[attributes] = event.target.value;
        this.setState(newState);
    }

    changeValue = (value, attributes) => {
        let newState = {};
        newState[attributes] = value;
        this.setState(newState);
    }

    render(){
        let job = {
            name: this.state.name,
            platform: this.state.platform,
            type: this.state.type,
            timing: this.state.timing,
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
                        {/* <Input placeholder="平台" value={this.state.platform} onChange={(e) => this.change(e, 'platform')}/> */}
                        <AutoComplete
                        style={{ width: '100%' }}
                        value={this.state.platform}
                        dataSource={platformData}
                        placeholder="平台"
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        onChange={(value) => this.changeValue(value, 'platform')}/>
                    </Form.Item>
                    <Form.Item label="种类" {...formItemLayout}>
                        <AutoComplete
                        style={{ width: '100%' }}
                        value={this.state.type}
                        dataSource={platformData}
                        placeholder="种类"
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        onChange={(value) => this.changeValue(value, 'type')}/>
                    </Form.Item>
                    <Form.Item label="定时设置" {...formItemLayout}>
                        {/* <Input placeholder="定时设置" value={this.state.timing} onChange={(e) => this.change(e, 'timing')}/> */}
                        <AutoComplete
                        style={{ width: '100%' }}
                        value={this.state.timing}
                        dataSource={platformData}
                        placeholder="定时设置"
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        onChange={(value) => this.changeValue(value, 'timing')}/>
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
            reptileId: '',
            name: '',
            platform: '',
            type: '',
            timing: '',
        }
    }

    change = (event, attributes) => {
        let newState = {};
        newState[attributes] = event.target.value;
        this.setState(newState);
    }
    changeValue = (value, attributes) => {
        let newState = {};
        newState[attributes] = value;
        this.setState(newState);
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
        axios.get('/reptileService/v1/job/'+id)
            .then((response) => {
                let data = response.data
                this.setState({
                    reptileId: data.reptileId,
                    name: data.name,
                    platform: data.platform,
                    type: data.type,
                    timing: data.timing
                })
            })
    }

    ok = () => {
        let job = {
            reptileId: this.state.reptileId,
            name: this.state.name,
            platform: this.state.platform,
            type: this.state.type,
            timing: this.state.timing
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
                    <AutoComplete
                        style={{ width: '100%' }}
                        value={this.state.platform}
                        dataSource={platformData}
                        placeholder="平台"
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        onChange={(value) => this.changeValue(value, 'platform')}/>
                </Form.Item>
                <Form.Item label="种类" {...formItemLayout}>
                    <AutoComplete
                        style={{ width: '100%' }}
                        value={this.state.type}
                        dataSource={platformData}
                        placeholder="种类"
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        onChange={(value) => this.changeValue(value, 'type')}/>
                </Form.Item>
                <Form.Item label="定时设置" {...formItemLayout}>
                    <AutoComplete
                        style={{ width: '100%' }}
                        value={this.state.timing}
                        dataSource={platformData}
                        placeholder="定时设置"
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        onChange={(value) => this.changeValue(value, 'timing')}/>
                </Form.Item>
            </Modal>
        )
    }
}

class LogModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            reptileId: '',
            name: '',
            logType: '最详细日志',
            logs: ''
        }
    }

    changeValue = (value, attributes) => {
        let newState = {};
        newState[attributes] = value;
        this.setState(newState);
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props.id == nextProps.id){
            return
        }

        let id = nextProps.id
        if(id!=undefined && id!=""){
            // this.findJobById(id)
        }
    }

    findJobById = (id) => {
        axios.post('/reptileService/v1/job/'+id+'/logs')
            .then((response) => {
                let data = response.data
                this.setState({
                    id: data.id,
                    name: data.name,
                    logs: data.logs
                })
            })
    }
    render(){
        const logType = ['基础日志','行日志','最详细日志'];
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
                    {/* <Input readOnly placeholder="日志类别" value={this.state.name}/> */}
                    <AutoComplete
                        style={{ width: '100%' }}
                        value={this.state.logType}
                        dataSource={logType}
                        placeholder="日志类别"
                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        onChange={(value) => this.changeValue(value, 'logType')}/>
                </Form.Item>
                <Form.Item label="日志内容">
                    <TextArea readOnly autosize={{minRows: 8, maxRows: 8}} placeholder="日志内容" value={this.state.logs}/>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm(deleteJob, reptileId) {
        Modal.confirm({
            title: '删除爬虫作业',
            content: '确定要删除吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteJob(reptileId)
            },
            onCancel() {
              console.log('Cancel');
            },
          });
}

export default connect((state) => ({
    reptileJob: state.reptileJob
}), {findJobs, 
    addJobModalShow, addJobModalSure, addJobModalCancel, 
    updateJobModalShow, updateJobModalSure, updateJobModalCancel,
    deleteJob,
    displayLogShow, displayLogClose,
    startingJob, pauseJob})(ReptileJob)