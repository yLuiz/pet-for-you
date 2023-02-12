const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const getUserByToken = async (token, User) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  const user = await User.findOne({ _id: decoded.id });

  return user;
}


module.exports = getUserByToken;
