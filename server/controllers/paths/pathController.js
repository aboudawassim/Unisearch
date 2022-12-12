const { ApiError } = require("../../helpers/apiError");
const httpStatusCodes = require("../../helpers/httpStatusCodes");
const {
  Path,
  serializePath,
  parsePathModel,
} = require("../../models/pathModel");

const getPaths = async () => {
  try {
    let paths = await Path.find();
    return paths.map((path) => serializePath(path));
  } catch (error) {
    throw new ApiError(error.name, httpStatusCodes.NOT_FOUND, "No paths");
  }
};

const insertPath = async (path) => {
  try {
    const newPath = parsePathModel(path);
    const insertedPath = newPath.save();
    return insertedPath;
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.BAD_REQUEST,
      "Path not saved"
    );
  }
};

const deletePathbyID = async (id) => {
  try {
    const pathExists = await Path.findOne({ _id: id });
    if (pathExists == null)
      throw new ApiError(
        "NOT_FOUND",
        httpStatusCodes.NOT_FOUND,
        "Path not found"
      );
    await Path.deleteOne({ _id: id });
    const deleted = await Path.findOne({ _id: id });
    if (deleted == null)
      return {
        success: "true",
        statusCode: httpStatusCodes.OK,
        message: "Path deleted successfully",
      };
    else
      throw new ApiError(
        "DELETE_FAILED",
        httpStatusCodes.INTERNAL_SERVER,
        "Path not deleted"
      );
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.INTERNAL_SERVER,
      "Path not deleted"
    );
  }
};

module.exports = {
  getPaths,
  insertPath,
  deletePathbyID,
};
