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

// import CommonForm from '../../components/CommonForm/CommonForm'
import CommonForm from '../../components/CommonForm/CommonFormTest'

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
        this.search();
    }

    search = () => {
        // let reptileVO = {
        //     name: this.state.name,
        //     status: this.state.status,
        //     platform: this.state.platform,
        //     updateTime: this.state.updateTime,
        // }
        let reptileVO = {
            name: this.state.name,
            status: this.state.status==undefined?'':this.state.status,
            pageSize: this.props.reptileJob.pageSize,
            pageNo: 1,
        }
        this.props.findJobs(reptileVO)
    }

    reset = () => {
        this.setState({
            selectRows: [],
            name: '',
            status: undefined,
            platform: undefined,
            updateTime: '',
        })

        // let reptile = {
        //     name: '',
        //     status: '',
        //     platform: '',
        //     updateTime: '',
        // }
        let reptileVO = {
            name: '',
            status: '',
            pageSize: this.props.reptileJob.pageSize,
            pageNo: 1,
            // data: reptile
        }
        this.props.findJobs(reptileVO)
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

    changePagination = (page) => {
        let reptile = {
            name: this.state.name,
            status: this.state.status,
            platform: this.state.platform,
            updateTime: this.state.updateTime,
        }
        let reptileReqVO = {
            pageSize: this.props.reptileJob.pageSize,
            pageNo: page,
            data: reptile
        }
        this.props.findJobs(reptileReqVO)
    }
    render(){
        const pagination = {
            pageSize: this.props.reptileJob.pageSize,
            total: this.props.reptileJob.total,
            current: this.props.reptileJob.pageNo,
            onChange:(page) => {
                this.changePagination(page)
            }
        }

        const columns = [{
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
            dataIndex: 'interval',
            key: 'interval',
<<<<<<< HEAD
            render: text => <div>{text}秒</div>,
=======
            render: text => <span>{text}秒</span>,
>>>>>>> fc40be7f75e0e896c23d4370348c4e79ef6e7edc
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
                                        <Option value="0">准备启动</Option>
                                        <Option value="2">正在运行</Option>
                                        <Option value="3">已停止</Option>
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
                        <Table rowKey={(record) => {return record.reptileId}} dataSource={this.props.reptileJob.list} columns={columns} pagination={pagination}/>
                    </Form>
                </Row>
                <AddModal visible={this.props.reptileJob.addVisible} onOk={(reptileReqVO) => this.props.addJobModalSure(reptileReqVO)} onCancel={() => this.props.addJobModalCancel()} ></AddModal>
                <UpdateModal visible={this.props.reptileJob.updateVisible} onOk={(reptileReqVO, reptileId) => this.props.updateJobModalSure(reptileReqVO, reptileId)} onCancel={() => this.props.updateJobModalCancel()} id={this.props.reptileJob.updateJobId} ></UpdateModal>
                <LogModal visible={this.props.reptileJob.logVisible} onOk={() => this.props.displayLogClose()} onCancel={() => this.props.displayLogClose()} id={this.props.reptileJob.logJobId}></LogModal>
            </div>
        )
    }
}

let platFormData = [
    {key:0,value:'淘宝'},
    {key:1,value:'天猫'},
    {key:2,value:'京东'},
]
let typeData = [
    {key:0,value:'手机'},
]
let timingData = [
    {key:'1-3',value:'1-3秒'},
    {key:'3-5',value:'3-5秒'},
    {key:'5-12',value:'5-12秒'},
    {key:'12-20',value:'12-20秒'},
]

class AddModal extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            name: '',
            platform: undefined,
            type: '',
            timing: '5-12',
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
    valid = () => {
        this.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let reptileVO = {
                name: this.state.name,
                platform: this.state.platform,
                type: this.state.type,
                timing: this.state.timing,
            }
            this.props.onOk(reptileVO)
        })
    }
    render(){
        const platFormSel = (
            <Select
                showSearch
                style={{ width: '100%' }}
                placeholder='平台'
                notFoundContent="未匹配"
                onChange={(value) => {this.changeValue(value, 'platform')}}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    <Option value='0'>淘宝</Option>
                    <Option value='1'>天猫</Option>
                    <Option value='2'>京东</Option>
            </Select>
        )
        const typeTreeSel = (
            <TreeSelect
                showSearch
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder='种类'
                allowClear
                treeDefaultExpandAll
                onChange={(value) => this.changeValue(value, 'type')}>
                    <TreeSelect.TreeNode value="2" title="电子产品" key="1">
                        <TreeSelect.TreeNode value="1" title="电脑" key="2" />
                        <TreeSelect.TreeNode value="0" title="手机" key="3" />
                    </TreeSelect.TreeNode>
                })}
            </TreeSelect>
        )
        const timingSel = (
            <Select
                showSearch
                style={{ width: '100%' }}
                placeholder='定时设置'
                notFoundContent="未匹配"
                onChange={(value) => {this.changeValue(value, 'timing')}}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    <Option value='1-3'>1-3秒</Option>
                    <Option value='3-5'>3-5秒</Option>
                    <Option value='5-12'>5-12秒</Option>
            </Select>
        )
        const items = [
            {
                label: '作业名称',
                key: 'name',
                value: this.state.name,
                component: <Input placeholder="作业名称" onChange={(value) => {this.change(value, 'name')}}/>,
            },
            {
                label: '平台',
                key: 'platform',
                value: this.state.platform,
                component: platFormSel,
            },
            {
                label: '种类',
                key: 'type',
                value: this.state.type,
                component: typeTreeSel,
            },
            {
                label: '定时设置',
                key: 'timing',
                value: this.state.timing,
                component: timingSel,
            },
        ]
        return (
            <Modal
                title="新增作业"
                visible={this.props.visible}
                onOk={this.valid}
                onCancel={() => this.props.onCancel()}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true}>
                {/* <Form>
                    <CommonForm label = "作业名称" field = "name" type="input" 
                        value = {this.state.name} change = {(event, attribute) => {this.change(event, attribute)}}/>
                    <CommonForm label = "平台" field = "platform" type="select" data={platFormData} 
                        value = {this.state.platform} change = {(value, attribute) => {this.changeValue(value, attribute)}}/>
                    {/*<TreeSelect.TreeNode value="电子产品" title="电子产品" key="1">
                        <TreeSelect.TreeNode value="电脑" title="电脑" key="2" />
                        <TreeSelect.TreeNode value="手机" title="手机" key="3" />
                    </TreeSelect.TreeNode>*/}
                    {/* <CommonForm label = "种类" field = "type" type="treeSelect" data={typeData} 
                        value = {this.state.type} change = {(value, attribute) => {this.changeValue(value, attribute)}}/>
                    <CommonForm label = "定时设置" field = "timing" type="select" data={timingData} 
                        value = {this.state.timing} change = {(value, attribute) => {this.changeValue(value, attribute)}}/>
                </Form> */}
                <CommonForm items={items} customForm={(form) => this.form = form}/>
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
        axios.get('/api/rest/reptileService/v1/job/'+id)
            .then((response) => {
                let reptileRespVO = response.data.data
                this.setState({
                    reptileId: reptileRespVO.reptileId,
                    name: reptileRespVO.name,
                    platform: reptileRespVO.platform,
                    type: reptileRespVO.type,
                    timing: reptileRespVO.timing
                })
            })
    }

    ok = () => {
        let reptileReqVO = {
            name: this.state.name,
            platform: this.state.platform,
            type: this.state.type,
            timing: this.state.timing
        }
        let reptileId = this.state.reptileId
        this.props.onOk(reptileReqVO, reptileId)
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
                destroyOnClose={true}>
                <CommonForm label = "作业名称" field = "name" type="input" 
                    value = {this.state.name} change = {(event, attribute) => {this.change(event, attribute)}}/>
                <CommonForm label = "平台" field = "platform" type="select" data={platFormData} 
                    value = {this.state.platform} change = {(value, attribute) => {this.changeValue(value, attribute)}}/>
                {/*<TreeSelect.TreeNode value="电子产品" title="电子产品" key="1">
                    <TreeSelect.TreeNode value="电脑" title="电脑" key="2" />
                    <TreeSelect.TreeNode value="手机" title="手机" key="3" />
                </TreeSelect.TreeNode>*/}
                <CommonForm label = "种类" field = "type" type="treeSelect" data={typeData} 
                    value = {this.state.type} change = {(value, attribute) => {this.changeValue(value, attribute)}}/>
                <CommonForm label = "定时设置" field = "timing" type="select" data={timingData} 
                    value = {this.state.timing} change = {(value, attribute) => {this.changeValue(value, attribute)}}/>
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