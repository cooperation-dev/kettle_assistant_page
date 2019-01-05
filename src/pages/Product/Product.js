import React, {Component} from 'react';
import {Row, Col, Form, Input, Button, Table, AutoComplete} from 'antd';

import {findProducts} from '../../redux/actions/product';
import {connect} from 'react-redux';

import './Product.css';

class Product extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: '',
            platform: '',
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
            platform: '',
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
        const platformData = ['京东','天猫','淘宝']
        return (

            <div className="ant-advanced-search-form" style={{width:"98%", position:"relative", marginLeft:"auto", marginRight:"auto", marginBottom:"15px"}}>
                <Row>
                    <Form layout="vertical">
                        <Row gutter={24}>
                            <Col span={5} key={1}>
                                <Form.Item label="产品 ">
                                    <Input placeholder="请输入产品" value={this.state.name} onChange={(e) => this.change(e, 'name')}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} key={3}>
                                <Form.Item label="平台">
                                    <AutoComplete
                                        value={this.state.platform}
                                        dataSource={platformData}
                                        placeholder="请选择平台"
                                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                        onChange={(value) => this.changeValue(value, 'platform')}
                                        />
                                </Form.Item>
                            </Col>
                            <Col span={4} key={5} className="custom-sr-btn">
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