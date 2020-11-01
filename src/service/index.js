import axios from 'axios';
import {store} from '../store/index'

export default () => {
    let instance = axios.create({
        baseURL: 'http://localhost:8000'
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
        // if (er.response && er.response.status == 401) {
        //     store.dispatch('user/logout').then(() => {
        //         redirect('/login')
        //     })
        // }
        //     // else if (er.response && er.response.status) {
        //     //   error({statusCode: er.response.status})
        // // }
        // else if (er.response && er.response.status === 403) {
        //     error({statusCode: er.response.status})
        // } else if (er.response && er.response.status === 402) {
        //     error({statusCode: er.response.status})
        // } else if (er.response && er.response.status === 404) {
        //     error({statusCode: er.response.status})
        // }
        return Promise.reject(er)
    })

    return instance
}

