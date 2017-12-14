import React, { Component } from 'react';
import {Link , withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Nav extends Component {
  state = {
    current: this.props.location.pathname,
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <Menu onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}>
        <Menu.Item key="/sort">
          <Link to="/sort"><Icon type="mail" />分类管理</Link>
            </Menu.Item>
        <Menu.Item key="/tag">
          <Link to="/tag"><Icon type="appstore" />标签管理</Link>
            </Menu.Item>
        <Menu.Item key="/user">
          <Link to="/user"><Icon type="appstore" />用户管理</Link>
        </Menu.Item>
        <SubMenu title={<span><Icon type="setting" />文章管理</span>}>
          <Menu.Item key="/article/articleList"><Link to="/article/articleList">文章列表</Link></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

export default withRouter(Nav);