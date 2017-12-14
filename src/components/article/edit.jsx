import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import React, { Component } from 'react';
import { convertFromRaw , convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';

import {inject, observer} from 'mobx-react';


@inject('articleStore')
@observer
class EditorConvertToMarkdown extends Component {
    constructor(props) {
    super(props)
    this.articleStore = this.props.articleStore
  }
  onEditorStateChange: Function = (editorState) => {
    let content = draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
  };

  render() {
    return (
      <div>
        <Editor
        
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
           value={draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}

export default EditorConvertToMarkdown