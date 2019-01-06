import React, {Component} from 'react';
import {Row, Col, Form, Input, Button, Table, Select} from 'antd';

import {findProducts} from '../../redux/actions/product';
import {connect} from 'react-redux';

import './Product.css';

const {Option} = Select

class Product extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: '',
            platform: undefined,
        }
    }

    componentDidMount = () => {
        let reptile = {
            name: this.state.name,
            platform: this.state.platform,
        }
        this.props.findProducts(reptile)
    }

    search = () => {
        let reptile = {
            name: this.state.name,
            platform: this.state.platform,
        }
        this.props.findProducts(reptile)
    }

    reset = () => {
        this.setState({
            name: '',
            platform: undefined,
        })

        let reptile = {
            name: '',
            platform: '',
        }
        this.props.findProducts(reptile)
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
            dataIndex: 'productId',
            key: 'productId',
        },{
            title: '产品',
            dataIndex: 'name',
            key: 'name',
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
        },{
            title: '最新时间',
            dataIndex: 'updateTime',
            key: 'updateTime',
        }]; 
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
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="京东">京东</Option>
                                        <Option value="淘宝">淘宝</Option>
                                        <Option value="天猫">天猫</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col key={3} className="custom-sr-btn" style={{float: "left", width: "20%"}}>
                                <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                        <Table rowKey={(record) => {return record.productId}} dataSource={this.props.product.list} columns={columns}/>
                    </Form>
                </Row>
            </div>
        )
    }
}

export default connect((state) => ({
    product: state.product
}), {findProducts})(Product)