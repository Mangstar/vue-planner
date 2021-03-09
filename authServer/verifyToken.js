const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authToken = req.headers['auth-token'];

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

    req.user = verified;

    next();
  }
  catch (error) {
    res.status(403).json({
      success: false,
      message: 'Ваш токен не действителен'
    });
  }
}