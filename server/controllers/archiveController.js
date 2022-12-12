const { ApiError } = require("../helpers/apiError");
const httpStatusCodes = require("../helpers/httpStatusCodes");
const {
  Archive,
  parseArchiveModel,
  serializeArchive,
} = require("../models/archiveModel");

const getArchives = async () => {
  try {
    let archives = await Archive.find();
    return archives.map((archive) => serializeArchive(archive));
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.NOT_FOUND,
      "Archives not found"
    );
  }
};

const insertArchive = async (archive) => {
  try {
    const newArchive = parseArchiveModel(archive);
    const insertedArchive = newArchive.save();
    return insertedArchive;
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.BAD_REQUEST,
      "Archive not saved"
    );
  }
};

const updateArchiveById = async (id, body) => {
  try {
    await Archive.findOneAndUpdate({ _id: id }, body);
    const updatedArchive = await Archive.findOne({ _id: id });
    return serializeArchive(updatedArchive);
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.NOT_FOUND,
      "Archive not found"
    );
  }
};

const deleteArchivebyID = async (id) => {
  try {
    const archiveExists = await Archive.findOne({ _id: id });
    if (archiveExists == null)
      throw new ApiError(
        "NOT_FOUND",
        httpStatusCodes.NOT_FOUND,
        "Archive not found"
      );
    await Archive.deleteOne({ _id: id });
    const deleted = await Archive.findOne({ _id: id });
    if (deleted == null)
      return {
        success: "true",
        statusCode: httpStatusCodes.OK,
        message: "Archive deleted successfully",
      };
    else
      throw new ApiError(
        "DELETE_FAILED",
        httpStatusCodes.INTERNAL_SERVER,
        "Archive not deleted"
      );
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.INTERNAL_SERVER,
      "Archive not deleted"
    );
  }
};
const deleteAllArchives = async () => {
  try {
    const response = await Archive.deleteMany({});
    console.log(response);
    return {
      success: "true",
      statusCode: httpStatusCodes.OK,
      message: "Archives deleted successfully",
    };
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.INTERNAL_SERVER,
      "Archives not deleted"
    );
  }
};

module.exports = {
  getArchives,
  insertArchive,
  updateArchiveById,
  deleteArchivebyID,
  deleteAllArchives,
};
