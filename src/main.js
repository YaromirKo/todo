import { createApp } from 'vue'
import App from './pages/App.vue'
const app = createApp(App)


import './assets/css/tailwind.css'

import './registerServiceWorker'

import { store } from './store/index'
app.use(store)


import {notification, initialization} from '@/components/Notifications'
app.provide(notification, initialization())

app.mount('#app')
