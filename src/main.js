import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import router from './routes'
import store from './Store/store'
import Vuelidate from 'vuelidate'

import wysiwyg from 'vue-wysiwyg'

import { MdCard, MdDialog, MdButton, MdContent } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

import Button from './components/UI/Button.vue';
Vue.component('app-button', Button);

/*Material*/
Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdDialog)
Vue.use(MdContent)

/*Vue Resource*/
Vue.use(VueResource)
Vue.http.options.root='https://gamespot-3293a.firebaseio.com/'

/*Vuelidate*/
Vue.use(Vuelidate);

/* WYSIWYG */
Vue.use(wysiwyg, {});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
