import { createStore } from 'vuex'

import todo from './todo'
import user from './user'

export const store = createStore({
    modules: {
        todo,
        user
    }
})
