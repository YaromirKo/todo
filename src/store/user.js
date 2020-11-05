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
        },
        logout(state) {
            state.data = {}
            localStorage.removeItem('user')
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
                    return {status: 0, err}
                })
        },
        logout({commit}) {
            commit('logout')
        }
    }
}
