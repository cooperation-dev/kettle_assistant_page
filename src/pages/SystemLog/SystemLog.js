import React, {Component} from 'react';
import {Form, Table, Row, Col, Input, Button, Pagination} from 'antd';
import {findLogs} from '../../redux/actions/system_log';
import {connect} from 'react-redux';

const columns = [{
        key: 'operateUser',
        title: '操作用户',
        dataIndex: 'operateUser'
    },{
        key: 'logType',
        title: '日志类型',
        dataIndex: 'logType'
    },{
        key: 'operateIp',
        title: '操作ip',
        dataIndex: 'operateIp'
    },{
        key: 'createTime',
        title: '创建时间',
        dataIndex: 'createTime'
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
            operateUser: '',
            logType: '',
            operateIp: '',
            details: '',
            createTime: ''
        }
    }

    componentDidMount = () => {
        let data = {
            operateUser: this.state.operateUser,
            logType: this.state.logType,
            operateIp: this.state.operateIp,
            details: this.state.details,
            createTime: this.state.createTime

        }
        let log = {
            pageSize: this.props.systemLog.pageSize,
            pageNo: this.props.systemLog.pageNo,
            data: data
        }
        this.props.findLogs(log)
    }

    changeoperateUser = (e) => {
        this.setState({
            operateUser: e.target.value
        })
    }

    changeLogType = (e) => {
        this.setState({
            logType: e.target.value
        })
    }

    changeOperateIP = (e) => {
        this.setState({
            operateIp: e.target.value
        })
    }

    changeDetails = (e) => {
        this.setState({
            details: e.target.value
        })
    }

    changeCreateTime = (e) => {
        this.setState({
            createTime: e.target.value
        })
    }

    findLog = () => {
        let data = {
            operateUser: this.state.operateUser,
            logType: this.state.logType,
            operateIp: this.state.operateIp,
            details: this.state.details,
            createTime: this.state.createTime

        }
        let log = {
            pageSize: this.props.systemLog.pageSize,
            pageNo: 1,
            data: data
        }
        this.props.findLogs(log)
    }

    reset = () => {
        this.setState({
            operateUser: '',
            logType: '',
            operateIp: '',
            details: '',
            createTime: '',
        })

        let data = {
            operateUser: '',
            logType: '',
            operateIp: '',
            details: '',
            createTime: '',
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
                            <Col span={5} key={1}>
                                <Form.Item label="操作用户">
                                    <Input placeholder="请输入操作用户" onChange={this.changeoperateUser} value={this.state.operateUser}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} key={2}>
                                <Form.Item label="日志类型">
                                    <Input placeholder="请输入日志类型" onChange={this.changeLogType} value={this.state.logType}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} key={3}>
                                <Form.Item label="操作IP">
                                    <Input placeholder="请输入操作IP" onChange={this.changeOperateIP} value={this.state.operateIp}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} key={3}>
                                <Form.Item label="记录时间">
                                    <Input placeholder="请输入记录时间" onChange={this.changeOperateIP} value={this.state.operateIp}/>
                                </Form.Item>
                            </Col>
                            <Col span={4} key={5} className="custom-sr-btn">
                                <Button type="primary" htmlType="submit" onClick={this.findLog}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                        <Table rowKey={(record) => record.id} columns={columns} dataSource={this.props.systemLog.list} pagination={pagination}/>
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