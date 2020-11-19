<template>
  <v-row justify="center" align="center">
    <v-col cols="4">
      <v-form ref="form"
              v-model="isValid"
              lazy-validation
              loading
      >
        <v-text-field v-model="$v.login.$model"
                      label="Login *"
                      :error-messages="loginErrors"
                      required
        ></v-text-field>

        <v-text-field v-model="$v.email.$model"
                      label="E-mail"
                      :error-messages="emailErrors"
                      required
        ></v-text-field>

        {{ $v.email.$model }}

        <v-text-field v-model="$v.password.$model"
                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPass ? 'text' : 'password'"
                      :error-messages="passwordErrors"
                      name="input-10-2"
                      label="Придумайте пароль *"
                      hint="Не менее 10 символов"
                      class="input-group--focused"
                      @click:append="showPass = !showPass"
        ></v-text-field>

        <v-text-field v-model="$v.passwordCheck.$model"
                      :append-icon="showPassCheck ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassCheck ? 'text' : 'password'"
                      :error-messages="passwordCheckErrors"
                      name="input-10-2"
                      label="Повторите ваш пароль *"
                      hint="Не менее 10 символов"
                      class="input-group--focused"
                      @click:append="showPassCheck = !showPassCheck"
        ></v-text-field>

        <v-btn :disabled="!isValid"
               color="success"
               class="mr-4"
               @click="register"
        >
          Зарегистрироваться
        </v-btn>

        <v-btn color="primary"
               class="mr-4"
               @click="toLoginPage"
        >
          Войти
        </v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
// import axios from 'axios';
import { validationMixin } from 'vuelidate';
import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'app-register',

  mixins: [validationMixin],

  data: () => ({
    isValid: true,

    login: '',
    email: '',
    password: '',
    passwordCheck: '',

    showPass: false,
    showPassCheck: false,

    isLoading: true
  }),

  computed: {
    loginErrors () {
      const errors = [];

      if (!this.$v.login.$dirty) {
        return errors;
      }

      if (!this.$v.login.minLength) {
        errors.push('Login должен состоять минимум из двух символов');
      }

      if (!this.$v.login.required) {
        errors.push('Поле `login` обязательно');
      }

      return errors;
    },

    emailErrors () {
      const errors = [];

      if (!this.$v.email.$dirty) {
        return errors;
      }

      if (!this.$v.email.email) {
        errors.push('E-mail некорректен');
      }

      return errors;
    },

    passwordErrors () {
      const errors = [];

      if (!this.$v.password.$dirty) {
        return errors;
      }

      if (!this.$v.password.minLength) {
        errors.push('Пароль должен содержать минимум 10 символов');
      }

      if (!this.$v.password.required) {
        errors.push('Поле `пароль` обязателен');
      }

      return errors;
    },

    passwordCheckErrors () {
      const errors = [];

      if (!this.$v.passwordCheck.$dirty) {
        return errors;
      }

      if (!this.$v.passwordCheck.sameAsPassword) {
        errors.push('Введенные пароли не совпадают');
      }

      return errors;
    }
  },

  validations: {
    login: { required, minLength: minLength(2), maxLength: maxLength(30) },
    email: { email },
    password: { required, minLength: minLength(10) },
    passwordCheck: { sameAsPassword: sameAs('password') }
  },

  methods: {
    async register ()
    {
      let isValid = this._validate();

      if (!isValid)
      {
        return false;
      }

      let reqParams = {
        login: this.login,
        email: this.email,
        password: this.password
      };
      let response = null;

      this.isLoading = true;

      try
      {
        response = await this.$store.dispatch('auth/register', reqParams);

        if (response.success)
        {
          this.$router.push({
            name: 'login'
          });
        }
      }
      catch (err)
      {
        console.log(err);
      }
      finally
      {
        this.isLoading = false;
      }
    },

    toLoginPage ()
    {
      this.$router.push({
        name: 'login'
      });
    },

    _validate ()
    {
      this.$v.$touch();

      return !this.$v.$anyError;
    },

    _reset ()
    {
      this.login = '';
      this.email = '';
      this.password = '';
      this.passwordCheck = '';

      this.$v.$reset();
    }
  }
}
</script>