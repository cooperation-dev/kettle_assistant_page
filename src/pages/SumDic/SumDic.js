import { Button, Col, Form, Input, message, Modal, Row, Switch, Table, TreeSelect, Icon, Divider, AutoComplete} from 'antd';
import axios from 'axios';
import { TreeCharts } from 'components/Echarts/TreeCharts';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addModalCancel, addModalShow, addModalSure, 
    changeDisabled, deleteDicByIds, 
    detailsModalCancel, detailsModalShow, detailsModalSure, 
    showList, updateModalCancel, updateModalShow, updateModalSure } from '../../redux/actions/sum_dic';
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
        
        let data = {
            pageNo: this.props.sumDic.pageNo,
            pageSize: this.props.sumDic.pageSize,
            data: dic
        }
        this.props.showList(data)
    }

    reset = () => {
        let dic = {
            code: '',
            name: '',
            valid: 'Y',
        }
        let data = {
            pageNo: 1,
            pageSize: this.props.sumDic.pageSize,
            data: dic
        }

        this.setState({
            code: '',
            name: '',
            valid: 'Y'
        })

        this.props.showList(data)
    }

    changePagination = (page) => {
        let dic = {
            code: this.state.code,
            name: this.state.name,
            valid: this.state.valid,
        }
        let data = {
            pageSize: this.props.sumDic.pageSize,
            pageNo: page,
            data: dic
        }
        this.props.showList(data)
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

        const pagination = {
            pageSize: this.props.sumDic.pageSize,
            total: this.props.sumDic.total,
            current: this.props.sumDic.pageNo,
            onChange:(page) => {
                this.changePagination(page)
            }
        }
        const dataSource = ['test', 'datasource', 'aaa'];
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
                            <Col span={5} key={1}>
                                <Form.Item label="名称">
                                    <Input placeholder="请输入名称" onChange={this.changeDicName} value={this.state.name}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} key={2}>
                                <Form.Item label="代码">
                                    <Input placeholder="请输入代码" onChange={this.changeDicCode} value={this.state.code}/>
                                </Form.Item>
                            </Col>
                            <Col span={5} key={3}>
                                <Form.Item label="类型">
                                    {/* <Input placeholder="类型" onChange={this.changeDicCode} value={this.state.code}/> */}
                                    <AutoComplete
                                        dataSource={dataSource}
                                        placeholder="请选择类型"
                                        filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                        />
                                </Form.Item>
                            </Col>
                            <Col span={5} key={4}>
                                <Form.Item label="所属对象">
                                    <Input placeholder="请输入所属对象" onChange={this.changeBelongs} value={this.state.belongs}/>
                                </Form.Item>
                            </Col>
                            <Col span={4} key={5} className="custom-sr-btn">
                                <Button type="primary" htmlType="submit" onClick={this.search}>查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={this.reset}>重置</Button>
                            </Col>
                        </Row>
                        <Table rowKey={(record) => record.id} rowSelection={rowSelection} dataSource={this.props.sumDic.list} pagination={pagination}>
                        <Column 
                            title = '名称'
                            dataIndex = 'sort'
                            key = 'sort'
                        />
                        <Column 
                            title = '代码'
                            dataIndex = 'code'
                            key = 'code'
                        />
                        <Column 
                            title = '类型'
                            dataIndex = 'name'
                            key = 'name'
                        />
                        <Column 
                            title = '更新人'
                            dataIndex = 'createTime'
                            key = 'createTime'
                        />
                        <Column 
                            title = '最后更新时间'
                            dataIndex = 'modifyTime'
                            key = 'modifyTime'
                        />
                        <Column 
                            title = '所属对象'
                            dataIndex = 'creator'
                            key = 'creator'
                        />
                        <Column 
                            title = '来源'
                            dataIndex = 'modifier'
                            key = 'modifier'
                        />
                        <Column 
                            title = '操作'
                            dataIndex = 'belongs'
                            key = 'belong'
                            render={(text, record) => (
                                <span>
                                    <Icon type="edit" onClick={() => this.props.updateModalShow(record.id)} style={{marginRight: 10}}/>
                                    <Icon type="delete" onClick={() => showDeleteConfirm(this.props.deleteJob, this.state.selectRows)}/>
                                </span>
                            )}
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