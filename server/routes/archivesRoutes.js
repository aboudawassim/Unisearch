const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
const {
  getArchives,
  insertArchive,
  updateArchiveById,
  deleteArchivebyID,
  deleteAllArchives,
} = require("../controllers/archiveController");
const { ApiError } = require("../helpers/apiError");
const httpStatusCodes = require("../helpers/httpStatusCodes");

router.get("/", async (req, res) => {
  const archives = await getArchives();
  res.status(200).send(archives);
});

router.post("/", async (req, res) => {
  const insertedArchive = await insertArchive(req.body);
  res.status(200).send(insertedArchive);
});

router.patch("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      throw new ApiError(
        "VALIDATION_ERROR",
        httpStatusCodes.BAD_REQUEST,
        "Invalid ID"
      );
    const updatedArchive = await updateArchiveById(req.params.id, req.body);
    if (updatedArchive) res.status(200).send(updatedArchive);
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
    const deletedArchive = await deleteArchivebyID(req.params.id);
    res.status(200).send(deletedArchive);
  } catch (error) {
    next(error);
  }
});
router.delete("/", async (req, res, next) => {
  try {
    const response = await deleteAllArchives();
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
