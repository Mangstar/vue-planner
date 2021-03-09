const Joi = require('joi');

function registerValidation (formData) {
  function handlerLoginError (errors) {
    let errorMessage = '';

    errors.forEach(error => {
      switch (error.code) {
        case 'string.base':
          errorMessage = 'Поле `Login` должно быть строкой';
          break;
        case 'string.empty':
        case 'any.required':
          errorMessage = 'Поле `Login` обязательно для заполнения';
          break;
        case 'string.min':
          errorMessage = '`Login` не может быть короче 6 символов';
          break;
        case 'string.max':
          errorMessage = '`Login` не может быть длиннее 30 символов';
          break;
      }
    });

    return new Error(errorMessage);
  }

  function handleEmailError (errors) {
    let errorMessage = '';

    errors.forEach(error => {
      switch (error.code) {
        case 'string.base':
        case 'string.empty':
          errorMessage = 'Поле `Email` должно быть строкой';
          break;
        case 'string.email':
          errorMessage = 'Поле `Email` Кекорректно';
          break;
      }
    });

    return new Error(errorMessage);
  }

  function handlePasswordError (errors) {
    let errorMessage = '';

    errors.forEach(error => {
      switch (error.code) {
        case 'string.base':
          errorMessage = 'Пароль должен быть строкой';
          break;
        case 'string.empty':
        case 'any.required':
          errorMessage = 'Пароль обязателен для заполнения';
          break;
        case 'string.min':
          errorMessage = 'Пароль не может быть короче 10 символов';
          break;
        case 'string.max':
          errorMessage = 'Пароль не может быть длиннее 30 символов';
          break;
      }
    });

    return new Error(errorMessage);
  }

  const registerSchema = Joi.object({
    login: Joi
              .string()
              .required()
              .min(6)
              .max(30)
              .error(handlerLoginError),
    email: Joi
              .string()
              .email()
              .error(handleEmailError),
    password: Joi
                .string()
                .min(10)
                .max(30)
                .required()
                .error(handlePasswordError)
  });

  return registerSchema.validate(formData);
}

function loginValidation (formData) {
  function handleLoginTextField (errors) {
    let errorMessage = '';

    errors.forEach(error => {
      let fieldLabel = error.local.key === 'login' ? 'Логин' : 'Пароль';

      switch (error.code) {
        case 'string.base':
          errorMessage = `${fieldLabel} должен быть строкой`;
          break;
        case 'string.empty':
        case 'any.required':
          errorMessage = `${fieldLabel} обязателен для заполнения`;
          break;
      }
    });

    return new Error(errorMessage);
  }

  const loginSchema = Joi.object({
    login: Joi
              .string()
              .required()
              .error(handleLoginTextField),
    password: Joi
                .string()
                .required()
                .error(handleLoginTextField)
  });

  return loginSchema.validate(formData);
}

module.exports = {
  registerValidation,
  loginValidation
};