import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './registerForm.css'
const FormItem = Form.Item;
@inject('userStore')
@observer
class NormalRegisterForm extends Component {
  handleConfirmPassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form
    if (value && value !== getFieldValue('password')) {
      callback('两次输入不一致！')
    }

    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { onSubmit } = this.props
    const { validateFieldsAndScroll, getFieldsValue, resetFields } = this.props.form

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.userStore.register(values).then(
          (user) => {
            window.location.hash = 'article'
          }
        )
      }
    })
    e.preventDefault();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="register-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="email" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="name" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('repassword', {
            rules: [{ required: true, message: 'Please reput your Password!' }, {
              validator: this.handleConfirmPassword
            }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Repassword" />
            )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="register-form-button">
            注册
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);

export default WrappedNormalRegisterForm