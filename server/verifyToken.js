const axios = require('axios').default;
const authURL = 'http://localhost:4000/verify';

module.exports = async (req, res, next) => {
  const authToken = req.headers['auth-token'];

  try {
    const { data: user, status } = await axios.post(authURL, null, {
      headers: {
        'auth-token': authToken
      }
    });

    console.log('status', status);
    console.log('user', user.data);

    if (status === 200) {
      req.user = user.data;

      next();
    }
    else {
      res.status(status).json(user);
    }
  }
  catch (err) {
    res.status(403).json({
      success: false,
      message: err.message
    });
  }
}