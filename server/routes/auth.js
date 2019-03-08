const jwt = require('jsonwebtoken');

const withAuth = function(req, res, next) {
  const bearerHeader = req.headers['authorization']
    
  if (typeof bearerHeader=='undefined') {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    const bearer = bearerHeader.split(' ')
    bearerToken = bearer[1]
    
    jwt.verify(bearerToken, process.env.SECRET, (err, decoded) => {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}
module.exports = withAuth;