import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;




class RegistrationForm extends Component {

  handleChange = (value) => {
    console.log(value)
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
  
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="标签名称"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: 'Please input tag name!',
            }],
          })(
            <Input />
          )}
        </FormItem>
      </Form>
    );
  }
}

const TagForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        value: props.name,
      }),
    };
  },
  onValuesChange(_, values) {
    
  },
})(RegistrationForm);


export default TagForm;