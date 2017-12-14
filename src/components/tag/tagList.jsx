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

@inject('tagStore')
@observer
class TagList extends Component {
  constructor(props) {
    super(props);
    this.tagStore = this.props.tagStore
    this.columns = [{
      title: '分类名称',
      dataIndex: 'name',
      width: '60%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
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
                   <Popconfirm title="Sure to cancel?" onConfirm={() => this.deleteTag(record._id)}>
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
    let tags = this.tagStore.getTag()
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
  handleChange(value, _id, column) {
    const newData = [...this.tagStore.tags];
    const target = newData.filter(item => _id === item._id)[0];
    if (target) {
      target[column] = value;
      console.log(target)
      this.tagStore.updateTags(newData)
    }
  }
  edit(_id) {
    let data = this.tagStore.tags
    this.cacheData = data.map(item => ({ ...item }))
    const newData = [...this.tagStore.tags]
    const target = newData.filter(item => _id === item._id)[0]
    if (target) {
      target.editable = true
      this.tagStore.updateTags(newData)
    }
  }
  save(_id) {
    const newData = [...this.tagStore.tags]
    const target = newData.filter(item => _id === item._id)[0]
    if (target) {
      delete target.editable
      this.tagStore.updateTag(target)
    }
  }
  cancel(_id) {
    const newData = [...this.tagStore.tags];
    const target = newData.filter(item => _id === item._id)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => _id === item._id)[0]);
      delete target.editable;
      this.tagStore.updateTags(newData)
    }
  }
deleteTag = (_id) => {
  console.log(_id)
  this.tagStore.deleteTag({'_id':_id})
}
  render() {
    return <Table bordered dataSource={this.tagStore.tags.slice()} columns={this.columns} rowKey={row => row._id}/>;
  }
}

export default TagList;