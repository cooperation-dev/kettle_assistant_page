import React, {Component} from 'react';
import {Row, Col, Form, Input, Button, Table, Modal, Select} from 'antd';

import {findJobs, 
    addJobModalShow, addJobModalSure, addJobModalCancel,
    updateJobModalShow, updateJobModalSure, updateJobModalCancel,
    deleteJob,
    displayLogShow, displayLogClose,
    changeModalName, changeModalType, changeModalDesc} from '../../redux/actions/job_manager';
import {connect} from 'react-redux';

import './JobManager.css';
import 'antd/dist/antd.css';

const {TextArea} = Input
const {Option} = Select

class JobManager extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectRows: [],
            jobId: '',
            jobName: '',
            jobDesc: '',
            jobType: '',
            jobState: '',
            creator: '',
        }
    }

    componentDidMount = () => {
        let job = {
            jobId: this.state.jobId,
            jobName: this.state.jobName,
            jobDesc: this.state.jobDesc,
            jobType: this.state.jobType,
            jobState: this.state.jobState,
            creator: this.state.creator,
        }
        this.props.findJobs(job)
    }

    search = () => {
        let job = {
            jobId: this.state.jobId,
            jobName: this.state.jobName,
            jobDesc: this.state.jobDesc,
            jobType: this.state.jobType,
            jobState: this.state.jobState,
            creator: this.state.creator,
        }
        this.props.findJobs(job)
    }

    reset = () => {
        this.setState({
            selectRows: [],
            jobId: '',
            jobName: '',
            jobDesc: '',
            jobType: '',
            jobState: '',
            creator: '',
        })

        let job = {
            jobId: '',
            jobName: '',
            jobDesc: '',
            jobType: '',
            jobState: '',
            creator: '',
        }
        this.props.findJobs(job)
    }
    
    changeJobId = (e) => {
        this.setState({
            jobId: e.target.value
        })
    }

    changeJobName = (e) => {
        this.setState({
            jobName: e.target.value
        })
    }

    changeJobDesc = (e) => {
        this.setState({
            jobDesc: e.target.value
        })
    }

    changeJobType = (e) => {
        this.setState({
            jobType: e.target.value
        })
    }
    
    changeJobState = (e) => {
        this.setState({
            jobState: e.target.value
        })
    }

    changeCreator = (e) => {
        this.setState({
            creator: e.target.value
        })
    }

    render(){
          
          const columns = [{
            title: '作业ID',
            dataIndex: 'jobId',
            key: 'jobId',
          }, {
            title: '作业名称',
            dataIndex: 'jobName',
            key: 'jobName',
          }, {
            title: '作业描述',
            dataIndex: 'jobDesc',
            key: 'jobDesc',
          },{
            title: '定时设置',
            dataIndex: 'cronSet',
            key: 'cronSet',
          },{
            title: '作业类别',
            dataIndex: 'jobType',
            key: 'jobType',
          },{
            title: '作业状态',
            dataIndex: 'jobState',
            key: 'jobState',
          },{
            title: '运行状态',
            dataIndex: 'runState',
            key: 'runState',
          },{
            title: '最后更新时间',
            dataIndex: 'modifyTime',
            key: 'modifyTime',
          },{
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator',
          },{
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
          }]; 

        const rowSelection = {
            type: 'checkbox',
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
                    <Form
                        className="ant-advanced-search-form"
                    >
                        <Row gutter={24}>
                            <Col span={8} key={1}>
                                <Form.Item label="作业ID ">
                                    <Input placeholder="作业ID" value={this.state.jobId} onChange={this.changeJobId}/>
                                </Form.Item>
                            </Col>
                            <Col span={8} key={2}>
                                <Form.Item label="作业名称">
                                    <Input placeholder="作业名称" value={this.state.jobName} onChange={this.changeJobName}/>
                                </Form.Item>
                            </Col>
                            <Col span={8} key={3}>
                                <Form.Item label="作业描述">
                                    <Input placeholder="作业描述" value={this.state.jobDesc} onChange={this.changeJobDesc}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8} key={4}>
                                <Form.Item label="作业类别">
                                    <Input placeholder="作业类别" value={this.state.jobType} onChange={this.changeJobType}/>
                                </Form.Item>
                            </Col>
                            <Col span={8} key={5}>
                                <Form.Item label="作业状态">
                                    <Input placeholder="作业状态" value={this.state.jobState} onChange={this.changeJobState}/>
                                </Form.Item>
                            </Col>
                            <Col span={8} key={6}>
                                <Form.Item label="创建人">
                                    <Input placeholder="创建人" value={this.state.creator} onChange={this.changeCreator}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row style={{marginTop:"15px"}}>
                    <Form className="ant-advanced-search-form" style={{marginBottom: "15px"}}>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.addJobModalShow()}>新增作业</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.updateJobModalShow(this.state.selectRows)}>修改作业</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.deleteJob(this.state.selectRows)}>删除作业</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.displayLogShow(this.state.selectRows)}>查看运行日志</Button>
                        <Button type="default" size="default" className="btn">导入</Button>
                        <Button type="default" size="default" className="btn">导出</Button>
                        <Table rowSelection={rowSelection} dataSource={this.props.jobManager.list} columns={columns} scroll={{x: 1200}}/>
                    </Form>
                </Row>
                <AddModal visible={this.props.jobManager.addVisible} onOk={(job) => this.props.addJobModalSure(job)} onCancel={() => this.props.addJobModalCancel()} jobTypes={this.props.jobManager.jobTypes} ></AddModal>
                <UpdateModal visible={this.props.jobManager.updateVisible} onOk={(job) => this.props.updateJobModalSure(job)} onCancel={() => this.props.updateJobModalCancel()} jobId={this.props.jobManager.modalJobId} jobName={this.props.jobManager.modalJobName} jobType={this.props.jobManager.modalJobType} jobDesc={this.props.jobManager.modalJobDesc} changeName={(e) => this.props.changeModalName(e)} changeType={(e) => this.props.changeModalType(e)} changeDesc={(e) => this.props.changeModalDesc(e)} jobTypes={this.props.jobManager.jobTypes}></UpdateModal>
                <LogModal visible={this.props.jobManager.logVisible} jobName={this.props.jobManager.modalJobName} log={this.props.jobManager.modalLog} onOk={() => this.props.displayLogClose()} onCancel={() => this.props.displayLogClose()}></LogModal>
            </div>
        )
    }
}

class AddModal extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            jobName: '',
            jobType: '',
            jobDesc: '',
        }
    }

    changeJobName = (e) => {
        this.setState({
            jobName: e.target.value
        })
    }

    changeJobType = (e) => {
        this.setState({
            jobType: e
        })
    }

    changeJobDesc = (e) => {
        this.setState({
            jobDesc: e.target.value
        })
    }

    render(){
        let job = {
            jobName: this.state.jobName,
            jobType: this.state.jobType,
            jobDesc: this.state.jobDesc,
        }
        return (
            <Modal
                title="新增作业"
                visible={this.props.visible}
                onOk={() => this.props.onOk(job)}
                onCancel={() => this.props.onCancel()}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true} 
            >
                <Form.Item label="作业名称">
                    <Input placeholder="作业名称" value={this.state.jobName} onChange={this.changeJobName}/>
                </Form.Item>
                <Form.Item label="作业类型">
                    <Select style={{width: 120}} onChange={this.changeJobType} value={this.state.jobType}>
                    {this.props.jobTypes.map(type => {
                        return (
                            <Option key={type.code} value={type.code}>{type.name}</Option>
                        )
                    })}
                    </Select>
                </Form.Item>
                <Form.Item label="作业描述">
                    <Input placeholder="作业描述" value={this.state.jobDesc} onChange={this.changeJobDesc}/>
                </Form.Item>
            </Modal>
        )
    }
}

class UpdateModal extends Component{

    constructor(props){
        super(props)

    }

    render(){                 
        let job = {
            jobId: this.props.jobId,
            jobName: this.props.jobName,
            jobType: this.props.jobType,
            jobDesc: this.props.jobDesc,
        }

        return (
            <Modal
                title="修改作业"
                visible={this.props.visible}
                onOk={() => this.props.onOk(job)}
                onCancel={() => this.props.onCancel()}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true} 
            >
                <Form.Item label="作业名称">
                    <Input placeholder="作业名称" onChange={(e) => this.props.changeName(e)} value={this.props.jobName}/>
                </Form.Item>
                <Form.Item label="作业类型">
                    <Select style={{width: 120}} onChange={(e) => this.props.changeType(e)} value={this.props.jobType} defaultValue={this.props.jobType}>
                        {this.props.jobTypes.map(type => {
                            return (
                                <Option key={type.code} value={type.code}>{type.name}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="作业描述">
                    <Input placeholder="作业描述" onChange={(e) => this.props.changeDesc(e)} value={this.props.jobDesc}/>
                </Form.Item>
            </Modal>
        )
    }
}

class LogModal extends Component{
    render(){
        return (
            <Modal
                title="运行日志"
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true} 
            >
                <Form.Item label="作业名称">
                    <Input disabled={true} placeholder="作业名称" onChange={(e) => this.changeJobName(e)} value={this.props.jobName}/>
                </Form.Item>
                <Form.Item label="日志">
                    <TextArea disabled={true} autosize={{minRows: 8, maxRows: 8}} placeholder="日志" onChange={(e) => this.changeJobDesc(e)} value={this.props.log}/>
                </Form.Item>
            </Modal>
        )
    }
}

export default connect((state) => ({
    jobManager: state.jobManager
}), {findJobs, 
    addJobModalShow, addJobModalSure, addJobModalCancel, 
    updateJobModalShow, updateJobModalSure, updateJobModalCancel,
    deleteJob,
    displayLogShow, displayLogClose,
    changeModalName, changeModalType, changeModalDesc})(JobManager)