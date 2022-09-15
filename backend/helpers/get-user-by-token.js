const jwt = require('jsonwebtoken');
const environment = require('../environment/environment');
// const User = require('../models/user');

const getUserByToken = async (token, User) => {
  const decoded = jwt.verify(token, environment.JWT_SECRET);
  const user = await User.findOne({ _id: decoded.id });

  return user;
}


module.exports = getUserByToken;
