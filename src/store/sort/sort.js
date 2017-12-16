import { message } from 'antd';

import {observable, action, runInAction, useStrict , computed} from 'mobx'
import api from '../../api/index'


useStrict(true)

class SortStore {
    @observable sorts = [];
    

    constructor() {
        this.sorts = observable([])
        this.modal = observable({
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
        })
        this.fields = observable({
            name: '',
            isShow: 'true',
        })
    }


    @action 
    async addSort(params) {       
        try {
            this.modal.confirmLoading = true
            let res = await api.addSort(params)
            let sort = res.data.data
            runInAction(() => {
                this.sorts.push(sort)
                this.modal.confirmLoading = false
                this.resetFields()
                this.closeModal()
            });
        } catch (err) {
            runInAction(() => {
                this.modal.confirmLoading = false
            })
        }
    }

    @action 
    async getSort(params) {
        let res = await api.getSorts(params)
        let sorts = res.data.data
         runInAction(() => {
             this.sorts = sorts
         });
     }

     @action 
    async deleteSort(params) {
        let res = await api.deleteSort(params)
         runInAction(() => {
            for(let i=0;i<this.sorts.length;i++){
                if(this.sorts[i]._id === params._id){
                    this.sorts.splice(i,1)
                    break
                }
            }
         });
     }

     @action 
    async updateSort(params) {
        let res = await api.updateSort(params)
         runInAction(() => {
            for(let i=0;i<this.sorts.length;i++){
                if(this.sorts[i]._id === params._id){
                    this.sorts.splice(i,1,params)
                    break
                }
            }
         });
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
    @action 
     async updateSorts(params) {
         this.sorts = params
    }
}

var sortStore = new SortStore();
export default sortStore;