import React, { Component } from 'react';
import { Table, Input, Popconfirm , Select} from 'antd';
import { inject, observer } from 'mobx-react';

const Option = Select.Option


const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

const EditableSelect = ({ editable, value, onChange }) => (
  <div>
    {editable
      ?  <Select  defaultValue={value.toString()} style={{ width: 120 }} onChange={e => onChange(e)}>
              <Option value="true">是</Option>
              <Option value="false">不是</Option>
            </Select>
      : value?"是":"不是"
    }
  </div>
);

@inject('userStore')
@observer
class UserList extends Component {
  constructor(props) {
    super(props);
    this.userStore = this.props.userStore
    this.columns = [{
      title: '邮箱',
      dataIndex: 'email',
      width: '35%',
      render: (text, record) => this.renderColumns(text, record, 'email'),
    }, {
      title: '用户名',
      dataIndex: 'name',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '是否管理员',
      dataIndex: 'isAdmin',
      width: '20%',
      render: (text, record) => this.renderSelect(text, record, 'isAdmin'),
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record._id)}>保存</a>
                  <span className="ant-divider" />
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record._id)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                : 
                <span>
                   <a onClick={() => this.edit(record._id)}>编辑</a>
                   <span className="ant-divider" />
                   <Popconfirm title="Sure to cancel?" onConfirm={() => this.deleteUser(record._id)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
            }
          </div>
        );
      },
    }];
  }
  componentWillMount() {
    let users = this.userStore.getUser()
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record._id, column)}
      />
    );
  }
  renderSelect(text, record, column) {
    return (
      <EditableSelect
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record._id, column)}
      />
    );
  }
  handleChange(value, _id, column) {
    const newData = [...this.userStore.users];
    const target = newData.filter(item => _id === item._id)[0];
    if (target) {
      if(column==='isAdmin'&&value==='true'){
        value = true
      }else if(column==='isAdmin'&&value==='false'){
        value = false
      }
      target[column] = value;
      console.log(target)
      this.userStore.updateUsers(newData)
    }
  }
  edit(_id) {
    let data = this.userStore.users
    this.cacheData = data.map(item => ({ ...item }))
    const newData = [...this.userStore.users]
    const target = newData.filter(item => _id === item._id)[0]
    if (target) {
      target.editable = true
      this.userStore.updateUsers(newData)
    }
  }
  save(_id) {
    const newData = [...this.userStore.users]
    const target = newData.filter(item => _id === item._id)[0]
    if (target) {
      delete target.editable
      this.userStore.updateUser(target)
    }
  }
  cancel(_id) {
    const newData = [...this.userStore.users];
    const target = newData.filter(item => _id === item._id)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => _id === item._id)[0]);
      delete target.editable;
      this.userStore.updateUsers(newData)
    }
  }
deleteUser = (_id) => {
  console.log(_id)
  this.userStore.deleteUser({'_id':_id})
}
  render() {
    return <Table bordered dataSource={this.userStore.users.slice()} columns={this.columns} rowKey={row => row._id}/>;
  }
}

export default UserList;