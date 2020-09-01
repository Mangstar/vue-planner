<template>
  <v-row justify="center" align="center">
    <v-form
      ref="form"
      v-model="isValid"
      lazy-validation
    >
      <v-text-field
        v-model="$v.name.$model"
        label="Имя"
        required
      ></v-text-field>

      <v-text-field
        v-model="$v.email.$model"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="$v.password.$model"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPass ? 'text' : 'password'"
        name="input-10-2"
        label="Придумайте пароль"
        hint="Не менее 10 символов"
        class="input-group--focused"
        @click:append="showPass = !showPass"
      ></v-text-field>

      <v-text-field
        v-model="$v.passwordCheck.$model"
        :append-icon="showPassCheck ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassCheck ? 'text' : 'password'"
        name="input-10-2"
        label="Повторите ваш пароль"
        hint="Не менее 10 символов"
        class="input-group--focused"
        @click:append="showPassCheck = !showPassCheck"
      ></v-text-field>

      <v-btn
        :disabled="!isValid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Зарегистрироваться
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Очистить форму
      </v-btn>
    </v-form>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
  name: 'app-register',

  mixins: [validationMixin],

  data: () => ({
    isValid: true,

    name: '',
    email: '',
    password: '',
    passwordCheck: '',

    showPass: false,
    showPassCheck: false
  }),

  validations: {
    name: { required },
    email: { required },
    password: { required },
    passwordCheck: { required }
  },

  methods: {
    validate () {
      this.$refs.form.validate()
    },

    reset () {
      this.$refs.form.reset()
    },

    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>