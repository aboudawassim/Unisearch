const { Schema, mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  username: String,
  password: String,
  roles: Array,
  createdAt: Date,
});

var handleE11000 = function (error, res, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
};

//schema middleware to apply before saving
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.post("save", handleE11000);
userSchema.post("update", handleE11000);
userSchema.post("findOneAndUpdate", handleE11000);
userSchema.post("insertMany", handleE11000);

function parseUserModel(params) {
  return new User({
    name: params.name,
    username: params.username,
    password: params.password,
    roles: params.roles ?? [],
    createdAt: new Date(),
  });
}

function serializeUser(doc) {
  return {
    id: doc._id,
    name: doc.name,
    username: doc.username,
    roles: doc.roles,
    createdAt: doc.createdAt,
  };
}

//check password at login
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("user", userSchema);
module.exports = { User, parseUserModel, serializeUser };
