import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Modal} from 'antd';
import {inject, observer} from 'mobx-react';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;




class NewSortForm extends Component {

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
              required: true, message: 'Please input sort name!',
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
              required: true, message: 'Please input sort name!',
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

const SortForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({
        value: props.name,
      }),
      isShow: Form.createFormField({
        value: props.isShow,
      })
    };
  },
  onValuesChange(_, values) {
    
  },
})(NewSortForm);

@inject('sortStore')
@observer
class SortBtn extends Component {
  constructor(props) {
    super(props)
    this.sortStore = this.props.sortStore
  }
  showModal = () => {
    this.sortStore.showModal()
  }
  handleOk = () => {
    this.form.validateFields(
      (err) => {
        if (!err) {
          this.sortStore.addSort(this.sortStore.fields)
        }
      },
    );
  }
  handleCancel = () => {
    this.sortStore.resetFields()
    this.sortStore.closeModal()
  }
  handleFormChange = (changedFields) => {
    this.sortStore.modifyFields(changedFields)
  }
  componentWillMount() {
    console.log(this.props)
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    const { visible, confirmLoading, ModalText } = this.sortStore.modal
   
    return (
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.showModal}>添加分类</Button>
          <Modal title="添加分类"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
          <SortForm ref={this.saveFormRef} {...this.sortStore.fields} onChange={this.handleFormChange}></SortForm>
        </Modal>
      </div>
    );
  }
}

export default SortBtn;