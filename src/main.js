import { createApp } from 'vue'
import App from './pages/App.vue'
const app = createApp(App)


import './assets/css/tailwind.css'

import './registerServiceWorker'

import { store } from './store/index'
app.use(store)

import NotificationsPlugin from "@/components/Notifications/notify.js";
app.use(NotificationsPlugin)

app.mount('#app')
