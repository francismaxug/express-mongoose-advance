const express = require('express')
const app = express()
app.use(express.json({ extended: false }))
const cors = require('cors')
const connectDb = require("./db")
app.use(cors())
const user = require("./routes/api/user")



connectDb()
app.use("/api/v1", user)

module.exports = app






























// const express = require('express')
// const app = express()
// const mongoose = require('mongoose')
// app.use(express.json({ extended: false }))
// const cors = require('cors')
// app.use(cors())
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// const JWT_SECRET = "dhhhjhjjhsu6wqqiuuybmnasjjhi25q2ygfmgutjfcgv"
// const PORT = 8080

// const mongoURL = "mongodb+srv://atingafrancis123:johnsco1a3@cluster0.id4hhao.mongodb.net/?retryWrites=true&w=majority"

// mongoose.connect(mongoURL, {
//   useNewUrlParser: true, useUnifiedTopology: true,
// }).then(() => { console.log("Connected to database") }).catch((e) => console.log(e))


// app.listen(PORT, () => console.log("server listening on port " + PORT))

// require("./registerUser")
// const User = mongoose.model("userInfo")
// app.post('/register', async (req, res) => {
//   const { name, email, lastname, password } = req.body
//   const encryptPaswd = await bcrypt.hash(password, 10)

//   try {
//     //we deal with the a unique user here
//     const userExist = await User.findOne({ email })
//     if (userExist) {
//       res.send({ error: "User already exists" })
//       return
//     }
//     //Create the user
//     await User.create({
//       name,
//       email,
//       lastname,
//       password: encryptPaswd,
//     })
//     res.send({ status: "Successfully Registered" })
//   } catch (error) {
//     res.send({ status: "error" })
//   }
// })

// app.post("/logIn", async (req, res) => {
//   const { email, password } = req.body
//   const findUser = await User.findOne({ email })
//   console.log(password, findUser.password);
//   try {
//     if (!findUser) {
//       res.json({ error: "User Not Found" })
//       return
//     }
//     const user = await bcrypt.compare(password, findUser.password)
//     console.log(user)
//     if (user) {
//       const token = jwt.sign({
//         email: findUser.email
//       }, JWT_SECRET)
//       res.json({ status: "LogIn Success", data: token })
//       return
//     }

//     if (!user) {
//       return res.json({ error: "error" })
//     }
//     // if (await bcrypt.compare(password, findUser.password)) {
//     //   const token = jwt.sign({
//     //     email: findUser.email
//     //   }, JWT_SECRET)

//     //   if (res.status(201)) {
//     //     res.json({ status: "LogIn Success", data: token })
//     //     return
//     //   } else {
//     //     res.json({ error: "error" })
//     //   }
//     // }
//     res.json({ status: "error", error: "Invalid credentials" })
//   } catch (error) {
//     console.log(error)
//   }
//   // if (!findUser) {
//   //   res.json({ error: "User Not Found" })
//   //   return
//   // }
//   // const user = await bcrypt.compare(password, findUser.password)
//   // console.log(user)
//   // if (user) {
//   //   const token = jwt.sign({
//   //     email: findUser.email
//   //   }, JWT_SECRET)
//   //   res.json({ status: "LogIn Success", data: token })
//   //   return
//   // }

//   // if (!user) {
//   //   return res.json({ error: "error" })
//   // }
//   // // if (await bcrypt.compare(password, findUser.password)) {
//   // //   const token = jwt.sign({
//   // //     email: findUser.email
//   // //   }, JWT_SECRET)

//   // //   if (res.status(201)) {
//   // //     res.json({ status: "LogIn Success", data: token })
//   // //     return
//   // //   } else {
//   // //     res.json({ error: "error" })
//   // //   }
//   // // }
//   // res.json({ status: "error", error: "Invalid credentials" })
// })


// app.post('/userDetails', async (req, res) => {
//   const { token } = req.body
//   const user = jwt.verify(token, JWT_SECRET)
//   const userMail = user.email
//   try {
//     const waited = await User.findOne({ email: userMail })
//     console.log(waited)
//     if (!waited) {
//       res.send({ status: "cant find user", data: "errors" })
//       return
//     }
//     res.send({ status: "ok", data: waited })
//     return
//   } catch (error) {
//     console.log(error)
//   }
// })
// // app.post('/userDetails', async (req, res) => {
// //   const { token } = req.body
// //   try {
// //     const user = jwt.verify(token, JWT_SECRET)
// //     const userMail = user.email
// //     user.findOne({ email: userMail })
// //       .then(data => {
// //         res.send({ status: "ok", data: data }).catch(error => {
// //           res.send({ status: "error", data: "error" })
// //         })
// //       })
// //   } catch (error) {
// //     console.log(error)
// //   }
// // })


// // app.post('/save', async (req, res) => {
// //   const { name } = req.body
// //   try {
// //     if (name === "Max") {
// //       res.send({ status: "Great" })
// //     } else {
// //       res.send({ status: "not found" })
// //     }

// //   } catch (error) {
// //     res.send({ status: "Something went wrong" })
// //   }

// // })

// // app.get('/', async (req, res) => {

// // })