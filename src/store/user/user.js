import { message } from 'antd';

import {observable, action, runInAction, useStrict , computed} from 'mobx'
import api from '../../api/index'


useStrict(true)

class UserStore {
    @observable users = [];
    

    constructor() {
        this.users = observable([])
        this.user = observable([])
        this.modal = observable({
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
        })
        this.fields = observable({
            email: '',
            password: '',
        })
    }

    @action 
    async login(params) {
        let res = await api.login(params)
        let users = res.data.data
        localStorage.setItem('token',users.token)
         runInAction(() => {
             this.user = users
         })
         return res
     }

     @action 
    async register(params) {
        let res = await api.register(params)
        let users = res.data.data
        localStorage.setItem('token',users.token)
         runInAction(() => {
             this.user = users
         })
         return res
     }

    @action 
    async addUser(params) {       
        try {
            this.modal.confirmLoading = true
            let res = await api.addUser(params)
            let user = res.data.data
            runInAction(() => {
                this.users.push(user)
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
    async getUser(params) {
        let res = await api.getUsers(params)
        let users = res.data.data
         runInAction(() => {
             this.users = users
         });
     }

     @action 
    async deleteUser(params) {
        let res = await api.deleteUser(params)
         runInAction(() => {
            for(let i=0;i<this.users.length;i++){
                if(this.users[i]._id === params._id){
                    this.users.splice(i,1)
                    break
                }
            }
         });
     }

     @action 
    async updateUser(params) {
        let res = await api.updateUser(params)
         runInAction(() => {
            for(let i=0;i<this.users.length;i++){
                if(this.users[i]._id === params._id){
                    this.users.splice(i,1,params)
                    break
                }
            }
         });
     }

     @action 
     async updateUsers(params) {
         this.users = params
    }
    
}

var userStore = new UserStore();
export default userStore;