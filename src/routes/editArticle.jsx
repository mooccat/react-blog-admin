import React, {Component} from 'react';
import {Button , Modal , Form , Input } from 'antd'
import {inject, observer} from 'mobx-react';

import Nav from '../components/navigator'
import ArticleForm from '../components/article/articleForm'


const FormItem = Form.Item


@inject('articleStore')
@observer
class EditArticle extends Component {
  constructor(props) {
    super(props)
    this.articleStore = this.props.articleStore
  }
  handleFormChange = (changedFields) => {
    this.articleStore.modifyFields(changedFields)
  }
  componentWillMount() {
      this.articleStore.getArticleById(this.props.match.params.article_id)
  }
  render() {
    return (
      <div style={{ marginTop: 16 }}>
        <ArticleForm {...this.articleStore.fields} onChange={this.handleFormChange}></ArticleForm>
      </div>
    );
  }
}

export default EditArticle;