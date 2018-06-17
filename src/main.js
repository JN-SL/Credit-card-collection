// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// import fonts
import './assets/fonts/Courier/courier.css'
import './assets/fonts/HelveticaNeue/HelveticaNeue.css'
import './assets/fonts/OCRAExtended/OCRAExtended.css'

// import components
import creditCard from './components/credit-card'

Vue.config.productionTip = false

Vue.component('credit-card', creditCard)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
