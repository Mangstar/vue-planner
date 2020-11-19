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

  methods: {},
};
</script>
