const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
const {
  getPermissions,
  insertPermission,
  deletePermissionbyID,
} = require("../controllers/permissions/permissionsController");
const { ApiError } = require("../helpers/apiError");
const httpStatusCodes = require("../helpers/httpStatusCodes");

router.get("/", async (req, res) => {
  const permissions = await getPermissions();
  res.status(200).send(permissions);
});

router.post("/", async (req, res) => {
  const insertedPermission = await insertPermission(req.body);
  res.status(200).send(insertedPermission);
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      throw new ApiError(
        "VALIDATION_ERROR",
        httpStatusCodes.BAD_REQUEST,
        "Invalid ID"
      );
    const deletedPermission = await deletePermissionbyID(req.params.id);
    res.status(200).send(deletedPermission);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
