import React from 'react'
import { Form, Input} from 'antd';

class CustomForm extends React.Component{
    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            label,
            field,
            value,
            change,
        } = this.props;
        return (
            <Form.Item label={label}>
                {getFieldDecorator(field, {
                    rules: [{
                        required: true, message: '请输入'+label,
                    },{
                        len: 10, message: '长度过大',
                    }],
                    initialValue: value
                })
                (<Input placeholder={label}/>)}
            </Form.Item>
        )
    }
}

export default Form.create({})(CustomForm)