import api from '@/service'
const ObjectID = require("bson-objectid")

const saveData = (state) => {
    localStorage.setItem('data-todo', JSON.stringify(state.data))
    localStorage.setItem('del-data-promise', JSON.stringify(state.delDataPromise))
}

let data = localStorage['data-todo'] ? JSON.parse(localStorage.getItem('data-todo')) : []
let delDataPromise = localStorage['del-data-promise'] ? JSON.parse(localStorage.getItem('del-data-promise')) : []


function getObj(text, group, mode) {
    return {
        mode,
        text,
        group: group || 'all',
        status: false,
        date: Date.now(),
        _id: ObjectID().str
    }
}

function convertTextByMode(mgt) {
    if (mgt.mode === 'note') {
        return [getObj(mgt.text.trim(), mgt.group, mgt.mode)]
    } else if (mgt.mode === 'todo') {
        return mgt.text.split('\n').reduce((accum, line) => {
            if (line.length !== 0) accum.push(getObj(line.trim(), mgt.group, mgt.mode))
            return accum
        }, [])
    }
}

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
            state.data.push(...todo)
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
            if (payload.mode !== 'checkbox') {
                state.data.find(item => item._id === payload._id).text = payload.text.trim()
            }
            state.data.find(item => item._id === payload._id).date = payload.date
            saveData(state)
        },
        deleteDataPromise(state) {
            state.delDataPromise = []
        }
    },

    actions: {
        getTodos({commit, state}) {
            api.post('/api/todo/todos', {data: [...state.data, ...state.delDataPromise]})
                .then(res => {
                    commit('setToDos', res.data.result)
                    commit('deleteDataPromise')
                    commit('saveToDo')
                })
                .catch(err => console.log(err))
        },
        newToDo({commit}, payload) {
            if (payload.text.trim().length !== 0) {
                let newTodo = convertTextByMode(payload)
                commit('setToDo', newTodo)
                api.post('/api/todo/new', newTodo)
            }
        },
        updateToDo({commit}, payload) {
            let _payload = {
                _id: payload.item._id,
                date: Date.now(),
            }
            if (payload.mode === 'checkbox') {
                _payload.status = payload.item.status
            } else {
                let newText = payload.event.target.innerText.trim()
                let oldText = payload.item.text
                if (newText != '' && newText !== oldText) {
                    _payload.text = newText
                }
            }
            if (Object.entries(_payload).length >= 3) {
                commit('updateToDo', {
                    ..._payload,
                    mode: payload.mode
                })
                api.put('/api/todo/update', _payload)
                    .catch(err => console.log(err))
            }
        },
        deleteToDo({commit}, payload) {
            if (payload === 'all')  {
                commit('deleteAllToDo')
            } else {
                commit('deleteToDo', payload)
            }
            api.delete(`/api/todo/${payload}`)
                .catch(err => console.log(err))
        }
    }
}
