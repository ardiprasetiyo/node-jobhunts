import Vue from 'vue'
import Vuex from 'vuex'
import Request from '@/library/Request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentJobs: {
      jobs: [],
      totalJobs: 0
    },
    currentCv: {
    },
  },
  mutations: {
    setCurrentJobs(state, payload) {
      state.currentJobs.jobs = []
      state.totalJobs = 0

      const jobs = payload.data[0]
      const totalJobs = jobs.count.length > 0 ? jobs.count[0].total_jobs : 0

      for (let job of jobs.data) {
        state.currentJobs.jobs.push(job)
      }

      state.currentJobs.totalJobs = totalJobs
    },

    setCurrentCv(state, payload){
      state.currentCv = payload || {}
    },

  },
  actions: {
    async getJobs(state, payload = {}) {
      const page = payload.page || 1
      const searchQuery = payload.searchQuery
      const category = payload.category
      const isVocational = payload.isVocational

      let url = `${process.env.VUE_APP_API_SERVER_URL}/api/v1/jobs?page=${page}`
      if (searchQuery) url += `&searchQuery=${searchQuery}`
      if (isVocational) url += `&vocationalLevel=1`
      if (category) {
        for (let categoryName of category) {
          url += `&category=${categoryName}`
        }
      }

      const response = await Request.Request({
        requestUrl: url,
        requestMethod: 'GET'
      })
      if (response.errors.status) {
        console.log(`ERROR ${response.errrors.reason}`)
        return
      }

      state.commit('setCurrentJobs', response.data)
    },

    async getCv(state, payload = {}){
      let cvId = payload.cvId
      if( !cvId ) return
      let url = `${process.env.VUE_APP_API_SERVER_URL}/api/v1/cv/${cvId}`
      let response = await Request.Request({
        requestUrl: url,
        requestMethod: "GET"
      })
      if( response.errors.status ){
        console.log(`[ERROR] ${response.errors.reason}`)
        return
      }

      state.commit('setCurrentCv', response.data)
    },

    async storeCv(state, payload = {}){
      let cvData = payload.cvData
      if( !cvData ){
        console.log(`[ERROR] No CV Data`)
        return 
      }

      let url = `${process.env.VUE_APP_API_SERVER_URL}/api/v1/cv/`
      let response = await Request.Request({
        requestUrl: url,
        requestMethod: "POST",
        requestBody: {
          'cv': cvData
        },
        
      })

      if( response.errors.status ){
        console.log(`[ERROR] ${response.errors.reason}`)
        return
      }
    }
  },
  modules: {}
})