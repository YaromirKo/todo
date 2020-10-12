import { createApp } from 'vue'
import App from './pages/App.vue'
const app = createApp(App)


import './assets/css/tailwind.css'

import './registerServiceWorker'

import { store } from './store/index'
app.use(store)


import {Notify} from '@/plugins/Notifications'
app.use(Notify)

// import clickOutside from './plugins/click-outside.js'
// app.directive('click-outside', clickOutside);

app.mount('#app')
