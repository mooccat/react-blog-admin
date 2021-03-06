import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;




class NewUserForm extends Component {

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
          label="分类名称"
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: 'Please input user name!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是否显示"
          hasFeedback
        >
        {getFieldDecorator('isShow', {
            rules: [{
              required: true, message: 'Please input user name!',
            }],
          })(
            <Select style={{ width: '100%' }} onChange={this.handleChange}>
              <Option style={{ width: '100%' }} value="true">显示</Option>
              <Option value="false">不显示</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

const UserForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      name: {
        value: props.name,
      },
      isShow: {
        value: props.isShow,
      }
    };
  },
  onValuesChange(_, values) {
    
  },
})(NewUserForm);


export default UserForm;