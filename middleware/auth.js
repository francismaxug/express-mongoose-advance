const jwt = require('jsonwebtoken');
const User = require("../models/user")


const protect = async (req, res, next) => {

  try {
    // Get the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.jwtSecret);

    // Find the user based on the user ID from the token
    const user = await User.findById(decodedToken.user).select("-password");
    // console.log('User:', user);
    if (!user) {
      return res.status(404).json({ error: 'No verification token, User not found' });
    }
    // Attach the user object to the request for further processing
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}
module.exports = protect