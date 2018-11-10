import React, {Component} from 'react';
import {Table, Row, Col, Input, Form, Button, Checkbox, Modal, Select} from 'antd';
import {connect} from 'react-redux';
import {showList, changeDisabled,
        addModalShow, addModalSure, addModalCancel,
        deleteDicByIds,
        findDicTypes} from '../../redux/actions/sum_dic';

import './SumDic.css';

const {Column} = Table
const {Option} = Select

class SumDic extends Component{
    constructor(props){
        super(props)

        this.state = {
            dic_code: '',
            dic_name: '',
            disabled: false,
            dic_type: '',
            selectRows: []
        }

    }

    componentDidMount = () => {
        let dic = {
            dic_code: this.state.dic_code,
            dic_name: this.state.dic_name,
            disabled: this.state.disabled,
            dic_type: this.state.dic_type,
        }
        this.props.showList(dic)
    }

    changeDicCode = (e) => {
        this.setState({
            dic_code: e.target.value
        })
    }

    changeDicName = (e) => {
        this.setState({
            dic_name: e.target.value
        })
    }

    changeDicType = (e) => {
        this.setState({
            dic_type: e.target.value
        })
    }

    changeDisabled = () => {
        this.setState({
            disabled: !this.state.input_disabled
        })
    }

    search = () => {
        let dic = {
            dic_code: this.state.dic_code,
            dic_name: this.state.dic_name,
            disabled: this.state.disabled,
            dic_type: this.state.dic_type,
        }
        this.props.showList(dic)
    }

    reset = () => {
        this.setState({
            selectRows: [],
            dic_code: '',
            dic_name: '',
            disabled: '',
            dic_type: '',
        })

        let dic = {
            dic_code: '',
            dic_name: '',
            disabled: '',
            dic_type: '',
        }
        this.props.showList(dic)
    }

    render(){
       
        const rowSelection = {
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
                            <Col span={6} key={1}>
                                <Form.Item label="代码">
                                    <Input placeholder="代码" onChange={this.changeDicCode} value={this.state.dic_code}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={2}>
                                <Form.Item label="名称">
                                    <Input placeholder="名称" onChange={this.changeDicName} value={this.state.dic_name}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={3}>
                                <Form.Item label="是否禁用">
                                    <Checkbox checked={this.state.input_disabled?true:false} onClick={this.changeDisabled}></Checkbox>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={4}>
                                <Form.Item label="字典类别">
                                    <Input placeholder="字典类别" onChange={this.changeDicType} value={this.state.dic_type}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row style={{marginTop:"15px"}}>
                    <Form className="ant-advanced-search-form" style={{marginBottom: "15px"}}>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.addModalShow()}>新增</Button>
                        <Button type="default" size="default" className="btn">修改</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.deleteDicByIds(this.state.selectRows)}>删除</Button>
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
                <AddModal visible={this.props.sumDic.add_visible} onOk={(dic) => this.props.addModalSure(dic)} onCancel={() => this.props.addModalCancel()} dic_types={this.props.sumDic.dic_types}></AddModal>
            </div>
        )
    }

}

class AddModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            dic_name: '',
            dic_code: '',
            dic_type: '',
            belongs: '',
        }
    }

    changeDicName = (e) => {
        this.setState({
            dic_name: e.target.value
        })
    }

    changeDicCode = (e) => {
        this.setState({
            dic_code: e.target.value
        })
    }

    changeDicType = (e) => {
        this.setState({
            dic_type: e.target.value
        })
    }

    changeBelongs = (e) => {
        this.setState({
            belongs: e.target.value
        })
    }

    render(){
        let dic = {
            dic_name: this.state.dic_name,
            dic_code: this.state.dic_code,
            dic_type: this.state.dic_type,
            belongs: this.state.belongs,
        }

        return (
            <Modal
                title="新增字典"
                visible={this.props.visible}
                okText="确认"
                onOk={() => this.props.onOk(dic)}
                onCancel={() => this.props.onCancel()}
                cancelText="取消"
                destroyOnClose={true} 
            >
                <Form.Item label="字典名称">
                    <Input placeholder="字典名称" value={this.state.dic_name} onChange={this.changeDicName}/>
                </Form.Item>
                <Form.Item label="字典代码">
                    <Input placeholder="字典代码" value={this.state.dic_code} onChange={this.changeDicCode}/>
                </Form.Item>
                <Form.Item label="字典类别">
                    <Select style={{width: 120}}>
                    {this.props.dic_types.map(type => {
                        return (
                            <Option key={type.code} value={type.code}>{type.name}</Option>
                        )
                    })}
                    </Select>
                </Form.Item>
                <Form.Item label="所属对象">
                    <Input placeholder="所属对象" value={this.state.belongs} onChange={this.changeBelongs}/>
                </Form.Item>
            </Modal>
        )
    }
}

export default connect((state)=> ({
    sumDic: state.sumDic
}), {showList, changeDisabled,
        addModalShow, addModalSure, addModalCancel,
        deleteDicByIds,
        findDicTypes})(SumDic)