import axios from 'axios'
import { message } from 'antd';

const baseUrl = '/api/'
let instance = axios.create({ baseURL: '/api/', timeout: 1000 });
instance.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.token = localStorage.getItem('token');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
instance.interceptors.response.use(function (response) {
    // console.log(response.headers.token)
    if (response.headers.token) {
        localStorage.setItem('token', response.headers.token)
    }
    return response;
}, function (error) {
    console.log(error.response)
    if (error.response && error.response.status == '401') {
        window.location.hash = 'login'
    } else {
        if (error.response.data && error.response.data.errmsg) {
            message.error(error.response.data.errmsg.toString(), 1)
        }
    }
    return Promise.reject(error);
});
export default {
    getSorts: (params) => {
        return instance.get('sort', { 'params': params })
    },
    addSort: (params) => {
        return instance.post('sort', params)
    },
    updateSort: (params) => {
        return instance.put('sort', params)
    },
    deleteSort: (params) => {
        return instance.delete('sort', { 'params': params })
    },
    getTags: (params) => {
        return instance.get('tag', { 'params': params })
    },
    addTag: (params) => {
        return instance.post('tag', params)
    },
    updateTag: (params) => {
        return instance.put('tag', params)
    },
    deleteTag: (params) => {
        return instance.delete('tag', { 'params': params })
    },
    getArticles: (params) => {
        return instance.get('article', { 'params': params })
    },
    addArticle: (params) => {
        return instance.post('article', params)
    },
    updateArticle: (params) => {
        return instance.put('article', params)
    },
    deleteArticle: (params) => {
        return instance.delete('article', { 'params': params })
    },
    getUsers: (params) => {
        return instance.get('user', { 'params': params })
    },
    deleteUser: (params) => {
        return instance.delete('/user/delete', { 'params': params })
    },
    updateUser: (params) => {
        return instance.put('user/update', params)
    },
    login: (params) => {
        return instance.post('/admin/login', params)
    },
    register: (params) => {
        return instance.post('/admin/register', params)
    },
}