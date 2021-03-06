import React from 'react'
import {Route , Switch , Redirect} from 'react-router-dom'
import Home from './routes/home'
import Sort from './routes/sort'
import Tag from './routes/tag'
import Login from './routes/login'
import AddArticle from './routes/addArticle'
import User from './routes/user'
import Article from './routes/article'
import EditArticle from './routes/editArticle'
import Register from './routes/register'

let routes = <div>
    <Switch>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
    <Route path="/" component={Home}/>
    </Switch>
</div>

export default routes;