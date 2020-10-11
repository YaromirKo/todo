import {reactive, inject} from "vue";

export const initialization = () => {
    const notification = reactive({
        arr: [],
        timer: []
    })

    const set = (obj) => {
        console.log(obj)
        notification.arr.push({
            id: Date.now(),
            ...obj
        })
    }
    const close = (id) => {
        const indexToDelete = notification.arr.findIndex(n => n.id === id);
        if (indexToDelete !== -1) {
            notification.arr.splice(indexToDelete, 1);
        }
    }
    const get = () => notification.arr

    return {
        notification,
        set, get, close
    }

}


export const notification = Symbol('notification')

// export const provideNotification = () => provide(notification, initialization())

export const injectNotification = () => inject(notification)
