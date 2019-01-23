import React from 'react'
import { Form} from 'antd';

const formItemLayout = {
    labelCol:{ span: 5 },
    wrapperCol:{ span: 17 }
}

const renderFormItem = (item, getFieldDecorator) => {
    const { label, key, component, value } = item;
    return (
        <Form.Item label={label} {...formItemLayout}>
            {getFieldDecorator(key, {
                rules: [{
                    required: true, message: '请输入'+label,
                },{
                    max: 30, message: '长度过大',
                }],
                initialValue: value
            })
            (component)}
        </Form.Item>
    )
}

class CommonForm extends React.Component{
    constructor(props){
        super(props);

        this.props.customForm(this.props.form);
    }

    render() {
        const { items, form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <Form>
                {items.map(obj => renderFormItem(obj, getFieldDecorator))}
            </Form>
        )
    }
}

export default Form.create({})(CommonForm)