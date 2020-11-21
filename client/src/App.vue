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
      <router-view v-if="rendered" />
    </v-main>
  </v-app>
</template>

<script>
import authUser from '@/components/AuthUser';
import http from '@/api/index';
import router from '@/router/index';

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

  created ()
  {
    const commonReqHeaders = http.defaults.headers.common;
    const accessToken = localStorage['auth-token'];

    if (accessToken)
    {
      const [, payload] = accessToken.split('.');
      const payloadEncoded = JSON.parse(atob(payload));
      const login = payloadEncoded.login;

      commonReqHeaders['auth-token'] = accessToken;
      this.setLogin(login);
    }
    else
    {
      this.$router.push({
        name: 'login'
      });
    }

    this.$nextTick(() => {
      this.rendered = true;
    });

    router.beforeEach((to, from, next) => {
      if (!(to.name === 'login' || to.name === 'register') && commonReqHeaders['auth-token'] == null)
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
    $route: {
      deep: true,
      handler ()
      {
        console.log(888);
      }
    }
  },

  methods: {
    ...mapMutations('auth', [
      'setLogin'
    ]),
  },
};
</script>
