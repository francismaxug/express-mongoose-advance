
//---------HELPER FUNCTIONS-----------

const setTheToken = require("../utils/generatetoken")
exports.generateTokenToUser = function (user) {
  const payload = {
    user: user._id
  }
  const token = setTheToken(payload)
  return token
}

//------SEND SMS TO THE USER-------------

exports.sendSmsMessageToUser = function (user) {
  return `${user.sort ? `Hello ${user.username}, Your verification code is: ${user.code}.\n\nTo keep your account save, do not share it with anyone.` : `Hello ${user.name}, Your password reset code is: ${user.code}.\n\nIf you did not request for a password reset, please ignore this message.`}`
}

//--------SENDS EMAIL TO USER AFTER PASSWORD RESET---------------

exports.sendEmailFunction = function (user) {
  const message = `Hello ${user.name}, Your password reset was successfully`
  return {
    email: user.email,
    subject: `password reset success`,
    message,
    text: `password reset success`
  }
}