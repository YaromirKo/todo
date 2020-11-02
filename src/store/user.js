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
        login({commit}, credential) {
            return axios.post('http://localhost:8000/api/auth/login', credential)
                .then(res => {
                    commit('setUser', res.data)
                    return { status: 1 }
                })
                .catch(err => {
                    return err
                })
        }
    }
}
