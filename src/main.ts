import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Equal from '../node_modules/equal-vue'
import Config from '../node_modules/equal-vue/dist/theme/light' // or light / dark theme
import { inject } from '@vercel/analytics'

const app = createApp(App)

app.use(Equal, Config)
app.use(createPinia())
app.use(router)
inject()

app.mount('#app')
