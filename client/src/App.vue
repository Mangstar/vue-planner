<template>
  <v-app>
    <v-app-bar app
               color="primary"
               dark
    >
      <v-row align="center" justify="space-between">
        <auth-user v-if="login" />
      </v-row>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import authUser from '@/components/AuthUser';
import http from '@/api/index';
import router from '@/router/index';
import axios from 'axios';

import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',

  components: {
    authUser
  },

  directives: {},

  data: () => ({
    rendered: false
  }),

  computed: {
    ...mapGetters('auth', [
      'login'
    ])
  },

  async created ()
  {
    const httpCommonReqHeaders = http.defaults.headers.common;
    const accessToken = localStorage['auth-token'];

    if (accessToken)
    {
      const [, payload] = accessToken.split('.');
      const payloadEncoded = JSON.parse(atob(payload));
      const user = {
        id: payloadEncoded.id,
        login: payloadEncoded.login
      };

      httpCommonReqHeaders['auth-token'] = accessToken;

      this.setId(user.id);
      this.setLogin(user.login);
    }
    else
    {
      this.$router.push({
        name: 'login'
      });
    }

    router.beforeEach((to, from, next) => {
      if (!(to.name === 'login' || to.name === 'register') && httpCommonReqHeaders['auth-token'] == null)
      {
        next({ name: 'login' });
      }
      else
      {
        next();
      }
    });
  },

  watch: {

  },

  methods: {
    ...mapMutations('auth', [
      'setId',
      'setLogin'
    ]),
  },
};
</script>
