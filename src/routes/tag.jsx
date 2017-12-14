import React, {Component} from 'react';
import {Button , Modal , Form , Input } from 'antd'
import {inject, observer} from 'mobx-react';

import Nav from '../components/navigator'
import TagList from '../components/tag/tagList'
import TagForm from '../components/tag/tagForm'

const FormItem = Form.Item


@inject('tagStore')
@observer
class Tag extends Component {
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
        <div style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={this.showModal}>添加标签</Button>
        </div>
        <TagList></TagList>
        <div>
          <Modal title="添加标签"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
          <TagForm {...this.tagStore.fields} ref={this.saveFormRef} onChange={this.handleFormChange}></TagForm>
        </Modal>
      </div>
      </div>
    );
  }
}

export default Tag;