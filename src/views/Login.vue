<template>
  <v-row justify="center" align="center">
    <v-col cols="4" align-self="center">
      <v-form
        ref="form"
        v-model="isValid"
        lazy-validation
      >
        <v-text-field
          v-model="email"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          name="input-10-2"
          label="Введите пароль"
          class="input-group--focused"
          @click:append="showPass = !showPass"
        ></v-text-field>

        <v-btn
          :disabled="!isValid"
          color="success"
          class="mr-4"
          @click="login"
        >
          Войти
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

    email: '',
    password: '',

    showPass: false
  }),

  computed: {},

  methods: {
    login () {

    }
  }
}
</script>