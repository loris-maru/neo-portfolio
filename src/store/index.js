import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isNavOpen: false,
    onPageProject: false
  },
  ////////////
  mutations: {
    toggleNav(state) {
      state.isNavOpen = !state.isNavOpen
      console.log('The Nav is Open: ', state.isNavOpen)
    },
    onProject(state) {
      if (this.$route.name == 'Project') {
        state.onPageProject == true
      }
    }
  },
  ///////////
  actions: {
  },
  ///////////
  modules: {
  }
})
