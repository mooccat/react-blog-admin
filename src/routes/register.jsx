
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import { Row, Col } from 'antd';

import WrappedNormalRegisterForm from '../components/user/registerForm'

import './register.css'


@inject('userStore')
@observer
class Register extends Component {
  constructor(props) {
    super(props)
    this.userStore = this.props.userStore
  }
  componentWillMount() {
    console.log(this.props)
  }
  render() {

    return (
      <div className="register">
        <WrappedNormalRegisterForm></WrappedNormalRegisterForm>
      </div>
    );
  }
}

export default Register;