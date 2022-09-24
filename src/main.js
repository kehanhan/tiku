import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

createApp(App).use(router).use(Varlet).mount('#app')
