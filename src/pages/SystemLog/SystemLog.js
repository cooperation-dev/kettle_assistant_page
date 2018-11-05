import React, {Component} from 'react';
import {Table, Row, Col, Input, Form, Button} from 'antd';
import {findLogs} from '../../redux/actions/system_log';
import {connect} from 'react-redux';

const columns = [
    {
        key: 'id',
        title: 'id',
        dataIndex: 'id'
    },{
        key: 'operator',
        title: '操作用户',
        dataIndex: 'operator'
    },{
        key: 'log_type',
        title: '日志类型',
        dataIndex: 'log_type'
    },{
        key: 'operate_ip',
        title: '操作ip',
        dataIndex: 'operate_ip'
    },{
        key: 'details',
        title: '详情',
        dataIndex: 'details'
    },{
        key: 'create_time',
        title: '创建时间',
        dataIndex: 'create_time'
    },
]

class SystemLog extends Component{
    constructor(props){
        super(props)

        this.state = {
            operator: '',
            log_type: '',
            operate_ip: '',
            details: '',
            create_time: ''
        }
    }

    componentDidMount = () => {
        this.props.findLogs(this.state.operator, this.state.log_type, this.state.operate_ip, this.state.details, this.state.create_time)
    }

    changeOperator = (e) => {
        this.setState({
            operator: e.target.value
        })
    }

    changeLogType = (e) => {
        this.setState({
            log_type: e.target.value
        })
    }

    changeOperateIP = (e) => {
        this.setState({
            operate_ip: e.target.value
        })
    }

    changeDetails = (e) => {
        this.setState({
            details: e.target.value
        })
    }

    changeCreateTime = (e) => {
        this.setState({
            create_time: e.target.value
        })
    }

    render(){
        return (
            <div style={{width:"98%", position:"relative", marginLeft:"auto", marginRight:"auto"}}>
                <Row>
                    <Form
                        className="ant-advanced-search-form"
                    >
                        <Row gutter={24}>
                            <Col span={8} key={1}>
                                <Form.Item label="操作用户">
                                    <Input placeholder="操作用户" onChange={this.changeOperator} value={this.state.operator}/>
                                </Form.Item>
                            </Col>
                            <Col span={8} key={2}>
                                <Form.Item label="日志类型">
                                    <Input placeholder="日志类型" onChange={this.changeLogType} value={this.state.log_type}/>
                                </Form.Item>
                            </Col>
                            <Col span={8} key={3}>
                                <Form.Item label="操作IP">
                                    <Input placeholder="操作IP" onChange={this.changeOperateIP} value={this.state.operate_ip}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8} key={4}>
                                <Form.Item label="详&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;情">
                                    <Input placeholder="详情" onChange={this.changeDetails} value={this.state.details}/>
                                </Form.Item>
                            </Col>
                            <Col span={8} key={5}>
                                <Form.Item label="创建时间">
                                    <Input placeholder="创建时间" onChange={this.changeCreateTime} value={this.state.create_time}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Button type="primary" htmlType="submit" onClick={() => this.props.findLogs(this.state.operator, this.state.log_type, this.state.operate_ip, this.state.details, this.state.create_time)}>查询</Button>
                                <Button style={{ marginLeft: 8 }} >重置</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row style={{marginTop:"15px"}}>
                    <Form className="ant-advanced-search-form" style={{marginBottom: "15px"}}>
                        <Table columns={columns} dataSource={this.props.systemLog.list} />
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