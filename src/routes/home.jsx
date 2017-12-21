import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Nav from '../components/navigator'

import {Route , Switch , Redirect ,withRouter,Link} from 'react-router-dom'

import Sort from './sort'
import Tag from './tag'
import AddArticle from './addArticle'
import User from './user'
import Article from './article'
import EditArticle from './editArticle'

const { Header, Content, Footer } = Layout;

const breadcrumbNameMap = {
  '/sort': '分类管理',
  '/tag': '标签管理',
  '/user': '用户管理',
  '/article': '文章管理',
  '/article/articleList': '文章列表',
  '/article/edit': '编辑文章',
  '/article/addArticle': '添加文章',
};

class Home extends Component {
  componentWillMount() {
    console.log(this.props.location)
  }
  render() {
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    })
    const breadcrumbItems = [(
      <Breadcrumb.Item key="home">
        <Link to="/">主页</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
    return (
      <Layout className="layout">
      <Header>
        <div className="logo" />
        <Nav></Nav>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          {breadcrumbItems}
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 700 }}>
          <Route path="/sort" component={Sort}/>
          <Route path="/tag" component={Tag}/>
          <Route path="/user" component={User}/>
          <Route path="/article" render={()=>
          
              <Switch>
              <Route path="/article/articleList" component={Article}/>
              <Route path="/article/edit/:article_id" component={EditArticle}/>
              <Route path="/article/addArticle" component={AddArticle}/>
              <Redirect from="/article" to="/article/articleList"/> 
            </Switch>
        
          }/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Fish Blog ©2017 Created by Fish
      </Footer>
    </Layout>
    );
  }
}

export default withRouter(Home);