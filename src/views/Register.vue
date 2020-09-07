<template>
  <v-row justify="center" align="center">
    <v-col cols="4">
      <v-form
        ref="form"
        v-model="isValid"
        lazy-validation
      >
        <v-text-field
          v-model="$v.name.$model"
          label="Имя"
          :error-messages="nameErrors"
          required
        ></v-text-field>

        <v-text-field
          v-model="$v.email.$model"
          label="E-mail"
          :error-messages="emailErrors"
          required
        ></v-text-field>

        <v-text-field
          v-model="$v.password.$model"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPass ? 'text' : 'password'"
          :error-messages="passwordErrors"
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
          :error-messages="passwordCheckErrors"
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
    </v-col>
  </v-row>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

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

  computed: {
    nameErrors () {
      const errors = [];

        if (!this.$v.name.$dirty) {
          return errors;
        }

        if (!this.$v.name.minLength) {
          errors.push('Имя должно состоять минимум из двух символов');
        }

        if (!this.$v.name.required) {
          errors.push('Поле `имя` обязательно');
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

      if (!this.$v.email.required) {
        errors.push('Поле `E-mail` обязательно');
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
    name: { required, minLength: minLength(2) },
    email: { required, email },
    password: { required, minLength: minLength(10) },
    passwordCheck: { sameAsPassword: sameAs('password') }
  },

  methods: {
    validate () {
      this.$v.$touch();
    },

    reset () {
      this.name = '';
      this.email = '';
      this.password = '';
      this.passwordCheck = '';

      this.$v.$reset();
    }
  }
}
</script>