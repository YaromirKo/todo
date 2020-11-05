import axios from 'axios';
import {store} from '../store/index'

export default () => {
    let instance = axios.create({
        baseURL: process.env.VUE_APP_API_URL
    })
    instance.interceptors.request.use((request) => {
        if (store.state.user.data.token) {
            request.headers.Authorization = 'Bearer ' + store.state.user.data.token
        }
        return request
    })
    instance.interceptors.response.use((response) => {
        return response
    }, er => {

        return Promise.reject(er)
    })

    return instance
}

