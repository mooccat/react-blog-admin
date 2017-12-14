
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import { Row, Col } from 'antd';

import WrappedNormalLoginForm from '../components/user/loginForm'

import './login.css'


@inject('userStore')
@observer
class Login extends Component {
  constructor(props) {
    super(props)
    this.userStore = this.props.userStore
  }
  componentWillMount() {
    console.log(this.props)
  }
  render() {

    return (
      <div className="login">
        <WrappedNormalLoginForm></WrappedNormalLoginForm>
      </div>
    );
  }
}

export default Login;