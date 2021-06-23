import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  state: {
    isloading: false,
    upcomingmovies: [],
    topmovies: [],
    token: 'a68018451d7655d40c86174b335e15c3',
    API: 'https://api.themoviedb.org/3/movie/',
    ImageAPI: 'https://image.tmdb.org/t/p/w500/',
    toppage: 1,
    upcommingpage: 1,
    topallpage: 1,
    upcomingallpage: 1
  },
  mutations: {
    set_loading_status (state, status) {
      state.isloading = status
    },
    set_top_movies (state, data) {
      state.topmovies = data
    },
    set_upcoming_movies (state, data) {
      state.upcomingmovies = data
    },
    set_topallpage (state, data) {
      state.topallpage = data
    },
    set_upcomingallpage (state, data) {
      state.upcomingallpage = data
    }
  },
  actions: {
    async fetch_top_movie_data (context) {
    //   context.commit('set_loading_status', true)
      await Vue.axios.get(this.state.API + 'top_rated', {
        params: {
          api_key: this.state.token,
          language: 'en-US',
          page: this.state.toppage
        }
      }).then((response) => {
        // context.commit('set_loading_status', false)
        context.commit('set_top_movies', response.data.results)
        context.commit('set_topallpage', response.data.total_pages)
      })
    },
    async fetch_upcoming_movie_data (context) {
    //   context.commit('set_loading_status', true)
      await Vue.axios.get(this.state.API + 'upcoming', {
        params: {
          api_key: this.state.token,
          language: 'en-US',
          page: this.state.upcommingpage
        }
      }).then((response) => {
        // context.commit('set_loading_status', false)
        context.commit('set_upcoming_movies', response.data.results)
        context.commit('set_upcomingallpage', response.data.total_pages)
      })
    }
  }
})
