import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './routes'
import store from './Store/store'
import Vuelidate from 'vuelidate'

import { MdCard } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

import Button from './components/UI/Button.vue';
Vue.component('app-button', Button);

/*Material*/
Vue.use(MdCard)

/*Vue Resource*/
Vue.use(VueResource)
Vue.http.options.root='https://gamespot-3293a.firebaseapp.com/'

/*Vuelidate*/
Vue.use(Vuelidate);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
