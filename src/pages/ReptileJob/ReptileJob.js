import React, {Component} from 'react';
import {Row, Col, Form, Input, Button, Table, Modal, Select, Icon, Divider, TreeSelect, DatePicker } from 'antd';

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
const {RangePicker} = DatePicker

class ReptileJob extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectRows: [],
            name: '',
            status: undefined,
            platform: undefined,
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
            status: undefined,
            platform: undefined,
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
                            <Col key={1} style={{float: "left", width: "20%"}}>
                                <Form.Item label="作业名称 ">
                                    <Input placeholder="请输入作业名称" value={this.state.name} onChange={(e) => this.change(e, 'name')} />
                                </Form.Item>
                            </Col>
                            <Col key={2} style={{float: "left", width: "20%"}}>
                                <Form.Item label="运行状态">
                                    <Select
                                        showSearch
                                        placeholder="请选择运行状态"
                                        notFoundContent="未匹配"
                                        // optionFilterProp="children"
                                        value={this.state.status}
                                        onChange={(value) => this.changeValue(value, 'status')}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="未开始">未开始</Option>
                                        <Option value="正在运行">正在运行</Option>
                                        <Option value="已停止">已停止</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col key={3} style={{float: "left", width: "20%"}}>
                                <Form.Item label="平台" >
                                    <Select
                                        showSearch
                                        placeholder="请选择平台"
                                        notFoundContent="未匹配"
                                        // optionFilterProp="children"
                                        value={this.state.platform}
                                        onChange={(value) => this.changeValue(value, 'platform')}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="京东">京东</Option>
                                        <Option value="淘宝">淘宝</Option>
                                        <Option value="天猫">天猫</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col key={4} style={{float: "left", width: "20%"}}>
                                <Form.Item label="更新时间">
                                    {/* <Input placeholder="请输入更新时间" value={this.state.updateTime} onChange={(e) => this.change(e, 'updateTime')}/> */}
                                    <RangePicker placeholder={['开始日期', '结束日期']}/>
                                </Form.Item>
                            </Col>
                            <Col key={5} className="custom-sr-btn" style={{float: "left", width: "20%"}}>
                                <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                        <Table rowKey={(record) => {return record.reptileId}} dataSource={this.props.reptileJob.list} columns={columns}/>
                    </Form>
                </Row>
                <AddModal visible={this.props.reptileJob.addVisible} onOk={(job) => this.props.addJobModalSure(job)} onCancel={() => this.props.addJobModalCancel()} ></AddModal>
                <UpdateModal visible={this.props.reptileJob.updateVisible} onOk={(job, reptileId) => this.props.updateJobModalSure(job, reptileId)} onCancel={() => this.props.updateJobModalCancel()} id={this.props.reptileJob.updateJobId} ></UpdateModal>
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
            platform: undefined,
            type: '',
            timing: undefined,
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
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="平台"
                            notFoundContent="未匹配"
                            // optionFilterProp="children"
                            value={this.state.platform}
                            onChange={(value) => this.changeValue(value, 'platform')}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="京东">京东</Option>
                            <Option value="淘宝">淘宝</Option>
                            <Option value="天猫">天猫</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="种类" {...formItemLayout}>
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            value={this.state.type}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="种类"
                            allowClear
                            treeDefaultExpandAll
                            onChange={(value) => this.changeValue(value, 'type')}
                        >
                            <TreeSelect.TreeNode value="电子产品" title="电子产品" key="1">
                                <TreeSelect.TreeNode value="电脑" title="电脑" key="2" />
                                <TreeSelect.TreeNode value="手机" title="手机" key="3" />
                            </TreeSelect.TreeNode>
                        </TreeSelect>
                    </Form.Item>
                    <Form.Item label="定时设置" {...formItemLayout}>
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="定时设置"
                            notFoundContent="未匹配"
                            // optionFilterProp="children"
                            value={this.state.timing}
                            onChange={(value) => this.changeValue(value, 'timing')}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="2-3秒">2-3秒</Option>
                            <Option value="5-10秒">5-10秒</Option>
                        </Select>
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
            platform: undefined,
            type: '',
            timing: undefined,
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
            name: this.state.name,
            platform: this.state.platform,
            type: this.state.type,
            timing: this.state.timing
        }
        let reptileId = this.state.reptileId
        this.props.onOk(job, reptileId)
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
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="平台"
                        notFoundContent="未匹配"
                        // optionFilterProp="children"
                        value={this.state.platform}
                        onChange={(value) => this.changeValue(value, 'platform')}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="京东">京东</Option>
                        <Option value="淘宝">淘宝</Option>
                        <Option value="天猫">天猫</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="种类" {...formItemLayout}>
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        value={this.state.type}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="种类"
                        allowClear
                        treeDefaultExpandAll
                        onChange={(value) => this.changeValue(value, 'type')}
                    >
                        <TreeSelect.TreeNode value="电子产品" title="电子产品" key="1">
                            <TreeSelect.TreeNode value="电脑" title="电脑" key="2" />
                            <TreeSelect.TreeNode value="手机" title="手机" key="3" />
                        </TreeSelect.TreeNode>
                    </TreeSelect>
                </Form.Item>
                <Form.Item label="定时设置" {...formItemLayout}>
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="定时设置"
                        notFoundContent="未匹配"
                        // optionFilterProp="children"
                        value={this.state.timing}
                        onChange={(value) => this.changeValue(value, 'timing')}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="2-3秒">2-3秒</Option>
                        <Option value="5-10秒">5-10秒</Option>
                    </Select>
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
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="日志类别"
                        notFoundContent="未匹配"
                        // optionFilterProp="children"
                        value={this.state.logType}
                        onChange={(value) => this.changeValue(value, 'logType')}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="基础日志">基础日志</Option>
                        <Option value="行日志">行日志</Option>
                        <Option value="最详细日志">最详细日志</Option>
                    </Select>
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