import { createStore } from 'vuex'

const saveData = (state) => {
    localStorage.setItem('data-todo', JSON.stringify(state.data))
}

export const store = createStore({

    state: () => ({
        data: localStorage['data-todo'] ? JSON.parse(localStorage.getItem('data-todo')) : []
    }),

    getters: {
        getActiveToDo: state => state.data.filter(item => !item.status),
        getCompletedToDo: state => state.data.filter(item => item.status)
    },

    mutations: {
        setToDo(state, todo) {
            if (todo != '') {
                state.data.push({
                    id: state.data.length + 1,
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
        }
    }
})
