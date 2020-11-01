import axios from 'axios'

const user = localStorage.getItem('user')

export default {
    state: () => ({
        data: user ? JSON.parse(user) : {}
    }),

    mutations: {
        setUser(state, data) {
            state.data = data
            localStorage.setItem('user', JSON.stringify(data))
        }
    },

    actions: {
        login(user) {
            return axios.post('http://localhost:8000', user)
                .then(res => {
                    return res
                })
                .catch(err => {
                    return err
                })
        }
    }
}
