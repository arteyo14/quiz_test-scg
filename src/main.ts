import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.component('Vue3EasyDataTable', Vue3EasyDataTable)

app.mount('#app')
