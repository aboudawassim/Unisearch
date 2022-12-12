const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
const {
  getUsers,
  insertUser,
  updateUserById,
  deleteUserbyID,
} = require("../controllers/userController");
const { ApiError } = require("../helpers/apiError");
const httpStatusCodes = require("../helpers/httpStatusCodes");
const { authenticateToken } = require("../helpers/jwt");

router.get("/", async (req, res) => {
  const users = await getUsers();
  res.status(200).send(users);
});

router.post("/", async (req, res) => {
  const insertedUser = await insertUser(req.body);
  res.status(200).send(insertedUser);
});

router.patch("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      throw new ApiError(
        "VALIDATION_ERROR",
        httpStatusCodes.BAD_REQUEST,
        "Invalid ID"
      );
    const updatedUser = await updateUserById(req.params.id, req.body);
    if (updatedUser) res.status(200).send(updatedUser);
    else res.status(404).send("empty");
  } catch (error) {
    next(error);
  }
});
router.delete("/:id" /*, authenticateToken*/, async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      throw new ApiError(
        "VALIDATION_ERROR",
        httpStatusCodes.BAD_REQUEST,
        "Invalid ID"
      );
    const deletedUser = await deleteUserbyID(req.params.id);
    res.status(200).send(deletedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
