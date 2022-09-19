const getToken = (req) => {
  const headerAuthorization = req.headers.authorization;
  if (!headerAuthorization) {
    return null;
  }
  const token = headerAuthorization.split("Bearer ")[1];
  
  return token;
}

module.exports = getToken;