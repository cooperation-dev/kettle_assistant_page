import React, {Component} from 'react';
import {Table, Row, Col, Input, Form, Button, Checkbox} from 'antd';
import {connect} from 'react-redux';
import {showList, changeDisabled} from '../../redux/actions/sum_dic';

import './SumDic.css';

const {Column} = Table

class SumDic extends Component{
    constructor(props){
        super(props)

        this.state = {
            input_dic_code: '',
            input_dic_name: '',
            input_disabled: false,
            input_dic_type: ''
        }

    }

    componentDidMount = () => {
        this.props.showList(this.state.input_dic_code, this.state.input_dic_name, this.state.input_dic_type)
    }

    changeDicCode = (e) => {
        this.setState({
            input_dic_code: e.target.value
        })
    }

    changeDicName = (e) => {
        this.setState({
            input_dic_name: e.target.value
        })
    }

    changeDicType = (e) => {
        this.setState({
            input_dic_type: e.target.value
        })
    }

    changeDisabled = () => {
        this.setState({
            input_disabled: !this.state.input_disabled
        })
    }

    search = () => {
        this.props.showList(this.state.input_dic_code, this.state.input_dic_name, this.state.input_dic_type)
    }

    render(){
       
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
                            <Col span={6} key={1}>
                                <Form.Item label="代码">
                                    <Input placeholder="代码" onChange={this.changeDicCode} value={this.state.input_dic_code}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={2}>
                                <Form.Item label="名称">
                                    <Input placeholder="名称" onChange={this.changeDicName} value={this.state.input_dic_name}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={3}>
                                <Form.Item label="是否禁用">
                                    <Checkbox checked={this.state.input_disabled?true:false} onClick={this.changeDisabled}></Checkbox>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={4}>
                                <Form.Item label="字典类别">
                                    <Input placeholder="字典类别" onChange={this.changeDicType} value={this.state.input_dic_type}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>
                                <Button style={{ marginLeft: 8 }} >重置</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row style={{marginTop:"15px"}}>
                    <Form className="ant-advanced-search-form" style={{marginBottom: "15px"}}>
                        <Button type="default" size="default" className="btn">新增</Button>
                        <Button type="default" size="default" className="btn">修改</Button>
                        <Button type="default" size="default" className="btn">删除</Button>
                        <Button type="default" size="default" className="btn">查看</Button>
                        <Button type="default" size="default" className="btn">导入</Button>
                        <Table rowSelection={rowSelection} dataSource={this.props.sumDic.list} >
                        <Column 
                            dataIndex = 'index'
                            key ='index'
                        />
                        <Column 
                            title = '代码'
                            dataIndex = 'dic_code'
                            key = 'dic_code'
                        />
                        <Column 
                            title = '名称'
                            dataIndex = 'dic_name'
                            key = 'dic_name'
                        />
                        <Column 
                            title = '排序'
                            dataIndex = 'sort'
                            key = 'sort'
                        />
                        <Column 
                            title = '创建时间'
                            dataIndex = 'create_time'
                            key = 'create_time'
                        />
                        <Column 
                            title = '修改时间'
                            dataIndex = 'modify_time'
                            key = 'modify_time'
                        />
                        <Column 
                            title = '创建人'
                            dataIndex = 'creator'
                            key = 'creator'
                        />
                        <Column 
                            title = '是否禁用'
                            dataIndex = 'is_disabled'
                            key = 'is_disabled'
                            render = {(text, record) => (
                                <Checkbox checked={record.is_disabled?true:false} onClick={() => this.props.changeDisabled(record)}></Checkbox>
                            )}
                        />
                        <Column 
                            title = '字典类别'
                            dataIndex = 'dic_type'
                            key = 'dic_type'
                        />
                        <Column 
                            title = '所属对象'
                            dataIndex = 'belongs'
                            key = 'belong'
                        />
                        </Table>
                    </Form>
                </Row>
            </div>
        )
    }

}

export default connect((state)=> ({
    sumDic: state.sumDic
}), {showList, changeDisabled})(SumDic)