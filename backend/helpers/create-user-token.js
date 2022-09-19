const jwt = require('jsonwebtoken');
const environment = require('../environment/environment');

const createUserToken = async (user, req, res) => { 
  const userToken = jwt.sign({ 
    name: user.name, 
    id: user._id
  }, environment.JWT_SECRET, {expiresIn: '365d'});

  res.status(200).json({
    message: "Você está autenticado",
    token: userToken,
    userId: user._id
  });
};

module.exports = createUserToken;