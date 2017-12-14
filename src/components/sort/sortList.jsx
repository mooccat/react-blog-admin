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
              <Option value="true">显示</Option>
              <Option value="false">不显示</Option>
            </Select>
      : value?"显示":"不显示"
    }
  </div>
);

@inject('sortStore')
@observer
class SortList extends Component {
  constructor(props) {
    super(props);
    this.sortStore = this.props.sortStore
    this.columns = [{
      title: '分类名称',
      dataIndex: 'name',
      width: '35%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    }, {
      title: '是否显示',
      dataIndex: 'isShow',
      width: '35%',
      render: (text, record) => this.renderSelect(text, record, 'isShow'),
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
                   <Popconfirm title="Sure to cancel?" onConfirm={() => this.deleteSort(record._id)}>
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
    let sorts = this.sortStore.getSort()
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
    const newData = [...this.sortStore.sorts];
    const target = newData.filter(item => _id === item._id)[0];
    if (target) {
      if(column==='isShow'&&value==='true'){
        value = true
      }else if(column==='isShow'&&value==='false'){
        value = false
      }
      target[column] = value;
      console.log(target)
      this.sortStore.updateSorts(newData)
    }
  }
  edit(_id) {
    let data = this.sortStore.sorts
    this.cacheData = data.map(item => ({ ...item }))
    const newData = [...this.sortStore.sorts]
    const target = newData.filter(item => _id === item._id)[0]
    if (target) {
      target.editable = true
      this.sortStore.updateSorts(newData)
    }
  }
  save(_id) {
    const newData = [...this.sortStore.sorts]
    const target = newData.filter(item => _id === item._id)[0]
    if (target) {
      delete target.editable
      this.sortStore.updateSort(target)
    }
  }
  cancel(_id) {
    const newData = [...this.sortStore.sorts];
    const target = newData.filter(item => _id === item._id)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => _id === item._id)[0]);
      delete target.editable;
      this.sortStore.updateSorts(newData)
    }
  }
deleteSort = (_id) => {
  console.log(_id)
  this.sortStore.deleteSort({'_id':_id})
}
  render() {
    return <Table bordered dataSource={this.sortStore.sorts.slice()} columns={this.columns} rowKey={row => row._id}/>;
  }
}

export default SortList;