import axios from 'axios';
import {store} from '../store/index'

let instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})
instance.interceptors.request.use((request) => {
    if (store.state.user.data.token) {
        request.headers.Authorization = 'Bearer ' + store.state.user.data.token
    }
    if (Object.entries(store.state.user.data).length !== 0) return request
    throw ({message:"you are not authorized"})
})
instance.interceptors.response.use((response) => {
    return response
}, er => {
    return Promise.reject(er)
})

export default instance

