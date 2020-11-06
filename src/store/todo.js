import api from '@/service'
const ObjectID = require("bson-objectid")

const saveData = (state) => {
    localStorage.setItem('data-todo', JSON.stringify(state.data))
    localStorage.setItem('del-data-promise', JSON.stringify(state.delDataPromise))
}

let data = localStorage['data-todo'] ? JSON.parse(localStorage.getItem('data-todo')) : []
let delDataPromise = localStorage['del-data-promise'] ? JSON.parse(localStorage.getItem('del-data-promise')) : []

export default {
    state: () => ({
        data,
        delDataPromise
    }),

    getters: {
        getActiveToDo: state => state.data.filter(item => !item.status),
        getCompletedToDo: state => state.data.filter(item => item.status)
    },

    mutations: {
        setToDos(state, todos) {
            state.data = todos
        },
        setToDo(state, todo) {
            if (todo != '') {
                state.data.push(todo)
            }
            saveData(state)
        },
        deleteToDo(state, _id) {
            state.delDataPromise.push({_id})
            state.data.splice(state.data.findIndex(item => item._id === _id), 1)
            saveData(state)
        },
        deleteAllToDo(state) {
            let tmp = state.data.filter(item => item.status)
            tmp.forEach(item => {
                state.delDataPromise.push({_id: item._id})
                state.data.splice(state.data.findIndex(el => el._id === item._id), 1)
            })
            saveData(state)
        },
        saveToDo(state) {
            saveData(state)
        },
        updateToDo(state, payload) {
            state.data.find(item => item._id === payload._id).text = payload.text.trim()
            saveData(state)
        }
    },

    actions: {
        getTodos({commit, state}) {
            api().post('/api/todo/todos', {data: [...state.data, ...state.delDataPromise]})
                .then(res => {
                    localStorage.removeItem('del-data-promise')
                    commit('setToDos', res.data.todos)
                    commit('saveToDo')
                })
                .catch(err => console.log(err))
        },
        setToDo({commit}, text) {
            let user = {
                text,
                status: false,
                date: new Date,
                _id: ObjectID().str
            }
            commit('setToDo', user)
            api().post('/api/todo/new', user)
                .catch(err => {
                    console.log(err)
                })
        },
        updateToDo({commit}, payload) {
            if (payload.text.trim() != '') {
                commit('updateToDo', payload)
                api().put('/api/todo/update', payload)
                    .catch(err => console.log(err))
            }
        },
        deleteToDo({commit}, payload) {
            if (payload === 'all')  {
                commit('deleteAllToDo')
            } else {
                commit('deleteToDo', payload)
            }
            api().delete(`/api/todo/${payload}`)
                .catch(err => console.log(err))
        }
    }
}
