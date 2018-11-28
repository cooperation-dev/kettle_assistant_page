import { Button, Checkbox, Col, Form, Input, message, Modal, Row, Switch, Table, TreeSelect } from 'antd';
import axios from 'axios';
import { TreeCharts } from 'components/Echarts/TreeCharts';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addModalCancel, addModalShow, addModalSure, changeDisabled, deleteDicByIds, detailsModalCancel, detailsModalShow, detailsModalSure, showList, updateModalCancel, updateModalShow, updateModalSure } from '../../redux/actions/sum_dic';
import './SumDic.css';





const {Column} = Table

class SumDic extends Component{
    constructor(props){
        super(props)

        this.state = {
            code: '',
            name: '',
            valid: 'Y',
            belongs: '',
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

    changeBelongs = (e) => {
        this.setState({
            belongs: e.target.value
        })
    }

    search = () => {
        let dic = {
            code: this.state.code,
            name: this.state.name,
            valid: this.state.valid,
        }

        this.props.showList(dic)
    }

    reset = () => {
        let dic = {
            code: '',
            name: '',
            valid: '',
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
                                <Form.Item label="所属对象">
                                    <Input placeholder="所属对象" onChange={this.changeBelongs} value={this.state.belongs}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>
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
                        <Button type="default" size="default" className="btn">导入</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.detailsModalShow()} >显示关系</Button>
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
                            title = '所属对象'
                            dataIndex = 'belongs'
                            key = 'belong'
                        />
                        </Table>
                    </Form>
                </Row>
                <AddModal visible={this.props.sumDic.addModalVisible} ok={(dic)=>this.props.addModalSure(dic)} cancel={()=>this.props.addModalCancel()}></AddModal>
                <UpdateModal visible={this.props.sumDic.updateModalVisible} id={this.props.sumDic.updateId} ok={(dic)=>this.props.updateModalSure(dic)} cancel={()=>this.props.updateModalCancel()}></UpdateModal>
                <DetailsModal visible={this.props.sumDic.detailsModalVisible} ok={(dic)=>this.props.detailsModalSure(dic)} cancel={()=>this.props.detailsModalCancel()} data={this.props.sumDic.dicTree}></DetailsModal>
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
            dicTypes: [],
            belongsSwitch: false,
            //所属对象
            belongs: '',
        }
    }

    componentDidMount = () => {
        this.findDicTypes()
    }

    findDicTypes = () => {
        axios.get('/api/sumDicController/findDicTypes').then((r) => {
            return r.data.data
        }).then((list) => {
            this.setState({
                dicTypes: list,
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

    changeBelongsSwitch = (e) => {
        this.setState({
            belongsSwitch: e,
            belongs: e?this.state.belongs: ''
        })
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
            dicType: this.state.dicTypeSwitch?this.state.dicType_select:'',
            belongs: this.state.belongs
        }
        this.props.ok(dic)

        this.setState({
            name: '',
            code: ''
        })
    }

    cancel = () => {
        this.props.cancel()

        this.setState({
            name: '',
            code: ''
        })
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

                <Row>
                    <Form.Item label="所属对象" >
                        <Col span={4}>
                            <Switch checked={this.state.belongsSwitch} onChange={this.changeBelongsSwitch}></Switch>    
                        </Col>
                        <Col span={12} style={{display: `${this.state.belongsSwitch?'block':'none'}`}}>
                                {/* <Select style={{width: 120}} value={this.state.belongs} onChange={this.changeBelongs}>
                                    {this.state.dicTypes.map(type => {
                                        return (
                                            <Option key={type.id} value={type.code}>{type.name}</Option>
                                        )
                                    })}
                                </Select> */}
                                <TreeSelect
                                    style={{ width: 300 }}
                                    value={this.state.belongs}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={this.state.dicTypes}
                                    placeholder="Please select"
                                    treeDefaultExpandAll
                                    onChange={this.changeBelongs}
                                />
                        </Col>
                    </Form.Item>
                </Row>
                
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
            dicTypes: [],
            visible: false,
            belongsSwitch: false,
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

    findDicTypes = () => {
        axios.get('/api/sumDicController/findDicTypes').then((r) => {
            return r.data.data
        }).then((list) => {
            this.setState({
                dicTypes: list,
            })
        })
    }

    findDicById = (id) => {
        axios.get('/api/sumDicController/findDicById/'+id)
            .then(r => {
                let data = r.data.data
                let belongsSwitch = data.belongs==undefined||data.belongs==""
                this.setState({
                    id: data.id,
                    name: data.name,
                    code: data.code,
                    belongsSwitch: belongsSwitch?false:true,
                    belongs: belongsSwitch?'':data.belongs,
                })
            })
            this.findDicTypes()
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

    changeBelongsSwitch = (e) => {
        this.setState({
            belongsSwitch: e,
            belongs: e?this.state.belongs:'',
        })
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
            belongs: this.state.belongsSwitch?this.state.belongs:''
        }
        this.props.ok(dic)

    }

    cancel = () => {
        this.props.cancel()

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

                <Row >
                    <Form.Item label="所属对象">
                        <Col span={4}>
                            <Switch checked={this.state.belongsSwitch} onChange={this.changeBelongsSwitch}></Switch>    
                        </Col>
                        <Col span={12} style={{display: `${this.state.belongsSwitch?'block':'none'}`}}>
                                <TreeSelect
                                    style={{ width: 300 }}
                                    value={this.state.belongs}
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                    treeData={this.state.dicTypes}
                                    placeholder="Please select"
                                    treeDefaultExpandAll
                                    onChange={this.changeBelongs}
                                />
                        </Col>

                    </Form.Item>
                </Row>
            </Modal>
        )
    }
}

class DetailsModal extends Component{
    render = () => {
        return (
            <Modal
                title="显示关系"
                visible={this.props.visible}
                onOk={() => this.props.ok()}
                onCancel={() => this.props.cancel()}
                okText="确认"
                cancelText="取消"
                destroyOnClose={true} 
                width={800}
            >
                <TreeCharts data={this.props.data}></TreeCharts>
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
        deleteDicByIds, changeDisabled,
        detailsModalShow, detailsModalSure, detailsModalCancel})(SumDic)