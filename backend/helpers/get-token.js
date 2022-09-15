const getToken = (req) => {
  const headerAuthorization = req.headers.authorization;
  const token = headerAuthorization.split("Bearer ")[1];
  return token;
}

module.exports = getToken;