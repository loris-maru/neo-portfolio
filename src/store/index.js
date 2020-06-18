import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isNavOpen: false
  },
  ////////////
  mutations: {
    toggleNav() {
     this.isNavOpen = !this.isNavOpen
     console.log('The Nav is Open: ', this.state.isNavOpen)
    }
  },
  ///////////
  actions: {
  },
  ///////////
  modules: {
  }
})
