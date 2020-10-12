import { createApp } from 'vue'
import App from './pages/App.vue'
const app = createApp(App)


import './assets/css/tailwind.css'

import './registerServiceWorker'

import { store } from './store/index'
app.use(store)


import {Notify} from '@/components/Notifications'
app.use(Notify)

app.mount('#app')
