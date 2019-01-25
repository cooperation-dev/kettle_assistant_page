import React, {Component} from 'react';
import {Row, Col, Form, Input, Button, Table, Select, TreeSelect, Tooltip} from 'antd';


import {findProducts} from '../../redux/actions/product';
import {connect} from 'react-redux';

import './ProjectManager.css';

const {Option} = Select

const columns = [{
    title: '产品',
    dataIndex: 'name',
    key: 'name',
    render: text => {
        let max_length = 20
        if(text.length > max_length) {
            return <Tooltip title={text}>
                        <span>{text.substring(0, max_length)}...</span>
                    </Tooltip>
        }
        return <span>{text}</span>
    }
}, {
    title: '平台',
    dataIndex: 'platform',
    key: 'platform',
},{
    title: '类别',
    dataIndex: 'type',
    key: 'type',
},{
    title: '价格',
    dataIndex: 'price',
    key: 'price',
},{
    title: '网页链接',
    dataIndex: 'url',
    key: 'url',
    render: text => {
        let max_length = 60
        if(text.length > max_length) {
            return <Tooltip title={text}>
                        <span>{text.substring(0, max_length)}...</span>
                    </Tooltip>
        }
        return <span>{text}</span>
    }
},{
    title: '最新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
}]; 

class Product extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: '',
            platform: undefined,
            type: ''
        }
    }

    componentDidMount = () => {
        this.search();
    }

    search = () => {
        let productVO = {
            name: this.state.name,
            platform: this.state.platform==undefined?'':this.state.platform,
            type: this.state.type,
            pageSize: this.props.product.pageSize,
            pageNo: 1,
        }
        this.props.findProducts(productVO)
    }

    reset = () => {
        this.setState({
            name: '',
            platform: undefined,
            type: '',
        })

        let productVO = {
            name: '',
            platform: '',
            type: this.state.type,
            pageSize: this.props.product.pageSize,
            pageNo: 1,
        }
        this.props.findProducts(productVO)
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
        let productVO = {
            name: this.state.name,
            platform: this.state.platform==undefined?'':this.state.platform,
            type: this.state.type,
            pageSize: this.props.product.pageSize,
            pageNo: page,
        }
        this.props.findProducts(productVO)
    }
    render(){
        const pagination = {
            pageSize: this.props.product.pageSize,
            total: this.props.product.total,
            current: this.props.product.pageNo,
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
                                <Form.Item label="产品 ">
                                    <Input placeholder="请输入产品" value={this.state.name} onChange={(e) => this.change(e, 'name')}/>
                                </Form.Item>
                            </Col>
                            <Col key={2} style={{float: "left", width: "20%"}}>
                                <Form.Item label="平台">
                                    <Select
                                        showSearch
                                        placeholder="请选择平台"
                                        notFoundContent="未匹配"
                                        // optionFilterProp="children"
                                        value={this.state.platform}
                                        onChange={(value) => this.changeValue(value, 'platform')}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                        <Option value="0">淘宝</Option>
                                        <Option value="1">天猫</Option>
                                        <Option value="2">京东</Option>
                                        <Option value="3">亚马逊</Option>
                                        <Option value="4">苏宁易购</Option>
                                        <Option value="5">唯品会</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col key={3} style={{float: "left", width: "20%"}}>
                                <Form.Item label="种类">
                                    <TreeSelect
                                        showSearch
                                        style={{ width: '100%' }}
                                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                        placeholder='种类'
                                        allowClear
                                        treeDefaultExpandAll
                                        treeNodeFilterProp='title'
                                        onChange={(value) => this.changeValue(value, 'type')}>
                                            <TreeSelect.TreeNode value="2" title="电子产品" key="1">
                                                <TreeSelect.TreeNode value="1" title="电脑" key="2" />
                                                <TreeSelect.TreeNode value="0" title="手机" key="3" />
                                            </TreeSelect.TreeNode>
                                    </TreeSelect>
                                </Form.Item>
                            </Col>
                            <Col key={4} className="custom-sr-btn" style={{float: "left", width: "20%"}}>
                                <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                        <Table rowKey={(record) => {return record.productId}} dataSource={this.props.product.list} columns={columns} pagination={pagination} />
                    </Form>
                </Row>
            </div>
        )
    }
}

export default connect((state) => ({
    product: state.product
}), {findProducts})(Product)