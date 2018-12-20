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

let storageRef = firebase.storage().ref()
Vue.directive('url', {
  async bind (el, binding) {
    let url = await storageRef.child(binding.value.filename).getDownloadURL()
    el.src = url
  }
})
Vue.config.productionTip = false

Vue.use(Buefy)
// plugin setup
Vue.use(VueRouter)
Vue.use(LightBootstrap)
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
