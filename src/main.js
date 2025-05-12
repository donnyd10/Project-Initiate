import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import PrimeVue from 'primevue/config'
// import 'primevue/resources/themes/aura-light-green/theme.css' // You can change the theme
// import 'primevue/resources/primevue.min.css'
// import 'primeicons/primeicons.css'
// import 'primeflex/primeflex.css' // Optional utility classes

import App from './App.vue'
import router from './router'

const app = createApp(App)
//app.use(PrimeVue)
app.use(createPinia())
app.use(router)

app.mount('#app')
