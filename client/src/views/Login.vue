<template>
  <v-row justify="center" align="center">
    <v-col cols="4" align-self="center">
      <v-form ref="form"
              v-model="isValid"
              lazy-validation
      >
        <v-text-field v-model="login"
                      label="Login *"
                      required
        ></v-text-field>

        <v-text-field v-model="password"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPass ? 'text' : 'password'"
                      name="input-10-2"
                      label="Введите пароль *"
                      class="input-group--focused"
                      @click:append="showPass = !showPass"
        ></v-text-field>

        <v-btn :disabled="!isValid"
               color="success"
               class="mr-4"
               @click="logIn"
        >
          Войти
        </v-btn>

         <v-btn color="primary"
                class="mr-4"
                @click="toRegisterPage"
        >
          Зарегистрироваться
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'app-login',

  data: () => ({
    isValid: true,

    login: '',
    password: '',

    showPass: false
  }),

  computed: {},

  methods: {
    async logIn ()
    {
      let response = null;
      let reqParams = {
        login: this.login,
        password: this.password
      };

      try
      {
        response = await this.$store.dispatch('auth/login', reqParams);

        if (response.success)
        {
          this.$router.push({
            name: 'home'
          });
        }
      }
      catch (err)
      {
        console.log(err);
      }
    },

    toRegisterPage ()
    {
      this.$router.push({
        name: 'register'
      });
    }
  }
}
</script>