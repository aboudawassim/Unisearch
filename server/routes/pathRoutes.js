const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
const {
  getPaths,
  insertPath,
  deletePathbyID,
} = require("../controllers/paths/pathController");
const { ApiError } = require("../helpers/apiError");
const httpStatusCodes = require("../helpers/httpStatusCodes");

router.get("/", async (req, res) => {
  const paths = await getPaths();
  res.status(200).send(paths);
});

router.post("/", async (req, res) => {
  const insertedPath = await insertPath(req.body);
  res.status(200).send(insertedPath);
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      throw new ApiError(
        "VALIDATION_ERROR",
        httpStatusCodes.BAD_REQUEST,
        "Invalid ID"
      );
    const deletedPath = await deletePathbyID(req.params.id);
    res.status(200).send(deletedPath);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
