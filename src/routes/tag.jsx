import React, {Component} from 'react';
import {Button , Modal , Form , Input } from 'antd'
import {inject, observer} from 'mobx-react';

import Nav from '../components/navigator'
import TagList from '../components/tag/tagList'
import TagBtn from '../components/tag/tagForm'

const FormItem = Form.Item


@inject('tagStore')
@observer
class Tag extends Component {
  constructor(props) {
    super(props)
    this.tagStore = this.props.tagStore
  }
  render() { 
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <TagBtn></TagBtn>
        </div>
        <TagList></TagList>
      </div>
    );
  }
}

export default Tag;