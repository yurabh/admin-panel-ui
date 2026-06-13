import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";
import router from "@/router";
import apiClients from "@/plugins/apiClients.ts";

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(apiClients())

app.mount('#app')
