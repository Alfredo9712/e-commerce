const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  !token && res.json({ msg: 'Not authorized' }).status(400);
  try {
    const validateAdmin = jwt.verify(token, process.env.TOKEN_SECRET);
    req.admin = validateAdmin;
    next();
  } catch (error) {
    res.json({ msg: 'Invalid Token' }).status(400);
  }
};
