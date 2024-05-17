const mongoose = require('mongoose')
const db = process.env.mongoURL

//-------FUNCTION TO CONNECT TO OUR DATABASE---------------
const connectDb = async function () {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true, useUnifiedTopology: true,
    })
    console.log("connected to database...")

  } catch (error) {
    console.log("error connecting to database")
  }
}

module.exports = connectDb