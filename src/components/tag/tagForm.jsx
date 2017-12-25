import React, {Component} from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Modal
} from 'antd';
import {inject, observer} from 'mobx-react';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends Component {

  handleChange = (value) => {
    console.log(value)
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {visible, confirmLoading, ModalText, form,handleCancel,handleOk} = this.props;

    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 6
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 14
        }
      }
    };

    return (
      <Modal
        title="添加标签"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <Form>
          <FormItem {...formItemLayout} label="标签名称" hasFeedback>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input tag name!'
                }
              ]
            })(<Input/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const TagForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    return {
      name: Form.createFormField({value: props.name})
    };
  },
  onValuesChange(_, values) {}
})(RegistrationForm);

@inject('tagStore')
@observer
class TagBtn extends React.Component {
  constructor(props) {
    super(props)
    this.tagStore = this.props.tagStore
  }
  showModal = () => {
    this.tagStore.showModal()
  }
  handleOk = () => {
    this.form.validateFields(
      (err) => {
        if (!err) {
          this.tagStore.addTag(this.tagStore.fields)
        }
      },
    );
  }
  handleCancel = () => {
    this.tagStore.resetFields()
    this.tagStore.closeModal()
  }
  handleFormChange = (changedFields) => {
    this.tagStore.modifyFields(changedFields)
  }
  componentWillMount() {
    console.log(this.props)
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    const { visible, confirmLoading, ModalText } = this.tagStore.modal

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>添加标签</Button>
        <TagForm 
          {...this.tagStore.fields}
          visible={visible}
          handleOk={this.handleOk}
          confirmLoading={confirmLoading}
          handleCancel={this.handleCancel}
          ref={this.saveFormRef} onChange={this.handleFormChange}/>
      </div>
    );
  }
}
export default TagBtn;