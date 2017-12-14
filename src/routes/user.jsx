import React, {Component} from 'react';
import {Button , Modal , Form , Input } from 'antd'
import {inject, observer} from 'mobx-react';

import Nav from '../components/navigator'
import UserList from '../components/user/userList'
import UserForm from '../components/user/userForm'

const FormItem = Form.Item


@inject('userStore')
@observer
class User extends Component {
  constructor(props) {
    super(props)
    this.userStore = this.props.userStore
  }
  showModal = () => {
    this.userStore.showModal()
  }
  handleOk = () => {
    this.userStore.addUser(this.userStore.fields)
  }
  handleCancel = () => {
    this.userStore.resetFields()
    this.userStore.closeModal()
  }
  handleFormChange = (changedFields) => {
    this.userStore.modifyFields(changedFields)
  }
  componentWillMount() {
    console.log(this.props)
  }
  render() {
    const { visible, confirmLoading, ModalText } = this.userStore.modal
   
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>添加用户</Button> */}
        <UserList></UserList>
        {/* <div>
          <Modal title="添加用户"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
          <UserForm {...this.userStore.fields} onChange={this.handleFormChange}></UserForm>
        </Modal>
      </div> */}
      </div>
    );
  }
}

export default User;