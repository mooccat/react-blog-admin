import React, {Component} from 'react';
import {Button , Modal , Form , Input } from 'antd'
import {inject, observer} from 'mobx-react';
import {Link} from 'react-router-dom'

import Nav from '../components/navigator'
import ArticleList from '../components/article/articleList'



@inject('articleStore')
@observer
class Article extends Component {
  constructor(props) {
    super(props)
    this.articleStore = this.props.articleStore
  }
  showModal = () => {
    this.articleStore.showModal()
  }
  handleOk = () => {
    this.articleStore.addArticle(this.articleStore.fields)
  }
  handleCancel = () => {
    this.articleStore.resetFields()
    this.articleStore.closeModal()
  }
  handleFormChange = (changedFields) => {
    this.articleStore.modifyFields(changedFields)
  }
  componentWillMount() {
    console.log(this.props)
  }
  render() {   
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button type="primary"><Link to="/article/addArticle">添加文章</Link></Button>
        </div>
        <ArticleList></ArticleList>
      </div>
    );
  }
}

export default Article;