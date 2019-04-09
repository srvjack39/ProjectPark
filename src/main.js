import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import firebase from 'firebase'
// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VueSweetalert2 from 'vue-sweetalert2'
import VueFusionCharts from 'vue-fusioncharts'
import FusionCharts from 'fusioncharts'
import Column2D from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import BootstrapVue from 'bootstrap-vue'
import Button from 'bootstrap-vue/es/components/button'
import BButton from 'bootstrap-vue/es/components/button/button'
Vue.component('b-button', BButton)
Vue.use(Button)
Vue.use(BootstrapVue)
Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);

let storageRef = firebase.storage().ref()
Vue.directive('url', {
  async bind (el, binding) {
    let url = await storageRef.child(binding.value.filename).getDownloadURL()
    el.src = url
  }
})
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(VueSweetalert2)
Vue.use(Buefy)
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(VueFusionCharts, FusionCharts)
// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  created () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('App login')
        this.$store.dispatch('autoSign', user)
      } else {
        console.log('App logout')
      }
    })
  }
})
