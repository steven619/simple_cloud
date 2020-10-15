import Vue from 'vue'
import App from './App.vue'

import store from './store'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import ConfirmMessage from './components/common/confirm_message.vue'
Vue.component('confirm-message',ConfirmMessage)

import Component from 'vue-class-component'

Component.registerHooks([
  'onLoad', 'onShow', 'onReady', 'onHide', 'onUnload', 'onResize', 'onReachBottom'
])

Vue.config.productionTip = false

// Vue.prototype.$store = store
Vue.prototype.$log = console.log
Vue.prototype.$js = JSON.stringify
Vue.prototype.CustomBar = 80

new Vue({
  store,
  render: (h) => h(App)
}).$mount()
