const { ApiError } = require("../../helpers/apiError");
const httpStatusCodes = require("../../helpers/httpStatusCodes");
const {
  Database,
  serializeDatabase,
  parseDatabaseModel,
} = require("../../models/databaseModel");

const getDatabases = async () => {
  try {
    let databases = await Database.find();
    return databases.map((database) => serializeDatabase(database));
  } catch (error) {
    throw new ApiError(error.name, httpStatusCodes.NOT_FOUND, "No databases");
  }
};

const insertDatabase = async (database) => {
  try {
    const newDatabase = parseDatabaseModel(database);
    const insertedDatabase = newDatabase.save();
    return insertedDatabase;
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.BAD_REQUEST,
      "Database not saved"
    );
  }
};

const deleteDatabasebyID = async (id) => {
  try {
    const databaseExists = await Database.findOne({ _id: id });
    if (databaseExists == null)
      throw new ApiError(
        "NOT_FOUND",
        httpStatusCodes.NOT_FOUND,
        "Database not found"
      );
    await Database.deleteOne({ _id: id });
    const deleted = await Database.findOne({ _id: id });
    if (deleted == null)
      return {
        success: "true",
        statusCode: httpStatusCodes.OK,
        message: "Database deleted successfully",
      };
    else
      throw new ApiError(
        "DELETE_FAILED",
        httpStatusCodes.INTERNAL_SERVER,
        "Database not deleted"
      );
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.INTERNAL_SERVER,
      "Database not deleted"
    );
  }
};

const updateDatabaseById = async (id, body) => {
  try {
    await Database.findOneAndUpdate({ _id: id }, body);
    const updatedDatabase = await Database.findOne({ _id: id });
    return serializeDatabase(updatedDatabase);
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.NOT_FOUND,
      "Database not found"
    );
  }
};

module.exports = {
  getDatabases,
  insertDatabase,
  deleteDatabasebyID,
  updateDatabaseById,
};
