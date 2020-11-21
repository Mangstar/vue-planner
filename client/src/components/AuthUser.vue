<template>
  <div class="auth-user-wr">
    <div class="auth-user">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs"
                 v-on="on"
                 text
          >
            {{ login }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in menuItems"
                      :key="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn color="success" class="auth-user-btn" @click="logout">
        Выйти
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import http from '@/api/index';

export default {
  name: 'auth-user',

  data: () => ({
    menuItems: [
      {
        title: 'Профиль'
      }
    ]
  }),

  computed: {
    ...mapGetters('auth', [
      'login'
    ])
  },

  methods: {
    async logout ()
    {
      try {
        const response = await this.$store.dispatch('auth/logout');

        if (response.success)
        {
          localStorage.removeItem('auth-token');
          delete http.defaults.headers.common['auth-token'];

          this.$router.push({
            name: 'login'
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.auth-user-wr
{
  margin-left: auto;
}

.auth-user
{
  padding: 12px;

  &-btn
  {
    margin-left: 10px;
  }
}
</style>