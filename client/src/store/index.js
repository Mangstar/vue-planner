import Vue from 'vue';
import Vuex from 'vuex';

import http from '@/api/index';

import AuthModule from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: AuthModule
  },

  state: {},

  getters: {},

  mutations: {},

  actions: {
    async fetchPosts ()
    {
      const response = await http.get('/api/posts');

      return response;
    }
  }
});
