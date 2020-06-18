import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vue2TouchEvents from 'vue2-touch-events'
import VueWindowSize from 'vue-window-size';


import 'swiper/css/swiper.css'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(Vue2TouchEvents)
Vue.use(VueWindowSize);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
