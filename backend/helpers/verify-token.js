const jwt = require('jsonwebtoken');
const environment = require('../environment/environment');
const getToken = require('./get-token');

const verifyToken = (req, res, next) => { 

  if(!req.headers.authorization)  {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const token = getToken(req);

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  try {
    console.log(token);
    const decoded = jwt.verify(token, environment.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    req.user = decoded;
    next();
  } 
  catch (error) { 
    return res.status(500).send({ message: "Token Inválido" });
  }
}

module.exports = verifyToken;