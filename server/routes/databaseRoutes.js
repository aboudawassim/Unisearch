const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
const {
  getDatabases,
  insertDatabase,
  updateDatabaseById,
  deleteDatabasebyID,
} = require("../controllers/database/databaseController");
const { ApiError } = require("../helpers/apiError");
const httpStatusCodes = require("../helpers/httpStatusCodes");

router.get("/", async (req, res) => {
  const databases = await getDatabases();
  res.status(200).send(databases);
});

router.post("/", async (req, res) => {
  const insertedDatabase = await insertDatabase(req.body);
  res.status(200).send(insertedDatabase);
});

router.patch("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      throw new ApiError(
        "VALIDATION_ERROR",
        httpStatusCodes.BAD_REQUEST,
        "Invalid ID"
      );
    const updatedDatabase = await updateDatabaseById(req.params.id, req.body);
    if (updatedDatabase) res.status(200).send(updatedDatabase);
    else res.status(404).send("empty");
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      throw new ApiError(
        "VALIDATION_ERROR",
        httpStatusCodes.BAD_REQUEST,
        "Invalid ID"
      );
    const deletedDatabase = await deleteDatabasebyID(req.params.id);
    res.status(200).send(deletedDatabase);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
