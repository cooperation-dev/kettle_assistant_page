import React from 'react'
import { Form, Input, Select, TreeSelect} from 'antd';

const {Option} = Select

const formItemLayout = {
    labelCol:{ span: 5 },
    wrapperCol:{ span: 17 }
}

class CommonForm extends React.Component{
    change = (value, attribute) => {
        this.props.change(value, attribute);
    }

    valid =() => {
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
              }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            label,
            field,
            type,
            value,
        } = this.props;
        return (
            <div>
                {(() => {
                        switch (type) {
                            case 'input':{
                                return(
                                    <Form.Item label={label} {...formItemLayout}>
                                        {getFieldDecorator(field, {
                                            rules: [{
                                                required: true, message: '请输入'+label,
                                            },{
                                                max: 10, message: '长度过大',
                                            }],
                                            initialValue: value
                                        })
                                        (<Input placeholder={label} onChange={(value) => {this.change(value, field)}}/>)}
                                    </Form.Item>
                                )
                            }
                            case 'select':{
                                return(
                                    <Form.Item label={label} {...formItemLayout}>
                                        {getFieldDecorator(field, {
                                            rules: [{
                                                required: true, message: '请选择'+label,
                                            },{
                                                max: 10, message: '长度过大',
                                            }],
                                            initialValue: value
                                        })
                                        (<Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder={label}
                                            notFoundContent="未匹配"
                                            // optionFilterProp="children"
                                            onChange={(value) => {this.change(value, field)}}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                            {this.props.data.map((value) => {
                                                return(
                                                    <Option value={value}>{value}</Option>
                                                )
                                            })}
                                        </Select>)}
                                    </Form.Item>
                                )
                            }
                            case 'treeSelect':{
                                return(
                                    <Form.Item label={label} {...formItemLayout}>
                                        {getFieldDecorator(field, {
                                            rules: [{
                                                required: true, message: '请选择'+label,
                                            },{
                                                max: 10, message: '长度过大',
                                            }],
                                            initialValue: value
                                        })
                                        (<TreeSelect
                                            showSearch
                                            style={{ width: '100%' }}
                                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                            placeholder={label}
                                            allowClear
                                            treeDefaultExpandAll
                                            onChange={(value) => this.change(value, field)}>
                                            {this.props.data.map((value) => {
                                                return(
                                                    <TreeSelect.TreeNode value={value} title={value} key="1"/>
                                                )
                                            })}
                                        </TreeSelect>)}
                                    </Form.Item>
                                )
                            }
                        }
                    }
                )()}
            </div>
        )
    }
}

export default Form.create({})(CommonForm)