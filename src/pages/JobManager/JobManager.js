import React, {Component} from 'react';
import {Row, Col, Form, Input, Button, Table, Modal, Select} from 'antd';

import {findJobs, 
    addJobModalShow, addJobModalSure, addJobModalCancel,
    updateJobModalShow, updateJobModalSure, updateJobModalCancel,
    deleteJob,
    displayLogShow, displayLogClose,
    modalChangeJobName, modalChangeJobDesc} from '../../redux/actions/job_manager';
import {connect} from 'react-redux';

import './JobManager.css';
import 'antd/dist/antd.css';

const {TextArea} = Input
const {Option} = Select

class JobManager extends Component{
    constructor(props){
        super(props)

        this.state = {
            selectRows: []
        }
    }

    componentDidMount = () => {
        this.props.findJobs()
    }
    
    render(){
          
          const columns = [{
            title: '作业ID',
            dataIndex: 'job_id',
            key: 'job_id',
          }, {
            title: '作业名称',
            dataIndex: 'job_name',
            key: 'job_name',
          }, {
            title: '作业描述',
            dataIndex: 'job_desc',
            key: 'job_desc',
          },{
            title: '定时设置',
            dataIndex: 'cron_set',
            key: 'cron_set',
          },{
            title: '作业类别',
            dataIndex: 'job_type',
            key: 'job_type',
          },{
            title: '作业状态',
            dataIndex: 'job_state',
            key: 'job_state',
          },{
            title: '运行状态',
            dataIndex: 'run_state',
            key: 'run_state',
          },{
            title: '最后更新时间',
            dataIndex: 'modify_time',
            key: 'modify_time',
          },{
            title: '创建人',
            dataIndex: 'creator',
            key: 'creator',
          },{
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
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
                                    <Input placeholder="作业ID"/>
                                </Form.Item>
                            </Col>
                            <Col span={8} key={2}>
                                <Form.Item label="作业名称">
                                    <Input placeholder="作业名称"/>
                                </Form.Item>
                            </Col>
                            <Col span={8} key={3}>
                                <Form.Item label="作业描述">
                                    <Input placeholder="作业描述"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8} key={4}>
                                <Form.Item label="作业类别">
                                    <Input placeholder="作业类别"/>
                                </Form.Item>
                            </Col>
                            <Col span={8} key={5}>
                                <Form.Item label="作业状态">
                                    <Input placeholder="作业状态"/>
                                </Form.Item>
                            </Col>
                            <Col span={8} key={6}>
                                <Form.Item label="创建人">
                                    <Input placeholder="创建人"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Button type="primary" htmlType="submit" onClick={() => this.props.findJobs()}>查询</Button>
                                <Button style={{ marginLeft: 8 }} >重置</Button>
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
                <AddModal visible={this.props.jobManager.add_visible} onOk={(job_name, job_desc) => this.props.addJobModalSure(job_name, job_desc)} onCancel={() => this.props.addJobModalCancel()} job_types={this.props.jobManager.job_types} ></AddModal>
                <UpdateModal visible={this.props.jobManager.update_visible} onOk={() => this.props.updateJobModalSure()} onCancel={() => this.props.updateJobModalCancel()} value={this.props.jobManager.job}></UpdateModal>
                <LogModal visible={this.props.jobManager.log_visible} value={this.props.jobManager.job} onOk={() => this.props.displayLogClose()} onCancel={() => this.props.displayLogClose()}></LogModal>
            </div>
        )
    }
}

class AddModal extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            job_name: '',
            job_desc: ''
        }
    }

    changeJobName = (e) => {
        this.setState({
            job_name: e.target.value
        })
    }

    changeJobDesc = (e) => {
        this.setState({
            job_desc: e.target.value
        })
    }

    render(){
        return (
            <Modal
                title="新增作业"
                visible={this.props.visible}
                onOk={() => this.props.onOk(this.state.job_name, this.state.job_desc)}
                onCancel={() => this.props.onCancel()}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true} 
            >
                <Form.Item label="作业名称">
                    <Input placeholder="作业名称" value={this.state.job_name} onChange={this.changeJobName}/>
                    {/* <Input placeholder="作业名称" value={this.props.value.job_name} onChange={this.props.changeJobName}/> */}
                </Form.Item>
                <Form.Item label="作业类型">
                    <Select style={{width: 120}}>
                    {this.props.job_types.map(type => {
                        return (
                            <Option key={type.code} value={type.code}>{type.name}</Option>
                        )
                    })}
                    </Select>
                </Form.Item>
                <Form.Item label="作业描述">
                    <Input placeholder="作业描述" value={this.state.job_desc} onChange={this.changeJobDesc}/>
                    {/* <Input placeholder="作业描述" value={this.props.value.job_desc} onChange={() => this.props.changeJobName()}/> */}
                </Form.Item>
            </Modal>
        )
    }
}

class UpdateModal extends Component{

    constructor(props){
        super(props)

        this.state = {
            job_name: '',
            job_type: '',
            job_desc: ''
        }

    }

    changeJobName = (e) => {
        this.setState({
            job_name: e.target.value
        })
    }

    changeJobType = (e) => {
        this.setState({
            job_type: e.target.value
        })
    }

    changeJobDesc = (e) => {
        this.setState({
            job_desc: e.target.value
        })
    }

    render(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        return (
            <Modal
                title="修改作业"
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true} 
            >
                <Form.Item label="作业名称">
                    <Input placeholder="作业名称" onChange={() => this.changeJobName()} value={this.props.value.job_name}/>
                </Form.Item>
                <Form.Item label="作业类型">
                    <Input placeholder="作业类型" onChange={(e) => this.changeJobType(e)} value={this.props.value.job_type}/>
                </Form.Item>
                <Form.Item label="作业描述">
                    <Input placeholder="作业描述" onChange={(e) => this.changeJobDesc(e)} value={this.props.value.job_desc}/>
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
                    <Input disabled={true} placeholder="作业名称" onChange={(e) => this.changeJobName(e)} value={this.props.value.job_name}/>
                </Form.Item>
                <Form.Item label="日志">
                    <TextArea disabled={true} autosize={{minRows: 8, maxRows: 8}} placeholder="日志" onChange={(e) => this.changeJobDesc(e)} value={this.props.value.log}/>
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
    modalChangeJobName, modalChangeJobDesc})(JobManager)