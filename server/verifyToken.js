const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authToken = req.headers['auth-token'];

  if (!authToken) {
    return res.status(401).json({
      success: false,
      message: 'Вы не авторизованы'
    });
  }

  try {
    req.user = jwt.verify(
      authToken,
      process.env.ACCESS_SECRET_TOKEN
    );

    next();
  }
  catch (error) {
    res.status(403).json({
      success: false,
      message: 'Ваш токен не действителен'
    });
  }
}
