import React, {Component} from 'react';
import {Button , Modal , Form , Input } from 'antd'
import {inject, observer} from 'mobx-react';

import Nav from '../components/navigator'
import ArticleForm from '../components/article/articleForm'
import SortBtn from '../components/sort/sortForm'
import TagBtn from '../components/tag/tagForm'


const FormItem = Form.Item


@inject('articleStore')
@observer
class AddArticle extends Component {
  constructor(props) {
    super(props)
    this.articleStore = this.props.articleStore
  }
  handleFormChange = (changedFields) => {
    this.articleStore.modifyFields(changedFields)
  }
  componentWillMount() {
   
  }
  render() {
    return (
      <div style={{ marginTop: 16 }}>
        <div style={{position:'fixed'}}>
          <SortBtn></SortBtn>
          <TagBtn></TagBtn>
        </div>
        <ArticleForm {...this.articleStore.fields} onChange={this.handleFormChange}></ArticleForm>
      </div>
    );
  }
}

export default AddArticle;