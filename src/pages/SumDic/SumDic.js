import React, {Component} from 'react';
import {Table, Row, Col, Input, Form, Button, Checkbox, Modal, Select, Switch} from 'antd';
import {connect} from 'react-redux';
import {showList,
        addModalShow, addModalSure, addModalCancel} from '../../redux/actions/sum_dic';

import axios from 'axios';

import './SumDic.css';

const {Column} = Table
const {Option} = Select

class SumDic extends Component{
    constructor(props){
        super(props)

        this.state = {
            code: '',
            name: '',
            valid: 'Y',
            dicType: '',
            selectRows: [],
        }
    }
    
    componentDidMount = () => {
        this.search()
    }

    changeDicName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    changeDicCode = (e) => {
        this.setState({
            code: e.target.value
        })
    }
    
    changeValid = (e) => {
        this.setState({
            valid: this.state.valid=='Y'?'N':'Y'
        })
    }
    
    changeDicType = (e) => {
        this.setState({
            dicType: e.target.value
        })
    }

    search = () => {
        let dic = {
            code: this.state.code,
            name: this.state.name,
            valid: this.state.valid,
            dicType: this.state.dicType,
        }

        this.props.showList(dic)
    }

    reset = () => {
        let dic = {
            code: '',
            name: '',
            valid: '',
            dicType: '',
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
                                    <Input placeholder="代码" onChange={this.changeDicCode} value={this.state.code}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={2}>
                                <Form.Item label="名称">
                                    <Input placeholder="名称" onChange={this.changeDicName} value={this.state.name}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={3}>
                                <Form.Item label="是否禁用">
                                    <Checkbox checked={this.state.valid=='N'?true:false} onClick={this.changeValid}></Checkbox>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={4}>
                                <Form.Item label="字典类别">
                                    <Input placeholder="字典类别" onChange={this.changeDicType} value={this.state.dicType}/>
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
                        <Button type="default" size="default" className="btn" onClick={()=>this.props.addModalShow()}>新增</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.updateModalShow(this.state.selectRows)}>修改</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.deleteDicByIds(this.state.selectRows)}>删除</Button>
                        <Button type="default" size="default" className="btn">导入</Button>
                        <Table rowKey={(record) => record.id} rowSelection={rowSelection} dataSource={this.props.sumDic.list} >
                        <Column 
                            title = '排序'
                            dataIndex = 'sort'
                            key = 'sort'
                        />
                        <Column 
                            title = '代码'
                            dataIndex = 'code'
                            key = 'code'
                        />
                        <Column 
                            title = '名称'
                            dataIndex = 'name'
                            key = 'name'
                        />
                        <Column 
                            title = '创建时间'
                            dataIndex = 'createTime'
                            key = 'createTime'
                        />
                        <Column 
                            title = '修改时间'
                            dataIndex = 'modifyTime'
                            key = 'modifyTime'
                        />
                        <Column 
                            title = '创建人'
                            dataIndex = 'creator'
                            key = 'creator'
                        />
                        <Column 
                            title = '是否禁用'
                            dataIndex = 'valid'
                            key = 'valid'
                            render = {(text, record) => (
                                <Checkbox checked={record.valid=='Y'?false:true} onClick={() => this.props.changeDisabled(record)}></Checkbox>
                            )}
                        />
                        <Column 
                            title = '字典类别'
                            dataIndex = 'dicType'
                            key = 'dicType'
                        />
                        <Column 
                            title = '所属对象'
                            dataIndex = 'belongs'
                            key = 'belong'
                        />
                        </Table>
                    </Form>
                </Row>
                <AddModal visible={this.props.sumDic.addModalVisible} ok={()=>this.props.addModalSure()} cancel={()=>this.props.addModalCancel()}></AddModal>
                <UpdateModal></UpdateModal>
            </div>
        )
    }

}

class AddModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: '',
            code: '',
            rootDicTypes: [],
            dicTypes: [],
            visible: false,
            dicTypeSwitch: false,
            belongsSwitch: false,
        }
    }

    componentDidMount = () => {
        this.findDicTypes()
    }

    findDicTypes = () => {
        axios({
            method: 'post',
            url: '/api/sumDicController/findDicTypes'
        }).then((r) => {
            return r.data
        }).then((list) => {
            this.setState({
                dicTypes: list
            })
        })
    }

    changeDicTypeSwitch = () => {
        this.setState({
            dicTypeSwitch: !this.state.dicTypeSwitch
        })
    }

    changeBelongsSwitch = () => {
        this.setState({
            belongsSwitch: !this.state.belongsSwitch
        })
    }

    render(){

        return (
            <Modal
                title="新增字典"
                visible={this.props.visible}
                onOk={()=>this.props.ok()}
                onCancel={()=>this.props.cancel()}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true} 
            >
                <Form.Item label="字典名称">
                    <Input placeholder="字典名称" />
                </Form.Item>
                <Form.Item label="字典代码">
                    <Input placeholder="字典代码" />
                </Form.Item>
                <Form.Item label="字典类别">
                    <Col span={4}>
                        <Switch checked={this.state.dicTypeSwitch} onChange={this.changeDicTypeSwitch}></Switch>    
                    </Col>
                    <Col span={20}>
                        <Input style={{width: 120, display: `${this.state.dicTypeSwitch?'none':'block'}`}}></Input>
                        <Select style={{width: 120, display: `${this.state.dicTypeSwitch?'block':'none'}`}}>
                            {this.state.rootDicTypes.map(type => {
                                return (
                                    <Option key={type.code} value={type.code}>{type.name}</Option>
                                )
                            })}
                        </Select>
                    </Col>
                </Form.Item>
                <Form.Item label="所属对象">
                    <Col span={4}>
                        <Switch checked={this.state.belongsSwitch} onChange={this.changeBelongsSwitch}></Switch>
                    </Col>
                    <Col span={20}>
                        <Select style={{width: 120}} disabled={!this.state.belongsSwitch}>
                            {this.state.dicTypes.map(type => {
                                return (
                                    <Option key={type.code} value={type.code}>{type.name}</Option>
                                )
                            })}
                        </Select>
                    </Col>
                </Form.Item>
            </Modal>
        )
    }
}

class UpdateModal extends Component{

    constructor(props){
        super(props)

    }

    render(){                 

        return (
            <Modal
                title="修改字典"
                visible={this.props.visible}
                onOk={() => this.props.onOk(dic)}
                onCancel={() => this.props.onCancel()}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true} 
            >
                <Form.Item label="字典名称">
                    <Input placeholder="字典名称" />
                </Form.Item>
                <Form.Item label="字典代码">
                    <Input placeholder="字典代码" />
                </Form.Item>
                <Form.Item label="字典类型">
                    <Input placeholder="字典类型" />
                </Form.Item>
                <Form.Item label="所属对象">
                    <Input placeholder="所属对象" />
                </Form.Item>
            </Modal>
        )
    }
}

export default connect((state)=> ({

    sumDic: state.sumDic
}), {showList,
        addModalShow, addModalSure, addModalCancel})(SumDic)