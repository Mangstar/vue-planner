const router = require('express').Router();
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../db/models/user');
const RToken = require('../db/models/rtoken');
const { registerValidation, loginValidation } = require('../validation');

function _generateAToken (payload)
{
  return jwt.sign(
    payload,
    process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1h' }
  );
}

function _generateRToken (payload)
{
  return jwt.sign(
    payload,
    process.env.REFRESH_SECRET_TOKEN
  )
}

async function updateRToken (user, refreshToken)
{
  try
  {
    await RToken.findOneAndDelete({
      userId: user._id
    });
    await new RToken({
      userId: user._id,
      token: refreshToken
    }).save();
  }
  catch (err)
  {
    console.error(err);
  }
}

router.post('/register', async (req, res) => {
  const userData = {
    login: req.body.login,
    email: req.body.email,
    password: req.body.password
  };
  const { error } = registerValidation(userData);

  if (error)
  {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  try
  {
    const existsUser = await User.findOne({
      login: userData.login
    });

    if (existsUser)
    {
      return res.status(400).json({
        success: false,
        message: 'Пользователь с указанным логином уже существует'
      });
    }

    const passwordSalt = await bcript.genSalt(10);
    const paswordHashed = await bcript.hash(userData.password, passwordSalt);

    const user = new User({
      ...userData,
      password: paswordHashed
    });
    const response = await user.save();

    if (response)
    {
      res.json({
        success: true,
        message: 'Регистрация прошла успешно'
      });
    }
  }
  catch (err)
  {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
});

router.post('/login', async (req, res) => {
  const userData = {
    login: req.body.login,
    password: req.body.password
  };
  const { error } = loginValidation(userData);

  if (error)
  {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }

  const existsUser = await User.findOne({
    login: userData.login
  });

  if (!existsUser)
  {
    return res.status(400).json({
      success: false,
      message: 'Неверный логин или пароль'
    });
  }

  const isPasswordCorrect = await bcript.compare(userData.password, existsUser.password);

  if (!isPasswordCorrect)
  {
    return res.status(400).json({
      success: false,
      message: 'Неверный логин или пароль'
    })
  }

  const user = {
    _id: existsUser._id,
    login: existsUser.login
  };

  const accessToken = _generateAToken(user);
  const refreshToken = _generateRToken(user);

  await updateRToken(user, refreshToken);

  res.json({
    success: true,
    data: {
      id: user._id,
      login: user.login,
      accessToken,
      refreshToken
    }
  });
});

router.post('/reftoken', async (req, res) => {
  const token = req.body.token;

  try
  {
    const existsToken = await RToken.findOne({
      token
    });

    if (!existsToken)
    {
      return res.status(403)
                .json({
                  message: 'Ваш токен не действителен'
                })
    }

    try
    {
      const user = await jwt.verify(
        token,
        process.env.REFRESH_SECRET_TOKEN
      );

      const accessToken = _generateAToken(user);
      const refreshToken = _generateRToken(user);

      await updateRToken(user, refreshToken);

      res.json({
        success: true,
        accessToken, refreshToken
      });
    }
    catch (err)
    {
      res.status(403)
         .json({
           message: 'Ваш токен не действителен'
         });
    }
  }
  catch (err)
  {

  }
});

module.exports = router;