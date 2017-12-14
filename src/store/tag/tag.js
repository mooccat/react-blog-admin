import { message } from 'antd';

import {observable, action, runInAction, useStrict , computed} from 'mobx'
import api from '../../api/index'


useStrict(true)

class TagStore {
    @observable tags = [];
    

    constructor() {
        this.tags = observable([])
        this.modal = observable({
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
        })
        this.fields = observable({
            name: '',
        })
    }


    @action 
    async addTag(params) {       
        try {
            this.modal.confirmLoading = true
            let res = await api.addTag(params)
            let tag = res.data.data
            runInAction(() => {
                this.tags.push(tag)
                this.modal.confirmLoading = false
                this.resetFields()
                this.closeModal()
            });
        } catch (err) {
            runInAction(() => {
                this.modal.confirmLoading = false
                message.success(err.response.data.errmsg,1)
            })
        }
    }

    @action 
    async getTag(params) {
        let res = await api.getTags(params)
        let tags = res.data.data
         runInAction(() => {
             this.tags = tags
         });
     }

     @action 
    async deleteTag(params) {
        let res = await api.deleteTag(params)
         runInAction(() => {
            for(let i=0;i<this.tags.length;i++){
                if(this.tags[i]._id === params._id){
                    this.tags.splice(i,1)
                    break
                }
            }
         });
     }

     @action 
    async updateTag(params) {
        let res = await api.updateTag(params)
         runInAction(() => {
            for(let i=0;i<this.tags.length;i++){
                if(this.tags[i]._id === params._id){
                    this.tags.splice(i,1,params)
                    break
                }
            }
         });
     }

     @action 
     async updateTags(params) {
         this.tags = params
    }

     @action 
     async showModal(params) {
         this.modal.visible = true
    }

    @action 
     async modifyFields(params) {
        for(let key in params){
            this.fields[key] = params[key].value
        }
    }

    @action 
     async resetFields() {
         this.fields = {
             name:"",
             isShow:'true'
         }
    }

    @action 
     async closeModal(params) {
         this.modal.visible = false
    }
}

var tagStore = new TagStore();
export default tagStore;