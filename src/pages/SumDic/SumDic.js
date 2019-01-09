import { Button, Col, Form, Input, Modal, Row, Switch, Table, TreeSelect, Icon, Divider, Select} from 'antd';
import axios from 'axios';
import { TreeCharts } from 'components/Echarts/TreeCharts';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addModalCancel, addModalShow, addModalSure, 
    changeDisabled, deleteDicByIds, 
    detailsModalCancel, detailsModalShow, detailsModalSure, 
    showList, updateModalCancel, updateModalShow, updateModalSure } from '../../redux/actions/sum_dic';

import CustomForm from '../../components/CustomForm/CustomForm'

import './SumDic.css';

const {Column} = Table
const {Option} = Select

class SumDic extends Component{
    constructor(props){
        super(props)

        this.state = {
            name: '',
            code: '',
            type: undefined,
            belongs: '',
            selectRows: [],
        }
    }
    
    componentDidMount = () => {
        this.search()
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

    search = () => {
        let dic = {
            name: this.state.name,
            code: this.state.code,
            type: this.state.type,
            belongs: this.state.belongs,
        }
        
        let dicReqVO = {
            pageNo: this.props.sumDic.pageNo,
            pageSize: this.props.sumDic.pageSize,
            data: dic
        }
        this.props.showList(dicReqVO)
    }

    reset = () => {
        let dic = {
            name: '',
            code: '',
            type: '',
            belongs: '',
        }
        let dicReqVO = {
            pageNo: 1,
            pageSize: this.props.sumDic.pageSize,
            data: dic
        }

        this.setState({
            name: '',
            code: '',
            type: undefined,
            belongs: '',
        })

        this.props.showList(dicReqVO)
    }

    changePagination = (page) => {
        let dic = {
            name: this.state.name,
            code: this.state.code,
            type: this.state.type,
            belongs: this.state.belongs,
        }
        let dicReqVO = {
            pageSize: this.props.sumDic.pageSize,
            pageNo: page,
            data: dic
        }
        this.props.showList(dicReqVO)
    }

    render(){
        const pagination = {
            pageSize: this.props.sumDic.pageSize,
            total: this.props.sumDic.total,
            current: this.props.sumDic.pageNo,
            onChange:(page) => {
                this.changePagination(page)
            }
        }
        return (
            <div className="ant-advanced-search-form" style={{width:"98%", position:"relative", marginLeft:"auto", marginRight:"auto", marginBottom:"15px"}}>
                <Row>
                    <Button type="default" size="default" className="custom-toolbar-btn" onClick={()=>this.props.addModalShow()}><Icon type="plus" />新增</Button>
                    <Button type="default" size="default" className="custom-toolbar-btn" onClick={() => showDeleteConfirm(this.props.deleteDicByIds, this.state.selectRows)}><Icon type="delete" />全部删除</Button>
                    <Button type="default" size="default" className="custom-toolbar-btn" onClick={() => this.props.detailsModalShow()} >显示关系</Button>
                </Row>
                <Divider />
                <Row>
                    <Form layout="vertical">
                        <Row gutter={24}>
                            <Col key={1} style={{float: "left", width: "20%"}}>
                                <Form.Item label="名称">
                                    <Input placeholder="请输入名称" value={this.state.name} onChange={(e) => this.change(e, 'name')}/>
                                </Form.Item>
                            </Col>
                            <Col key={2} style={{float: "left", width: "20%"}}>
                                <Form.Item label="代码">
                                    <Input placeholder="请输入代码" value={this.state.code} onChange={(e) => this.change(e, 'code')}/>
                                </Form.Item>
                            </Col>
                            <Col key={3} style={{float: "left", width: "20%"}}>
                                <Form.Item label="类型">
                                    <Select
                                        showSearch
                                        placeholder="请选择类型"
                                        notFoundContent="未匹配"
                                        // optionFilterProp="children"
                                        value={this.state.type}
                                        onChange={(value) => this.changeValue(value, 'type')}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="testType">testType</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col key={4} style={{float: "left", width: "20%"}}>
                                <Form.Item label="所属对象">
                                    <Input placeholder="请输入所属对象" value={this.state.belongs} onChange={(e) => this.change(e, 'belongs')}/>
                                </Form.Item>
                            </Col>
                            <Col key={5} className="custom-sr-btn" style={{float: "left", width: "20%"}}>
                                <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                        <Table rowKey={(record) => record.dic_id} dataSource={this.props.sumDic.list} pagination={pagination}>
                        <Column 
                            title = '名称'
                            dataIndex = 'name'
                            key = 'name'
                        />
                        <Column 
                            title = '代码'
                            dataIndex = 'code'
                            key = 'code'
                        />
                        <Column 
                            title = '类型'
                            dataIndex = 'type'
                            key = 'type'
                        />
                        <Column 
                            title = '更新人'
                            dataIndex = 'updater'
                            key = 'updater'
                        />
                        <Column 
                            title = '最后更新时间'
                            dataIndex = 'updateTime'
                            key = 'updateTime'
                        />
                        <Column 
                            title = '所属对象'
                            dataIndex = 'belongs'
                            key = 'belongs'
                        />
                        <Column 
                            title = '来源'
                            dataIndex = 'source'
                            key = 'source'
                        />
                        <Column 
                            title = '操作'
                            render={(text, record) => (
                                <span>
                                    <Icon type="edit" onClick={() => this.props.updateModalShow(record.dic_id)} style={{marginRight: 10}}/>
                                    <Icon type="delete" onClick={() => showDeleteConfirm(this.props.deleteDicByIds, record.dic_id)}/>
                                </span>
                            )}
                        />
                        </Table>
                    </Form>
                </Row>
                <AddModal visible={this.props.sumDic.addModalVisible} ok={(dic)=>this.props.addModalSure(dic)} cancel={()=>this.props.addModalCancel()}></AddModal>
                <UpdateModal visible={this.props.sumDic.updateModalVisible} id={this.props.sumDic.updateId} ok={(dicReqVO,dic_id)=>this.props.updateModalSure(dicReqVO,dic_id)} cancel={()=>this.props.updateModalCancel()}></UpdateModal>
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
        let dicReqVO = {
            name: this.state.name,
            code: this.state.code,
            dicType: this.state.dicTypeSwitch?this.state.dicType_select:'',
            belongs: this.state.belongs
        }
        this.props.ok(dicReqVO)

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
                destroyOnClose={true}>
                <CustomForm label = "字典名称" field = "name" value = {this.state.name}
                    // change = "this.changeDicName"
                />
                <CustomForm label = "字典代码" field = "code" value = {this.state.name}
                    // change = "this.changeDicName"
                />
                {/* <Form.Item label="字典名称">
                    <Input placeholder="字典名称" value={this.state.name} onChange={this.changeDicName}/>
                </Form.Item>
                <Form.Item label="字典代码">
                    <Input placeholder="字典代码" value={this.state.code} onChange={this.changeDicCode}/>
                </Form.Item> */}
                <Row>
                    <Form.Item label="所属对象" >
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
                                onChange={this.changeBelongs}/>
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
            dic_id: '',
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
        axios.get('/dicService/v1/dic/'+id)
            .then(response => {
                let data = response.data.data
                let belongsSwitch = data.belongs==undefined||data.belongs==""
                this.setState({
                    dic_id: data.dic_id,
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
        let dicReqVO = {
            name: this.state.name,
            code: this.state.code,
            belongs: this.state.belongsSwitch?this.state.belongs:''
        }
        let dic_id = this.state.dic_id;
        this.props.ok(dicReqVO, dic_id)

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

function showDeleteConfirm(deleteDicByIds, id) {
    Modal.confirm({
        title: '删除字典',
        content: '确定要删除吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
            deleteDicByIds(id)
        },
        onCancel() {
            console.log('Cancel');
        },
        });
}

export default connect((state)=> ({

    sumDic: state.sumDic
}), {showList,
        addModalShow, addModalSure, addModalCancel,
        updateModalShow, updateModalSure, updateModalCancel,
        deleteDicByIds, changeDisabled,
        detailsModalShow, detailsModalSure, detailsModalCancel})(SumDic)