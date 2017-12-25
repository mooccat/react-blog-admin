import React, {Component} from 'react';
import {Button , Modal , Form , Input } from 'antd'
import {inject, observer} from 'mobx-react';

import Nav from '../components/navigator'
import SortList from '../components/sort/sortList'
import SortBtn from '../components/sort/sortForm'

const FormItem = Form.Item


@inject('sortStore')
@observer
class Sort extends Component {
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
      <div>
        <div style={{ marginBottom: 16 }}>
          <SortBtn></SortBtn>
        </div>
        <SortList></SortList>
      </div>
    );
  }
}

export default Sort;