const jwt = require("jsonwebtoken");

//-------------SET JWT TOKEN TO USER WITH ID AS REFERENCE-------------
const setTheToken = (id) => {
  return jwt.sign(id, process.env.jwtSecret, { expiresIn: process.env.jwtExpires })
}
module.exports = setTheToken;