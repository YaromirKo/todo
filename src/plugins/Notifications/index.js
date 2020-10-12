import {reactive, inject} from "vue";

const initialization = () => {
    const notification = reactive({
        arr: []
    })

    const set = (obj) => {
        let id = Date.now()
        notification.arr.push({
            id,
            timer: obj.timer ? closeByTimer(id, obj.timer) : ()=>{},
            ...obj
        })
    }
    const close = (id) => {
        const indexToDelete = notification.arr.findIndex(n => n.id === id);
        if (indexToDelete !== -1) {
            notification.arr.splice(indexToDelete, 1);
        }
    }
    const closeByTimer = (id, timer) => setTimeout(() => { close(id) }, timer)

    const get = () => notification.arr


    return {
        notification,
        set, get, close
    }

}
export const notification = Symbol('notification')
// export const provideNotification = () => provide(notification, initialization())

export const injectNotification = () => inject(notification)

export const Notify = {
    install: (app) => {
        app.provide(notification, initialization())
        app.config.globalProperties.$notify = obj => {
            injectNotification().set(obj)
        }
    }
}




