const saveData = (state) => {
    localStorage.setItem('data-todo', JSON.stringify(state.data))
}

const createID = () => {
    return Array(16)
        .fill(0)
        .map(() => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
        .join('') + Date.now().toString(24);
}

let data = localStorage['data-todo'] ? JSON.parse(localStorage.getItem('data-todo')) : []

export default {
    state: () => ({
        data
    }),

    getters: {
        getActiveToDo: state => state.data.filter(item => !item.status),
        getCompletedToDo: state => state.data.filter(item => item.status)
    },

    mutations: {
        setToDo(state, todo) {
            if (todo != '') {
                state.data.push({
                    id: createID(),
                    item: todo,
                    status: false,
                    date: ''
                })
            }
            saveData(state)
        },
        deleteToDo(state, id) {
            state.data.splice(state.data.findIndex(item => item.id === id), 1)
            saveData(state)
        },
        deleteAllToDo(state) {
            let tmp = state.data.filter(item => item.status)
            tmp.forEach(item => {
                state.data.splice(state.data.findIndex(el => el.id === item.id), 1)
            })
            saveData(state)
        },
        saveToDo(state) {
            saveData(state)
        },
        updateToDo(state, payload) {
            state.data.find(item => item.id === payload.id).item = payload.text.trim()
        }
    },

    actions: {
        updateToDo({commit}, payload) {
            if (payload.text.trim() != '') {
                commit('updateToDo', payload)
            } else {
                commit('deleteToDo', payload.id)
            }
            commit('saveToDo')
        }
    }
}
