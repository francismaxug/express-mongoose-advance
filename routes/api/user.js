const express = require('express');
const router = express.Router();
const signIn = require("../../controllers/user")
const signUp = require("../../controllers/user")
const approveUser = require("../../controllers/user")
const verifyEmailofUser = require("../../controllers/user")
const codeInput = require("../../controllers/user")
const passReset = require("../../controllers/user")
const allUsers = require("../../controllers/user")
const protect = require("../../middleware/auth")
// const verifyUser = require("../../controllers/user")





//-------------USER ROUTES-----------------
router.route('/login').post(signIn.signInUser);
router.route('/signup').post(signUp.signUpUser);
router.route('/approve').post(approveUser.verifyPhone);
router.route('/verifymail').post(verifyEmailofUser.verifyEmail);
router.route('/resetCode').post(codeInput.codeForResetPassword);
router.route("/passwordReset").patch(protect, passReset.resetPassword)
router.route("/allaccounts").get(allUsers.getAllUsers)

// router.route("/verify").get(protect, verifyUser.getverified)

module.exports = router;

