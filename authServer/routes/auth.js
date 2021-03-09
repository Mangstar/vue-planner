const router = require('express').Router();
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../db/models/user');
const RToken = require('../db/models/rtoken');
const { registerValidation, loginValidation } = require('../validation');

function generateAccessToken (payload) {
  return jwt.sign(
    payload,
    process.env.ACCESS_SECRET_TOKEN, { expiresIn: '10m' }
  );
}

function generateRefreshToken (payload) {
  return jwt.sign(
    payload,
    process.env.REFRESH_SECRET_TOKEN, { expiresIn: '8h' }
  )
}

async function updateRefreshToken (user, refreshToken) {
  try {
    await RToken.findOneAndDelete({
      token: refreshToken
    });
    const createResponse = await new RToken({
      userId: user.id,
      token: refreshToken
    })

    createResponse.save();
  }
  catch (error) {
    throw new Error(error.message);
  }
}

function generateCookieOptions () {
  return {
    expires: new Date(Date.now() + 8 * 60 * 60 * 1000),
    httpOnly: true
  }
}

router.post('/register', async (req, res) => {
  const userData = {
    login: req.body.login,
    email: req.body.email,
    password: req.body.password
  };
  const { error } = registerValidation(userData);

  try {
    if (error) {
      throw new Error(error.message);
    }

    const existsUser = await User.findOne({
      login: userData.login
    });

    if (existsUser) {
      throw new Error('Пользователь с указанным логином уже существует');
    }

    const passwordSalt = await bcript.genSalt(10);
    const paswordHashed = await bcript.hash(userData.password, passwordSalt);

    const user = new User({
      ...userData,
      password: paswordHashed
    });
    const response = await user.save();

    if (response) {
      res.json({
        success: true,
        message: 'Регистрация прошла успешно'
      });
    }
  }
  catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

router.post('/login', async (req, res) => {
  const userData = {
    login: req.body.login,
    password: req.body.password
  };
  const { error } = loginValidation(userData);

  try {
    if (error) {
      throw new Error(error.message);
    }

    const existsUser = await User.findOne({
      login: userData.login
    });

    if (!existsUser) {
      throw new Error('Неверный логин или пароль');
    }

    const isPasswordCorrect = await bcript.compare(userData.password, existsUser.password);

    if (!isPasswordCorrect) {
      throw new Error('Неверный логин или пароль');
    }

    const user = {
      id: existsUser._id,
      login: existsUser.login
    };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await updateRefreshToken(user, refreshToken);

    res.cookie('refreshToken', refreshToken, generateCookieOptions()).json({
      success: true,
      data: {
        ...user,
        accessToken
      }
    });
  }
  catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

router.post('/verify', async (req, res) => {
  const authToken = req.headers['auth-token'].toString();

  if (!authToken) {
    return res.status(401).json({
      success: false,
      message: 'Вы не авторизованы'
    });
  }

  try {
    const verified = jwt.verify(
      authToken,
      process.env.ACCESS_SECRET_TOKEN
    );

    return res.json({
      success: true,
      data: verified
    });
  }
  catch (err) {
    res.status(403).json({
      success: false,
      message: 'Ваш токен не действителен'
    });
  }
});

router.post('/reftoken', async (req, res) => {
  const token = req.cookies.refreshToken;

  try {
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Refresh токен не передан'
      });
    }

    const existsToken = await RToken.findOne({ token });

    if (!existsToken) {
      throw new Error('Ваш токен не действителен');
    }

    const tokenUser = jwt.verify(
      token,
      process.env.REFRESH_SECRET_TOKEN
    );

    const user = {
      id: tokenUser.id,
      login: tokenUser.login
    };
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await updateRefreshToken(user, refreshToken);

    res.cookie('refreshToken', refreshToken, generateCookieOptions()).json({
      success: true,
      data: { accessToken }
    });
  }
  catch (error) {
    res.status(403).json({
      success: false,
      message: error.message
    });
  }
});

router.post('/logout', async (req, res) => {
  const token = req.cookies.refreshToken;

  try {
    if (!token) {
      throw new Error('Refresh токен не передан');
    }

    const existsToken = await RToken.findOne({ token });

    if (!existsToken) {
      return res.status(403).json({
        message: 'Ваш токен не действителен'
      })
    }

    const response = await existsToken.remove();

    if (response) {
      res.clearCookie('refreshToken').json({
        success: true
      });
    }
  }
  catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;