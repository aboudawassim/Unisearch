const { ApiError } = require("../../helpers/apiError");
const httpStatusCodes = require("../../helpers/httpStatusCodes");
const {
  Role,
  serializeRole,
  parseRoleModel,
} = require("../../models/roleModel");

const getRoles = async () => {
  try {
    let roles = await Role.find();
    return roles.map((role) => serializeRole(role));
  } catch (error) {
    throw new ApiError(error.name, httpStatusCodes.NOT_FOUND, "No roles");
  }
};

const updateRoleById = async (id, body) => {
  try {
    await Role.findOneAndUpdate({ _id: id }, body);
    const updatedRole = await Role.findOne({ _id: id });
    return serializeRole(updatedRole);
  } catch (error) {
    throw new ApiError(error.name, httpStatusCodes.NOT_FOUND, "Role not found");
  }
};

const insertRole = async (role) => {
  try {
    const newRole = parseRoleModel(role);
    const insertedRole = newRole.save();
    return insertedRole;
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.BAD_REQUEST,
      "Role not saved"
    );
  }
};

const deleteRolebyID = async (id) => {
  try {
    const roleExists = await Role.findOne({ _id: id });
    if (roleExists == null)
      throw new ApiError(
        "NOT_FOUND",
        httpStatusCodes.NOT_FOUND,
        "Role not found"
      );
    await Role.deleteOne({ _id: id });
    const deleted = await Role.findOne({ _id: id });
    if (deleted == null)
      return {
        success: "true",
        statusCode: httpStatusCodes.OK,
        message: "Role deleted successfully",
      };
    else
      throw new ApiError(
        "DELETE_FAILED",
        httpStatusCodes.INTERNAL_SERVER,
        "Role not deleted"
      );
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.INTERNAL_SERVER,
      "Role not deleted"
    );
  }
};

module.exports = {
  getRoles,
  insertRole,
  deleteRolebyID,
  updateRoleById,
};
