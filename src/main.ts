import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import vuetify from './plugins/vuetify'
import Fragment from 'vue-fragment'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.config.productionTip = false
Vue.use(Fragment.Plugin)
Vue.use(Toast)

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
