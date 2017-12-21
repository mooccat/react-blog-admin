import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Table, Input, Popconfirm, Select, Divider } from 'antd';
import { inject, observer } from 'mobx-react';

const Option = Select.Option


@inject('articleStore')
@observer
class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.articleStore = this.props.articleStore
    this.columns = [{
      title: '文章名称',
      dataIndex: 'title',
      width: '10%',
      render: (text, record) => { return text },
    }, {
      title: '作者',
      dataIndex: 'author',
      width: '10%',
      render: (text, record) => { if (text) { return text.name } },
    }, {
      title: '分类',
      dataIndex: 'sort',
      width: '10%',
      render: (text, record) => { if (text) { return text.name } },
    }, {
      title: '标签',
      dataIndex: 'tags',
      width: '10%',
      render: (text, record) => {
        let tags = ''
        for (let i = 0; i < text.length; i++) {
          let item = text[i]
          if (item.name) {
            tags = tags + item.name + ' | '
          }
        }
        return tags.substr(0, tags.length - 2)
      },
    }, {
      title: '内容',
      dataIndex: 'content',
      width: '10%',
      render: (text, record) => { return text },
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              <span>
                <Link to={'/article/edit/' + record._id}>编辑</Link>
                <Divider type="vertical" />
                <Popconfirm title="Sure to cancel?" onConfirm={() => this.deleteArticle(record._id)}>
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
    let articles = this.articleStore.getArticle()
  }
  handleChange(value, _id, column) {
    const newData = [...this.articleStore.articles];
    const target = newData.filter(item => _id === item._id)[0];
    if (target) {
      if (column === 'isShow' && value === 'true') {
        value = true
      } else if (column === 'isShow' && value === 'false') {
        value = false
      }
      target[column] = value;
      console.log(target)
      this.articleStore.updateArticles(newData)
    }
  }

  deleteArticle = (_id) => {
    console.log(_id)
    this.articleStore.deleteArticle({ '_id': _id })
  }
  render() {
    return <Table bordered dataSource={this.articleStore.articles.slice()} columns={this.columns} rowKey={row => row._id} />;
  }
}

export default ArticleList;