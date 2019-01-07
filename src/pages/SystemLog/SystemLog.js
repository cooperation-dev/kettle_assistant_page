import React, {Component} from 'react';
import {Form, Table, Row, Col, Input, Button, Pagination} from 'antd';
import {findLogs} from '../../redux/actions/system_log';
import {connect} from 'react-redux';

import './SystemLog.css';

const columns = [{
        key: 'operator',
        title: '操作用户',
        dataIndex: 'operator'
    },{
        key: 'type',
        title: '日志类型',
        dataIndex: 'type'
    },{
        key: 'operateIp',
        title: '操作ip',
        dataIndex: 'operateIp'
    },{
        key: 'recordTime',
        title: '创建时间',
        dataIndex: 'recordTime'
    },{
        key: 'details',
        title: '详情',
        dataIndex: 'details'
    }
]

class SystemLog extends Component{
    constructor(props){
        super(props)

        this.state = {
            operator: '',
            type: '',
            operateIp: '',
            recordTime: '',
        }
    }

    componentDidMount = () => {
        let systemLogReqVO = {
            operator: this.state.operator,
            type: this.state.type,
            operateIp: this.state.operateIp,
            recordTime: this.state.recordTime,

        }
        let log = {
            pageSize: this.props.systemLog.pageSize,
            pageNo: this.props.systemLog.pageNo,
            data: systemLogReqVO
        }
        this.props.findLogs(systemLogReqVO)
    }

    change = (event, attributes) => {
        let newState = {};
        newState[attributes] = event.target.value;
        this.setState(newState);
    }

    findLog = () => {
        let systemLogReqVO = {
            operator: this.state.operator,
            type: this.state.type,
            operateIp: this.state.operateIp,
            recordTime: this.state.recordTime,

        }
        let log = {
            pageSize: this.props.systemLog.pageSize,
            pageNo: 1,
            data: systemLogReqVO
        }
        this.props.findLogs(systemLogReqVO)
    }

    reset = () => {
        this.setState({
            operator: '',
            type: '',
            operateIp: '',
            recordTime: '',
        })

        let data = {
            operator: '',
            type: '',
            operateIp: '',
            recordTime: '',
        }

        let log = {
            pageSize: this.props.systemLog.pageSize,
            pageNo: 1,
            data: data
        }
        this.props.findLogs(log)

    }
    
    changePagination = (page) => {
        let data = {
            operateUser: this.state.operateUser,
            logType: this.state.logType,
            operateIp: this.state.operateIp,
            details: this.state.details,
            createTime: this.state.createTime

        }
        let log = {
            pageSize: this.props.systemLog.pageSize,
            pageNo: page,
            data: data
        }
        this.props.findLogs(log)
    }

    render(){
        const pagination = {
            pageSize: this.props.systemLog.pageSize,
            total: this.props.systemLog.total,
            current: this.props.systemLog.pageNo,
            onChange:(page) => {
                this.changePagination(page)
            }
        }

        return (
            <div className="ant-advanced-search-form" style={{width:"98%", position:"relative", marginLeft:"auto", marginRight:"auto", marginBottom:"15px"}}>
                <Row>
                    <Form layout="vertical">
                        <Row gutter={24}>
                            <Col key={1} style={{float: "left", width: "20%"}}>
                                <Form.Item label="操作用户">
                                    <Input placeholder="请输入操作用户" value={this.state.operator} onChange={(e) => this.change(e, 'operator')}/>
                                </Form.Item>
                            </Col>
                            <Col key={2} style={{float: "left", width: "20%"}}>
                                <Form.Item label="日志类型">
                                    <Input placeholder="请输入日志类型" value={this.state.type} onChange={(e) => this.change(e, 'type')}/>
                                </Form.Item>
                            </Col>
                            <Col key={3} style={{float: "left", width: "20%"}}>
                                <Form.Item label="操作IP">
                                    <Input placeholder="请输入操作IP" value={this.state.operateIp} onChange={(e) => this.change(e, 'operateIp')}/>
                                </Form.Item>
                            </Col>
                            <Col key={4} style={{float: "left", width: "20%"}}>
                                <Form.Item label="记录时间">
                                    <Input placeholder="请输入记录时间" value={this.state.recordTime} onChange={(e) => this.change(e, 'recordTime')}/>
                                </Form.Item>
                            </Col>
                            <Col key={5} className="custom-sr-btn" style={{float: "left", width: "20%"}}>
                                <Button type="primary" htmlType="submit" onClick={this.findLog}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                        <Table rowKey={(record) => record.system_log_id} columns={columns} dataSource={this.props.systemLog.list}/>
                    </Form>
                </Row>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        systemLog: state.systemLog
    }), {findLogs}
)(SystemLog)