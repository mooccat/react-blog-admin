import { message } from 'antd';

import {observable, action, runInAction, useStrict , computed} from 'mobx'
import api from '../../api/index'


useStrict(true)

class ArticleStore {
    @observable articles = [];
    

    constructor() {
        this.articles = observable([])
        this.article = observable({})
        this.simplemde = observable({})
        this.fields = observable({
            title: '',
            sort: '',
            isMd: true,
            author: '',
            img: '',
            content: '',
        })
    }

    @action 
    async modifyFields(params) {
        for(let key in params){
            this.fields[key] = params[key].value
        }
    }

    @action
    async resetFields(params){
        this.fields = observable({
            title: '',
            sort: '',
            isMd: true,
            author: '',
            img: '',
            content: '',
        })
    }

    @action 
    async addArticle(params) {       
        try {
            let res = await api.addArticle(params)
            let article = res.data.data
            return res
            runInAction(() => {
                this.articles.push(article)
            });
        } catch (err) {
            runInAction(() => {
                
            })
        }
    }

    @action 
    async getArticle(params) {
        let res = await api.getArticles(params)
        let articles = res.data.data
         runInAction(() => {
             this.articles = articles
         });
     }

     @action 
     async getArticleById(id) {
         let res = await api.getArticles({'_id':id})
         let article = res.data.data[0]
          runInAction(() => {
              this.article = article
              for(let key in article){
                  if(key==='sort'||key=== 'author'){
                    if(article[key]){
                        this.fields[key] = article[key]._id
                    }
                  }else if(key === 'tags'){
                    this.fields[key] = []
                   for(let i=0;i<article[key].length;i++){
                       if(article[key][i]){
                          this.fields[key].push(article[key][i]._id)
                       }
                   }
                  }else{
                      this.fields[key] = article[key]
                  }
              }
          });
      }

     @action 
    async deleteArticle(params) {
        let res = await api.deleteArticle(params)
         runInAction(() => {
            for(let i=0;i<this.articles.length;i++){
                if(this.articles[i]._id === params._id){
                    this.articles.splice(i,1)
                    break
                }
            }
         });
     }

     @action 
    async updateArticle(params) {
        let res = await api.updateArticle(params)
        return res
         runInAction(() => {
            for(let i=0;i<this.articles.length;i++){
                if(this.articles[i]._id === params._id){
                    this.articles.splice(i,1,params)
                    break
                }
            }
         });
     }

    @action 
     async updateArticles(params) {
         this.articles = params
    }
}

var articleStore = new ArticleStore();
export default articleStore;