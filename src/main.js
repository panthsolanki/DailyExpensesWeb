import Vue from 'vue'
import VueLodash from 'vue-lodash'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const options = { name: 'lodash' } // customize the way you want to call it
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueLodash, options) // options is optional