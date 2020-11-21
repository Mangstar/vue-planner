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

import { mapGetters } from 'vuex';

export default {
  name: 'App',

  components: {
    authUser
  },

  directives: {},

  data: () => ({
    //
  }),

  computed: {
    ...mapGetters('auth', [
      'login'
    ])
  },

  created ()
  {
    if (localStorage['auth-token'])
    {
      http.defaults.headers.common['auth-token'] = localStorage['auth-token'];
    }
    console.log(3333);

    router.beforeEach((to, from, next) => {
      if (!(to.name === 'login' || to.name === 'register') && http.defaults.headers.common['auth-token'] == null)
      {
        next({ name: 'login' });
      }
      else
      {
        next();
      }
    });
  },

  methods: {},
};
</script>
