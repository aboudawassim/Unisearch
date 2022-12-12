const catchAsync = require("../helpers/catchAsync");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { User } = require("../models/userModel");
const { ApiError } = require("../helpers/apiError");
const httpStatusCodes = require("../helpers/httpStatusCodes");
const dotenv = require("dotenv");
const { insertUser } = require("./userController");

dotenv.config();
//sign JWT token for authenticated user
const TOKEN_SECRET =
  "c0c469e611586e560ccca2caa0484258c57ccbbf5d41cc85fad4f95eaeac0d97aa9e4d0ffbb65ad0a63bff87612c57c44c8089b4a84e570061b9463da33ec68d";

const signToken = (id) => {
  return jwt.sign({ id: id }, "secret", { expiresIn: "24h" }, TOKEN_SECRET);
};

//create JWT token for authenticated user
const createUserToken = async (user, code, req, res) => {
  const token = signToken(user._id);
  let d = new Date();
  d.setDate(d.getDate() + 30);
  //remove user password from output for security
  user.password = undefined;
  res.status(code).json({
    success: "true",
    responseCode: code,
    token,
    data: {
      user,
    },
  });
};
//create new user
exports.registerUser = async (req, res, next) => {
  //pass in request data here to create user from user schema
  try {
    const insertedUser = await insertUser(req.body);
    createUserToken(insertedUser, httpStatusCodes.CREATED, req, res);
    //if user can't be created, throw an error
  } catch (err) {
    next(err);
  }
};

//log user in
exports.loginUser = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  //check if email & password exist
  if (!username || !password) {
    return next(
      new ApiError(
        "BAD_REQUEST",
        httpStatusCodes.BAD_REQUEST,
        "Please enter valid credentials"
      )
    );
  }
  //check if user & password are correct
  const user = await User.findOne({ username });
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      new ApiError(
        "Unauthorized",
        httpStatusCodes.UNAUTHORIZED,
        "Incorrect username or password"
      )
    );
  }
  createUserToken(user, httpStatusCodes.OK, req, res);
});

//check if user is logged in
exports.checkUser = catchAsync(async (req, res, next) => {
  let currentUser;
  console.log("req.cookies : ", req.cookies);
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    currentUser = await User.findById(decoded.id);
  } else {
    currentUser = null;
  }
  res.status(200).send({ currentUser });
});

//log user out
exports.logoutUser = catchAsync(async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).send("user is logged out");
});
