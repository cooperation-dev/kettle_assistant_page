import React, {Component} from 'react';
import {Table, Row, Col, Input, Form, Button, Checkbox, Modal, Select, Switch, message} from 'antd';
import {connect} from 'react-redux';
import {showList,
        addModalShow, addModalSure, addModalCancel,
        updateModalShow, updateModalSure, updateModalCancel,
        deleteDicByIds} from '../../redux/actions/sum_dic';

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
                        <Button type="default" size="default" className="btn" onClick={() => showDeleteConfirm(this.props.deleteDicByIds, this.state.selectRows)}>删除</Button>
                        {/* <Button type="default" size="default" className="btn" onClick={() => this.props.deleteDicByIds(this.state.selectRows)}>删除</Button> */}
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
                <AddModal visible={this.props.sumDic.addModalVisible} ok={(dic)=>this.props.addModalSure(dic)} cancel={()=>this.props.addModalCancel()}></AddModal>
                <UpdateModal visible={this.props.sumDic.updateModalVisible} id={this.props.sumDic.updateId} ok={(dic)=>this.props.updateModalSure(dic)} cancel={()=>this.props.updateModalCancel()}></UpdateModal>
            </div>
        )
    }

}

class AddModal extends Component{
    constructor(props){
        super(props)

        this.state = {
            id: '',
            name: '',
            code: '',
            rootDicTypes: [],
            dicTypes: [],
            dicTypeSwitch: false,
            //输入框字典类别
            dicType_input: '',
            //下拉框字典类别
            dicType_select: '',
            //所属对象
            belongs: '',
        }
    }

    componentDidMount = () => {
        this.findRootDicTypes()
        this.findDicTypes(this.state.dicType_select)
    }

    findRootDicTypes = () => {
        axios({
            method: 'post',
            url: '/api/sumDicController/findRootDicTypes'
        }).then((r) => {
            return r.data
        }).then((list) => {
            this.setState({
                rootDicTypes: list
            })
        })
    }

    findDicTypes = (code) => {
        axios.get('/api/sumDicController/findDicTypes', {
            params: {code: code}
        }).then((r) => {
            return r.data
        }).then((list) => {
            this.setState({
                dicTypes: list
            })
        })
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

    changeDicTypeSwitch = (e) => {
        this.setState({
            dicTypeSwitch: e,
            belongsSwitchValid: e?true:false,
            belongs: e?this.state.belongs:'',
            dicType_input: e?'':this.state.dicType_input,
            dicType_select: e?this.state.dicType_select:'',
        })
    }

    changeDicTypeInput = (e) => {
        this.setState({
            dicType_input: e.target.value
        })
    }

    changeDicTypeSelect = (e) => {
        this.setState({
            dicType_select: e,
        })
        this.findDicTypes(e)
    }

    changeBelongs = (e) => {
        this.setState({
            belongs: e
        })
    }

    ok = () => {
        let dic = {
            name: this.state.name,
            code: this.state.code,
            dicType: this.state.dicTypeSwitch?this.state.dicType_select:this.state.dicType_input,
            belongs: this.state.belongs
        }
        this.props.ok(dic)

        this.setState({
            name: '',
            code: ''
        })
        this.changeDicTypeSwitch(false)
    }

    cancel = () => {
        this.props.cancel()

        this.setState({
            name: '',
            code: ''
        })
        this.changeDicTypeSwitch(false)
    }

    render(){
        

        return (
            <Modal
                title="新增字典"
                visible={this.props.visible}
                onOk={this.ok}
                onCancel={this.cancel}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true} 
            >
                <Form.Item label="字典名称">
                    <Input placeholder="字典名称" value={this.state.name} onChange={this.changeDicName}/>
                </Form.Item>
                <Form.Item label="字典代码">
                    <Input placeholder="字典代码" value={this.state.code} onChange={this.changeDicCode}/>
                </Form.Item>
                <Form.Item label="字典类别">
                    <Col span={4}>
                        <Switch checked={this.state.dicTypeSwitch} onChange={this.changeDicTypeSwitch}></Switch>    
                    </Col>
                    <Col span={20}>
                        <Input style={{width: 120, display: `${this.state.dicTypeSwitch?'none':'block'}`}} value={this.state.dicType_input} onChange={this.changeDicTypeInput}></Input>
                        <Select style={{width: 120, display: `${this.state.dicTypeSwitch?'block':'none'}`}} value={this.state.dicType_select} onChange={this.changeDicTypeSelect}>
                            {this.state.rootDicTypes.map(type => {
                                return (
                                    <Option key={type.code} value={type.code}>{type.name}</Option>
                                )
                            })}
                        </Select>
                    </Col>
                </Form.Item>
                <Form.Item label="所属对象" style={{display: `${this.state.dicTypeSwitch?'block':'none'}`}}>
                    <Select style={{width: 120}} value={this.state.belongs} onChange={this.changeBelongs}>
                        {this.state.dicTypes.map(type => {
                            return (
                                <Option key={type.id} value={type.code}>{type.name}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
            </Modal>
        )
    }
}

class UpdateModal extends Component{

    constructor(props){
        super(props)

        this.state = {
            id: '',
            name: '',
            code: '',
            rootDicTypes: [],
            dicTypes: [],
            visible: false,
            dicTypeSwitch: false,
            //输入框字典类别
            dicType_input: '',
            //下拉框字典类别
            dicType_select: '',
            //所属对象
            belongs: '',
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props.id == nextProps.id){
            return
        }
        let id = nextProps.id
        if(id!=undefined && id!=""){
            this.findDicById(id)
        }

    }

    findRootDicTypes = () => {
        axios({
            method: 'post',
            url: '/api/sumDicController/findRootDicTypes'
        }).then((r) => {
            return r.data
        }).then((list) => {
            this.setState({
                rootDicTypes: list
            })
        })
    }

    findDicTypes = (code) => {
        axios.get('/api/sumDicController/findDicTypes', {
            params: {code: code}
        }).then((r) => {
            return r.data
        }).then((list) => {
            this.setState({
                dicTypes: list
            })
        })
    }

    findDicById = (id) => {
        axios.get('/api/sumDicController/findDicById/'+id)
            .then(r => {
                let data = r.data
                let closeDicTypeSwitch = data.belongs==undefined||data.belongs==""
                this.setState({
                    id: data.id,
                    name: data.name,
                    code: data.code,
                    dicTypeSwitch: closeDicTypeSwitch?false:true,
                    dicType_input: closeDicTypeSwitch?data.dicType:'',
                    dicType_select: closeDicTypeSwitch?'':data.dicType,
                    belongs: closeDicTypeSwitch?'':data.belongs,
                })
                this.findRootDicTypes()
                this.findDicTypes(data.dicType)
            })
    }

    changeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    changeCode = (e) => {
        this.setState({
            code: e.target.value
        })
    }

    changeDicTypeSwitch = (e) => {
        this.setState({
            dicTypeSwitch: e,
            belongsSwitchValid: e?true:false,
            belongs: e?this.state.belongs:'',
            dicType_input: e?'':this.state.dicType_input,
            dicType_select: e?this.state.dicType_select:'',
        })
    }

    changeDicTypeInput = (e) => {
        this.setState({
            dicType_input: e.target.value
        })
    }

    changeDicTypeSelect = (e) => {
        this.setState({
            dicType_select: e,
        })
        this.findDicTypes(e)
    }

    changeBelongs = (e) => {
        this.setState({
            belongs: e
        })
    }

    ok = () => {
        let dic = {
            id: this.state.id,
            name: this.state.name,
            code: this.state.code,
            dicType: this.state.dicTypeSwitch?this.state.dicType_select:this.state.dicType_input,
            belongs: this.state.belongs
        }
        this.props.ok(dic)

        this.setState({
            name: '',
            code: ''
        })
        this.changeDicTypeSwitch(false)
    }

    cancel = () => {
        this.props.cancel()

        this.setState({
            name: '',
            code: ''
        })
        this.changeDicTypeSwitch(false)
    }

    render(){                 

        return (
            <Modal
                title="修改字典"
                visible={this.props.visible}
                onOk={this.ok}
                onCancel={this.cancel}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true} 
            >
                <Form.Item label="字典名称">
                    <Input placeholder="字典名称" value={this.state.name} onChange={this.changeName}/>
                </Form.Item>
                <Form.Item label="字典代码">
                    <Input placeholder="字典代码" value={this.state.code} onChange={this.changeCode}/>
                </Form.Item>
                <Form.Item label="字典类型">
                    <Col span={4}>
                        <Switch checked={this.state.dicTypeSwitch} onChange={this.changeDicTypeSwitch}></Switch>    
                    </Col>
                    <Col span={20}>
                        <Input style={{width: 120, display: `${this.state.dicTypeSwitch?'none':'block'}`}} value={this.state.dicType_input} onChange={this.changeDicTypeInput}></Input>
                        <Select style={{width: 120, display: `${this.state.dicTypeSwitch?'block':'none'}`}} value={this.state.dicType_select} onChange={this.changeDicTypeSelect}>
                            {this.state.rootDicTypes.map(type => {
                                return (
                                    <Option key={type.code} value={type.code}>{type.name}</Option>
                                )
                            })}
                        </Select>
                    </Col>
                </Form.Item>
                <Form.Item label="所属对象">
                    {/* <Input placeholder="所属对象" /> */}
                    <Select style={{width: 120}} value={this.state.belongs} onChange={this.changeBelongs}>
                        {this.state.dicTypes.map(type => {
                            return (
                                <Option key={type.id} value={type.code}>{type.name}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm(deleteDicByIds, selectRows) {
    if(selectRows.length == 0){
        message.error('请选择行!')
    }else{
        Modal.confirm({
            title: '删除字典',
            content: '确定要删除吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                deleteDicByIds(selectRows)
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
  }

export default connect((state)=> ({

    sumDic: state.sumDic
}), {showList,
        addModalShow, addModalSure, addModalCancel,
        updateModalShow, updateModalSure, updateModalCancel,
        deleteDicByIds})(SumDic)