import React, {Component} from 'react';
import {Row, Col, Form, Input, Button, Table, Modal, Select, Icon} from 'antd';

import {findJobs} from '../../redux/actions/job_manager';
import {connect} from 'react-redux';

import './Product.css';

class Product extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: '',
            platform: '',
            type: '',
            timing: '',
        }
    }

    componentDidMount = () => {
        let reptile = {
            name: this.state.name,
            platform: this.state.platform,
            type: this.state.type,
            timing: this.state.timing,
        }
        this.props.findJobs(reptile)
    }

    search = () => {
        let reptile = {
            name: this.state.name,
            platform: this.state.platform,
            type: this.state.type,
            timing: this.state.timing,
        }
        this.props.findJobs(reptile)
    }

    reset = () => {
        this.setState({
            name: '',
            platform: '',
            type: '',
            timing: '',
        })

        let reptile = {
            name: '',
            platform: '',
            type: '',
            timing: '',
        }
        this.props.findJobs(reptile)
    }
    
    change = (event, attributes) => {
        let newState = {};
        newState[attributes] = event.target.value;
        this.setState(newState);
    }

    render(){
          
          const columns = [{
            title: '名称',
            dataIndex: 'name',
            key: 'name',
          }, {
            title: '平台',
            dataIndex: 'description',
            key: 'description',
          },{
            title: '类别',
            dataIndex: 'cronSet',
            key: 'cronSet',
          },{
            title: '价格',
            dataIndex: 'jobType',
            key: 'jobType',
          },{
            title: '网页链接',
            dataIndex: 'state',
            key: 'state',
          },{
            title: '最新时间',
            dataIndex: 'runState',
            key: 'runState',
          }]; 

        return (

            <div className="ant-advanced-search-form" style={{width:"98%", position:"relative", marginLeft:"auto", marginRight:"auto", marginBottom:"15px"}}>
                <Row>
                    <Form layout="vertical">
                        <Row gutter={24}>
                            <Col span={5} key={1}>
                                <Form.Item label="产品 ">
                                    <Input placeholder="请输入产品" value={this.state.id} onChange={(e) => this.change(e, 'id')}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} key={3}>
                                <Form.Item label="平台">
                                    <Input placeholder="请选择平台" value={this.state.description} onChange={(e) => this.change(e, 'description')}/>
                                </Form.Item>
                            </Col>
                            <Col span={4} key={5} className="custom-sr-btn">
                                <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                        <Table rowKey={(record) => {return record.id}} dataSource={this.props.jobManager.list} columns={columns}/>
                    </Form>
                </Row>
            </div>
        )
    }
}

export default connect((state) => ({
    jobManager: state.jobManager
}), {findJobs})(Product)