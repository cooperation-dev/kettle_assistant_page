import React, {Component} from 'react';
import {Table, Row, Col, Input, Form, Button, Checkbox, Modal, Select} from 'antd';
import {connect} from 'react-redux';
import {showList, changeDisabled,
        addModalShow, addModalSure, addModalCancel,
        deleteDicByIds,
        findDicTypes,
        changeModalName, changeModalCode, changeModalType, changeModalBelongs,
        updateModalShow, updateModalSure, updateModalCancel} from '../../redux/actions/sum_dic';

import './SumDic.css';

const {Column} = Table
const {Option} = Select

class SumDic extends Component{
    constructor(props){
        super(props)

        this.state = {
            dicCode: '',
            dicName: '',
            disabled: false,
            dicType: '',
            selectRows: []
        }

    }

    componentDidMount = () => {
        let dic = {
            dicCode: this.state.dicCode,
            dicName: this.state.dicName,
            disabled: this.state.disabled,
            dicType: this.state.dicType,
        }
        this.props.showList(dic)
    }

    changeDicCode = (e) => {
        this.setState({
            dicCode: e.target.value
        })
    }

    changeDicName = (e) => {
        this.setState({
            dicName: e.target.value
        })
    }

    changeDicType = (e) => {
        this.setState({
            dicType: e.target.value
        })
    }

    changeIsDisabled = () => {
        this.setState({
            disabled: !this.state.disabled
        })
    }

    search = () => {
        let dic = {
            dicCode: this.state.dicCode,
            dicName: this.state.dicName,
            disabled: this.state.disabled,
            dicType: this.state.dicType,
        }
        this.props.showList(dic)
    }

    reset = () => {
        this.setState({
            selectRows: [],
            dicCode: '',
            dicName: '',
            disabled: '',
            dicType: '',
        })

        let dic = {
            dicCode: '',
            dicName: '',
            disabled: '',
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
                                    <Input placeholder="代码" onChange={this.changeDicCode} value={this.state.dicCode}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={2}>
                                <Form.Item label="名称">
                                    <Input placeholder="名称" onChange={this.changeDicName} value={this.state.dicName}/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={3}>
                                <Form.Item label="是否禁用">
                                    <Checkbox checked={this.state.disabled?true:false} onClick={this.changeIsDisabled}></Checkbox>
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
                        <Button type="default" size="default" className="btn" onClick={() => this.props.addModalShow()}>新增</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.updateModalShow(this.state.selectRows)}>修改</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.deleteDicByIds(this.state.selectRows)}>删除</Button>
                        <Button type="default" size="default" className="btn">导入</Button>
                        <Table rowSelection={rowSelection} dataSource={this.props.sumDic.list} >
                        <Column 
                            dataIndex = 'index'
                            key ='index'
                        />
                        <Column 
                            title = '代码'
                            dataIndex = 'dicCode'
                            key = 'dicCode'
                        />
                        <Column 
                            title = '名称'
                            dataIndex = 'dicName'
                            key = 'dicName'
                        />
                        <Column 
                            title = '排序'
                            dataIndex = 'sort'
                            key = 'sort'
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
                            dataIndex = 'isDisabled'
                            key = 'isDisabled'
                            render = {(text, record) => (
                                <Checkbox checked={record.isDisabled?true:false} onClick={() => this.props.changeDisabled(record)}></Checkbox>
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
                <AddModal visible={this.props.sumDic.addVisible} onOk={(dic) => this.props.addModalSure(dic)} onCancel={() => this.props.addModalCancel()} dicTypes={this.props.sumDic.dicTypes}></AddModal>
                <UpdateModal visible={this.props.sumDic.updateVisible} onOk={(dic) => this.props.updateModalSure(dic)} onCancel={() => this.props.updateModalCancel()} dicId={this.props.sumDic.modalDicId} dicName={this.props.sumDic.modalDicName} dicCode={this.props.sumDic.modalDicCode}  dicType={this.props.sumDic.modalDicType} belongs={this.props.sumDic.modalBelongs} changeName={(e) => this.props.changeModalName(e)} changeCode={(e) => this.props.changeModalCode(e)} changeType={(e) => this.props.changeModalType(e)} changeBelongs={(e) => this.props.changeModalBelongs(e)}></UpdateModal>
            </div>
        )
    }

}

class AddModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            dicName: '',
            dicCode: '',
            dicType: '',
            belongs: '',
        }
    }

    changeDicName = (e) => {
        this.setState({
            dicName: e.target.value
        })
    }

    changeDicCode = (e) => {
        this.setState({
            dicCode: e.target.value
        })
    }

    changeDicType = (e) => {
        this.setState({
            dicType: e.target.value
        })
    }

    changeBelongs = (e) => {
        this.setState({
            belongs: e.target.value
        })
    }

    render(){
        let dic = {
            dicName: this.state.dicName,
            dicCode: this.state.dicCode,
            dicType: this.state.dicType,
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
                    <Input placeholder="字典名称" value={this.state.dicName} onChange={this.changeDicName}/>
                </Form.Item>
                <Form.Item label="字典代码">
                    <Input placeholder="字典代码" value={this.state.dicCode} onChange={this.changeDicCode}/>
                </Form.Item>
                <Form.Item label="字典类别">
                    <Select style={{width: 120}}>
                    {this.props.dicTypes.map(type => {
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

class UpdateModal extends Component{

    constructor(props){
        super(props)

    }

    render(){                 
        let dic = {
            dicId: this.props.dicId,
            dicName: this.props.dicName,
            dicCode: this.props.dicCode,
            dicType: this.props.dicType,
            belongs: this.props.belongs,
        }

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
                    <Input placeholder="字典名称" onChange={(e) => this.props.changeName(e)} value={this.props.dicName}/>
                </Form.Item>
                <Form.Item label="字典代码">
                    <Input placeholder="字典代码" onChange={(e) => this.props.changeCode(e)} value={this.props.dicCode}/>
                </Form.Item>
                <Form.Item label="字典类型">
                    <Input placeholder="字典类型" onChange={(e) => this.props.changeType(e)} value={this.props.dicType}/>
                </Form.Item>
                <Form.Item label="所属对象">
                    <Input placeholder="所属对象" onChange={(e) => this.props.changeBelongs(e)} value={this.props.belongs}/>
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
        findDicTypes,
        changeModalName, changeModalCode, changeModalType, changeModalBelongs,
        updateModalShow, updateModalSure, updateModalCancel})(SumDic)