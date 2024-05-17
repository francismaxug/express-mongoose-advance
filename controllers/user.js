const sendSMS = require("../utils/sms")
const { generateTokenToUser } = require("../services/user")
const User = require("../models/user")
const { sendEmailFunction } = require("../services/user")
const { validateUser } = require("../utils/validate")
const generateVerificationCode = require("../utils/randomNumber")
const sendEmailToUser = require("../utils/email")


//-------------USER SIGNUP--------------------------

exports.signUpUser = async function (req, res, next) {
  const { error, value } = validateUser(req.body)
  //-----Destructure details from req body
  const { name, email, password, phoneNumber } = req.body

  //---Check if phone number exixt
  const userFound = await User.findOne({ phoneNumber })
  try {

    if (error) {
      const errorInputs = error.details[0].message
      return res.status(400).json({ status: "failed", message: errorInputs })
    }
    if (userFound) {
      // If the existing user is verified, return an error
      if (userFound.isverified) {
        res.status(400).json({ status: "failed", message: "User already exists." });
        return;
      }

      // const verifyCode = await generateVerificationCode()

      // If the user exist but is not verified, send code again to be verified
      userFound.name = name;
      userFound.email = email;
      userFound.password = password;
      userFound.verifyCode = verifyCode;
      userFound.verifyCodeExpiresIn = Date.now() + 10 * 60 * 1000
      await userFound.save();

      // sendSMS({ phone: phoneNumber, username: name, code: verifyCode, sort: true })
      res.status(200).json({ status: "updated", message: "Account updated successfully", token: token });
      return;
    }

    // const verifyCode = await generateVerificationCode()
    const user = new User({
      name,
      email,
      password,
      phoneNumber,
      verifyCode: "588976",
      verifyCodeExpiresIn: Date.now() + 10 * 60 * 1000 //set expires to 10 minutes
    })

    await user.save()

    // sendSMS({ phone: phoneNumber, username: user.name, code: verifyCode, sort: true })
    res.status(200).json({ status: "created", message: "Account created successfully", token: token })
  } catch (error) {
    next(error)
  }
}



//-------------VERIFY USER PHONE NUMBER--------------------------

exports.verifyPhone = async function (req, res, next) {
  const { code } = req.body
  console.log(code)
  try {
    const hasCode = await User.findOne({ verifyCode: code })
    if (!hasCode) {
      res.status(400).json({ status: "failed", message: "invalid code" })
      return
    }

    if (hasCode.verifyCodeExpiresIn && hasCode.verifyCodeExpiresIn <= Date.now()) {
      res.status(400).json({ status: "failed", message: "code expired" });
      hasCode.verifyCode = undefined;
      hasCode.verifyCodeExpiresIn = undefined;
      await hasCode.save();
      return;
    }

    hasCode.isverified = true
    hasCode.verifyCode = undefined
    hasCode.verifyCodeExpiresIn = undefined
    const token = generateTokenToUser(hasCode);
    await hasCode.save({ validateBeforeSave: false })
    res.status(200).json({ status: "approved", message: "Phone Number Successfully Verified", data: token })
    return
    // const cool = await User.findById(req.user.id).select("-password")
    // if (cool) {
    //   return res.status(200).json({ status: cool })
    // }
  } catch (error) {
    next(error)
  }
}


//-------------USER SIGNIN AFTER PHONE NUMBER VERIFIED--------------------------

exports.signInUser = async function (req, res, next) {

  const { password, phoneNumber } = req.body

  const user = await User.findOne({ phoneNumber, isverified: true })
  try {
    if (!user) {
      res.status(400).json({ status: "failed", message: "Invalid credentials" })
      return
    }

    const checkPassword = await user.comparePasswords(password)
    if (!checkPassword) {
      return res.status(400).json({ status: "failed", message: "invalid credentials" })
    }

    const token = generateTokenToUser(user)
    return res.status(200).json({ status: "ok", message: "success", data: token })

  } catch (error) {
    next(error)
  }

  res.status(401).json({
    status: "failed", message: "Incorrect credentials"
  })
  return
}


//-------------VERIFY EMAIL OF USER WHEN REQUESTED FOR PASSWORD RESET--------------------------

exports.verifyEmail = async function (req, res, next) {
  const { email } = req.body
  const user = await User.findOne({ email })
  try {
    if (!user) {
      res.status(404).json({ status: "failed", message: "Invalid Email Address" })
      return
    }
    // const token = generateTokenToUser(user)
    const sendVerifyCodeToUser = await generateVerificationCode()
    user.verifyCode = sendVerifyCodeToUser
    user.verifyCodeExpiresIn = Date.now() + 10 * 60 * 1000
    await user.save()

    sendSMS({
      phone: user.phoneNumber,
      name: user.name,
      code: sendVerifyCodeToUser,
      sort: false
    })

    res.status(200).json({ status: "ok", message: "verification code sent", data: sendVerifyCodeToUser })
  } catch (error) {
    next(error)
  }
}

//--------HANDLES CODE SENT TO RESET PASSWORD-------------------------
exports.codeForResetPassword = async function (req, res, next) {
  const { code } = req.body
  const user = await User.findOne({ verifyCode: code, verifyCodeExpiresIn: { $gt: Date.now() } })

  try {
    if (!user) {
      res.status(400).json({ status: "failed", message: "code or expired or invalid" })
      return
    }
    user.verifyCode = undefined
    user.verifyCodeExpiresIn = undefined
    await user.save()
    const token = generateTokenToUser(user)
    res.status(200).json({ status: "ok", message: "success", data: token })
  } catch (error) {
    next(error)
  }
}

//--------RESET PASSWORD---------------------

exports.resetPassword = async function (req, res, next) {
  const { newPassword } = req.body
  const user = await User.findById(req.user.id).select("-password")
  console.log(user)
  try {
    if (!user) {
      return res.status(401).json({ status: "failed", message: "could not reset password" })
    }
    user.password = newPassword

    await user.save()

    await sendEmailToUser(sendEmailFunction(user))

    res.status(200).json({ status: "ok", message: "password reset successfull", })

  } catch (error) {
    next(error)
  }
}

//-----GET ALL USERS IN THE DATABASE----------------
exports.getAllUsers = async function (req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
}


