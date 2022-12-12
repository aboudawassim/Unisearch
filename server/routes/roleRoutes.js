const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
const {
  getRoles,
  insertRole,
  deleteRolebyID,
  updateRoleById,
} = require("../controllers/roles/roleController");
const { ApiError } = require("../helpers/apiError");
const httpStatusCodes = require("../helpers/httpStatusCodes");

router.get("/", async (req, res) => {
  const roles = await getRoles();
  res.status(200).send(roles);
});

router.post("/", async (req, res) => {
  const insertedRole = await insertRole(req.body);
  res.status(200).send(insertedRole);
});

router.patch("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      throw new ApiError(
        "VALIDATION_ERROR",
        httpStatusCodes.BAD_REQUEST,
        "Invalid ID"
      );
    const updatedRole = await updateRoleById(req.params.id, req.body);
    if (updatedRole) res.status(200).send(updatedRole);
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
    const deletedRole = await deleteRolebyID(req.params.id);
    res.status(200).send(deletedRole);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
