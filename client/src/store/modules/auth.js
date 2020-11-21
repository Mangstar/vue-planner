import http from '@/api/index';
import axios from 'axios';

export default {
  namespaced: true,

  state: {
    id: null,
    login: null,
    accessToken: null,
    refreshToken: null
  },

  getters: {
    id (state)
    {
      return state.id;
    },

    login (state)
    {
      return state.login
    },

    accessToken (state)
    {
      return state.accessToken;
    },

    refreshToken (state)
    {
      return state.refreshToken;
    }
  },

  mutations: {
    setId (state, payload)
    {
      state.id = payload;
    },

    setLogin (state, payload)
    {
      state.login = payload;
    },

    setAccessToken (state, payload)
    {
      state.accessToken = payload;
    },

    setRefreshToken (state, payload)
    {
      state.refreshToken = payload;
    }
  },

  actions: {
    async register (context, payload)
    {
      let { data } = await http.post('/auth/register', payload);

      return data;
    },

    async login ({ commit }, payload)
    {
      let { data: response } = await http.post('/auth/login', payload, { withCredentials: true });

      if (response.success)
      {
        commit('setId', response.data.id);
        commit('setLogin', response.data.login);
        commit('setAccessToken', response.data.accessToken);
        commit('setRefreshToken', response.data.refreshToken);
      }

      return response;
    },

    async refresh ({ commit }, payload)
    {
      let { data: response } = await http.post('/auth/reftoken', payload);

      if (response.success)
      {
        commit('setAccessToken', response.data.accessToken);
        commit('setRefreshToken', response.data.refreshToken);
      }

      return response;
    },

    async logout (context)
    {
      let { data } = await http.post('/auth/logout', null, { withCredentials: true });

      return data;
    }
  }
}