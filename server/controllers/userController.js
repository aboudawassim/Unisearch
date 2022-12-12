const { ApiError } = require("../helpers/apiError");
const httpStatusCodes = require("../helpers/httpStatusCodes");
const { User, parseUserModel, serializeUser } = require("../models/userModel");

const getUsers = async () => {
  try {
    let users = await User.find();
    return users.map((user) => serializeUser(user));
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.NOT_FOUND,
      "Users not found"
    );
  }
};

const insertUser = async (user) => {
  try {
    const newUser = parseUserModel(user);
    const insertedUser = newUser.save();
    return insertedUser;
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.BAD_REQUEST,
      "User not saved"
    );
  }
};

const updateUserById = async (id, body) => {
  try {
    await User.findOneAndUpdate({ _id: id }, body);
    const updatedUser = await User.findOne({ _id: id });
    return serializeUser(updatedUser);
  } catch (error) {
    throw new ApiError(error.name, httpStatusCodes.NOT_FOUND, "User not found");
  }
};

const deleteUserbyID = async (id) => {
  try {
    const userExists = await User.findOne({ _id: id });
    if (userExists == null)
      throw new ApiError(
        "NOT_FOUND",
        httpStatusCodes.NOT_FOUND,
        "User not found"
      );
    await User.deleteOne({ _id: id });
    const deleted = await User.findOne({ _id: id });
    if (deleted == null)
      return {
        success: "true",
        message: "User deleted successfully",
      };
    else
      throw new ApiError(
        "DELETE_FAILED",
        httpStatusCodes.INTERNAL_SERVER,
        "User not deleted"
      );
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.INTERNAL_SERVER,
      "User not deleted"
    );
  }
};

module.exports = { getUsers, insertUser, updateUserById, deleteUserbyID };
