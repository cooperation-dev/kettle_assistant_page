import React, {Component} from 'react'
import {Form, Input, Checkbox, Button, Row, Col, Table, Modal} from 'antd'

import {findProjects, 
        addProjectShow, addProjectCancel, addProjectSure, 
        updateProjectShow, updateProjectCancel, updateProjectSure} from '../../redux/actions/project_manager'
import {connect} from 'react-redux';

import './ProjectManager.css'

class ProjectManager extends Component{
    componentDidMount = () => {
        this.props.findProjects()
    }
    render(){
        const columns = [
            {
                title: '对象代码',
                dataIndex: 'obj_code',
                key: 'obj_code'
            },
            {
                title: '对象名称',
                dataIndex: 'obj_name',
                key: 'obj_name'
            },
            {
                title: '对象排序',
                dataIndex: 'obj_sort',
                key: 'obj_sort',
                sorter: (a, b) => a.obj_sort - b.obj_sort
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time'
            },
            {
                title: '创建人',
                dataIndex: 'create_name',
                key: 'create_name'
            },
            {
                title: '是否禁用',
                dataIndex: 'whether_to_disable',
                key: 'whether_to_disable',
                render: (text, record) => (
                    record.whether_to_disable?<Checkbox defaultChecked></Checkbox>:<Checkbox></Checkbox>
                )
            },
            {
                title: '项目URL',
                dataIndex: 'project_url',
                key: 'project_url'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            }
        ];
        return (
            <div style={{width:"98%", position:"relative", marginLeft:"auto", marginRight:"auto"}}>
                <Row>
                    <Form className="ant-advanced-search-form">
                        <Row gutter={24}>
                            <Col span={6} key={1}>
                                <Form.Item label="对象代码:">
                                    <Input placeholder="对象代码"/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={2}>
                                <Form.Item label="对象名称:">
                                    <Input placeholder="对象名称"/>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={3}>
                                <Form.Item label="是否禁用:">
                                    {/* <Input placeholder="是否禁用"/> */}
                                    <Checkbox></Checkbox>
                                </Form.Item>
                            </Col>
                            <Col span={6} key={4}>
                                <Form.Item label="状态:">
                                    <Input placeholder="状态"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{textAlign:"center"}}>
                                <Button type="primary" htmlType="submit" style={{marginRight:8}}>查询</Button>
                                <Button style={{ marginLeft: 8 }}>重置</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row style={{marginTop:"15px"}}>
                    <Form className="ant-advanced-search-form" style={{marginBottom: "15px"}}>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.addProjectShow()}>新增</Button>
                        <Button type="default" size="default" className="btn" onClick={() => this.props.updateProjectShow()}>修改</Button>
                        <Button type="default" size="default" className="btn" onClick={showDeleteConfirm}>删除</Button>
                        <Button type="default" size="default" className="btn">查看</Button>
                        <Table dataSource={this.props.projectManager.list} columns={columns} />
                    </Form>
                </Row>
                <AddModal visible={this.props.projectManager.add_visible} onOk={() => this.props.addProjectSure()} onCancel={() => this.props.addProjectCancel()}></AddModal>
                <UpdateModal visible={this.props.projectManager.update_visible} onOk={() => this.props.updateProjectSure()} onCancel={() => this.props.updateProjectCancel()}></UpdateModal>
            </div>
        )
    }
}

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
};

class AddModal extends Component{
    render(){
        return (
            <Modal title="新增项目"
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="对象名称">
                    <Input placeholder="对象名称"/>
                </Form.Item>
                <Form.Item label="项目URL">
                    <Input placeholder="项目URL"/>
                </Form.Item>
                <Form.Item label="排序">
                    <Input placeholder="排序"/>
                </Form.Item>
                <Form.Item {...formItemLayout} label="是否禁用">
                    <Checkbox></Checkbox>
                </Form.Item>
            </Modal>
        )
    }
}

class UpdateModal extends Component{
    render(){
        return (
            <Modal title="修改项目"
                visible={this.props.visible}
                onOk={() => this.props.onOk()}
                onCancel={() => this.props.onCancel()}
                >
                <Form.Item label="对象名称">
                    <Input placeholder="对象名称"/>
                </Form.Item>
                <Form.Item label="项目URL">
                    <Input placeholder="项目URL"/>
                </Form.Item>
                <Form.Item label="排序">
                    <Input placeholder="排序"/>
                </Form.Item>
                <Form.Item {...formItemLayout} label="是否禁用">
                    <Checkbox></Checkbox>
                </Form.Item>
            </Modal>
        )
    }
}

function showDeleteConfirm() {
    Modal.confirm({
      title: '删除项目',
      content: '确定要删除吗？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

export default connect((state) => ({projectManager: state.projectManager}), {
    findProjects, 
    addProjectShow, addProjectCancel, addProjectSure, 
    updateProjectShow, updateProjectCancel, updateProjectSure, 
})(ProjectManager)