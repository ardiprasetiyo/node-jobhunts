import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    views: 0
  },
  mutations: {
    addView(state){
      state.views++
    }
  },
  actions: {
  },
  modules: {
  }
})
