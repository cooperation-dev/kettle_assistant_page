import React from 'react'
import { Form, Input} from 'antd';

class CustomForm extends React.Component{
    changeInput = (event, attribute) => {
        this.props.change(event, attribute);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            label,
            field,
            value,
        } = this.props;
        return (
            <Form.Item label={label}>
                {getFieldDecorator(field, {
                    rules: [{
                        required: true, message: '请输入'+label,
                    },{
                        max: 10, message: '长度过大',
                    }],
                    initialValue: value
                })
                (<Input placeholder={label} onChange={(event) => {this.changeInput(event, field)}}/>)}
            </Form.Item>
        )
    }
}

export default Form.create({})(CustomForm)