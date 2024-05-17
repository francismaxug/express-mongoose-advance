const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
    email: String,
    phoneNumber: { type: String, required: true },
    verifyCode: String,
    verifyCodeExpiresIn: Date,
    password: String,
    isverified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    collection: "user",
  }
);



UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashs = await bcrypt.hash(this.password, salt);
    this.password = hashs;

    return;
  } catch (error) {
    console.log(error);
  }
});

UserSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User = mongoose.model("user", UserSchema);
