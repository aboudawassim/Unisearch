const { ApiError } = require("../../helpers/apiError");
const httpStatusCodes = require("../../helpers/httpStatusCodes");
const {
  Permission,
  serializePermission,
  parsePermissionModel,
} = require("../../models/permissionModel");

const getPermissions = async () => {
  try {
    let permissions = await Permission.find();
    return permissions.map((permission) => serializePermission(permission));
  } catch (error) {
    throw new ApiError(error.name, httpStatusCodes.NOT_FOUND, "No permissions");
  }
};

const insertPermission = async (permission) => {
  try {
    const newPermission = parsePermissionModel(permission);
    const insertedPermission = newPermission.save();
    return insertedPermission;
  } catch (error) {
    console.log(error);
    throw new ApiError(
      error.name,
      httpStatusCodes.BAD_REQUEST,
      "Permission not saved"
    );
  }
};

const getPermissionbyID = async (id) => {
  try {
    const permissionExists = await Permission.findOne({ _id: id });
    return permissionExists;
  } catch (error) {
    return null;
  }
};

const deletePermissionbyID = async (id) => {
  try {
    const permissionExists = await Permission.findOne({ _id: id });
    if (permissionExists == null)
      throw new ApiError(
        "NOT_FOUND",
        httpStatusCodes.NOT_FOUND,
        "Permission not found"
      );
    await Permission.deleteOne({ _id: id });
    const deleted = await Permission.findOne({ _id: id });
    if (deleted == null)
      return {
        success: "true",
        statusCode: httpStatusCodes.OK,
        message: "Permission deleted successfully",
      };
    else
      throw new ApiError(
        "DELETE_FAILED",
        httpStatusCodes.INTERNAL_SERVER,
        "Permission not deleted"
      );
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.INTERNAL_SERVER,
      "Permission not deleted"
    );
  }
};

module.exports = {
  getPermissions,
  insertPermission,
  deletePermissionbyID,
  getPermissionbyID,
};
