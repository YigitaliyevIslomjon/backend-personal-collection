const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY_TOKEN, (err, user) => {
    req.user = user;
    next();
  });
}


module.exports = authenticateToken;
