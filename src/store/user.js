import axios from 'axios'

export default {
    state: () => ({
        name: '',
        email: '',
        accessToken: '',
        photo: '',
    }),

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
