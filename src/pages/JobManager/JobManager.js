import React, {Component} from 'react';
import {Row, Col, Form, Input, Button, Table, Modal} from 'antd';

import {findJobs, 
    addJobModalShow, addJobModalSure, addJobModalCancel,
    updateJobModalShow, updateJobModalSure, updateJobModalCancel} from '../../redux/actions/job_manager';
import {connect} from 'react-redux';

import './JobManager.css';
import 'antd/dist/antd.css';

class JobManager extends Component{
    constructor(props){
        super(props)

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
                        <Button type="default" size="default" className="btn" onClick={() => this.props.updateJobModalShow()}>修改作业</Button>
                        <Button type="default" size="default" className="btn">删除作业</Button>
                        <Button type="default" size="default" className="btn">查看运行日志</Button>
                        <Button type="default" size="default" className="btn">导入</Button>
                        <Button type="default" size="default" className="btn">导出</Button>
                        <Table dataSource={this.props.jobManager.list} columns={columns} />
                    </Form>
                </Row>
                <AddModal visible={this.props.jobManager.add_visible} onOk={() => this.props.addJobModalSure()} onCancel={() => this.props.addJobModalCancel()}></AddModal>
                <UpdateModal visible={this.props.jobManager.update_visible} onOk={() => this.props.updateJobModalSure()} onCancel={() => this.props.updateJobModalCancel()}></UpdateModal>
            </div>
        )
    }
}

class AddModal extends Component{
    render(){
        return (
            <Modal
                title="新增作业"
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
            >
                <Form.Item label="作业名称">
                    <Input placeholder="作业名称"/>
                </Form.Item>
                <Form.Item label="作业类型">
                    <Input placeholder="作业类型"/>
                </Form.Item>
                <Form.Item label="作业描述">
                    <Input placeholder="作业描述"/>
                </Form.Item>
            </Modal>
        )
    }
}

class UpdateModal extends Component{
    render(){
        return (
            <Modal
                title="修改作业"
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
            >
                <Form.Item label="作业名称">
                    <Input placeholder="作业名称"/>
                </Form.Item>
                <Form.Item label="作业类型">
                    <Input placeholder="作业类型"/>
                </Form.Item>
                <Form.Item label="作业描述">
                    <Input placeholder="作业描述"/>
                </Form.Item>
            </Modal>
        )
    }
}

export default connect((state) => ({
    jobManager: state.jobManager
}), {findJobs, 
    addJobModalShow, addJobModalSure, addJobModalCancel, 
    updateJobModalShow, updateJobModalSure, updateJobModalCancel})(JobManager)