import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete ,Modal , DatePicker } from 'antd';
import EditorConvertToMarkdown from './edit'
import SimpleMDE from 'simplemde'
import SimpleMDECss from 'simplemde/dist/simplemde.min.css';
import SortForm from '../sort/sortForm'

import {inject, observer} from 'mobx-react'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;



@inject('sortStore','tagStore','articleStore','userStore')
@observer
class NewArticleForm extends Component {
  constructor(props) {
    super(props)
    this.sortStore = this.props.sortStore
    this.tagStore = this.props.tagStore
    this.articleStore = this.props.articleStore
    this.userStore = this.props.userStore
  }
  componentWillMount() {
    this.sortStore.getSort()
    this.tagStore.getTag()
    this.userStore.getUser()
    console.log()
  }
  componentDidMount() {
    this.simplemde = new SimpleMDE()
    setTimeout(() => this.simplemde.value(this.props.content),500)
    this.simplemde.codemirror.on("change", this.contentChange)
  }
  componentWillUnmount(){
    this.articleStore.resetFields()
  }
  handleChange = (value) => {
    console.log(value)
  }
  contentChange = () => {
    this.props.onChange({'content':{'value':this.simplemde.value()}})
  }
  check = () => {
    let component = this
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          if(window.location.hash === '#/article/addArticle'){
            this.articleStore.addArticle(this.articleStore.fields).then(()=>{
              window.location.hash = '#/article'
            })
          }else{
            this.articleStore.updateArticle(this.articleStore.fields).then(()=>{
              window.location.hash = '#/article'
            })
          }
        }
      },
    );
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, confirmLoading, ModalText } = this.sortStore.modal

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { 
          span: 3 ,
          
        },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const formTailLayout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 8,
        offset: 16
      }
    };

    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="文章名称"
          hasFeedback
        >
          {getFieldDecorator('title', {
            rules: [{
              required: true, message: 'Please input article title!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分类名称"
          hasFeedback
        >
        {getFieldDecorator('sort', {
            rules: [{
              required: true, message: 'Please input sort name!',
            }],
          })(
            <Select onChange={this.handleChange}>
              {
                this.sortStore.sorts.map(function(item){
                  return <Option key={item._id} value={item._id}>{item.name}</Option>
                })
              }
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="标签名称"
          hasFeedback
        >
        {getFieldDecorator('tags', {
            rules: [{
              required: true, message: 'Please input tag name!',
            }],
          })(
            <Select style={{ width: '100%' }} mode="multiple" onChange={this.handleChange}>
              {
                this.tagStore.tags.map(function(item){
                  return <Option key={item._id} value={item._id}>{item.name}</Option>
                })
              }
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="作者"
          hasFeedback
        >
          {getFieldDecorator('author', {
            rules: [{
              required: true, message: 'Please input article author!',
            }],
          })(
            <Select onChange={this.handleChange}>
              {
                this.userStore.users.map(function(item){
                  return <Option key={item._id} value={item._id}>{item.name}</Option>
                })
              }
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="图片链接"
          hasFeedback
        >
          {getFieldDecorator('img', {
            rules: [{
              required: true, message: 'Please input article image!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="时间"
          hasFeedback
        >
          {getFieldDecorator('creat_at', {
            
          })(
            <DatePicker placeholder="选择时间"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="文章正文"
          hasFeedback
        >
        <textarea id="editor"></textarea>
        </FormItem>
        <FormItem {...formTailLayout}>
          <Button type="primary" onClick={this.check}>
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const ArticleForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields)
  },
  mapPropsToFields(props) {
    let fields = {}
    for(let key in props){
      fields[key] = Form.createFormField({
        value : props[key]
      })
    }
    console.log(fields)
    return fields
  },
  onValuesChange(_, values) {
    
  },
})(NewArticleForm);


export default ArticleForm;