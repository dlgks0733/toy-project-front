import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import vuetify from './plugins/vuetify'
import Fragment from 'vue-fragment'

Vue.config.productionTip = false
Vue.use(Fragment.Plugin)

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
