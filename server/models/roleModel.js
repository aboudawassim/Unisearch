const { Schema, mongoose } = require("mongoose");
const {
  getPermissionbyID,
} = require("../controllers/permissions/permissionsController");
const { serializePermission } = require("./permissionModel");

const roleSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  description: String,
  permissions: Array,
  createdAt: Date,
});

var handleE11000 = function (error, res, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
};

roleSchema.post("save", handleE11000);
roleSchema.post("update", handleE11000);
roleSchema.post("findOneAndUpdate", handleE11000);
roleSchema.post("insertMany", handleE11000);

function parseRoleModel(params) {
  return new Role({
    name: params.name,
    description: params.description,
    permissions: params.permissions,
    createdAt: new Date(),
  });
}

function serializeRole(doc) {
  return {
    id: doc._id,
    name: doc.name,
    description: doc.description,
    permissions: doc.permissions,
    createdAt: doc.createdAt,
  };
}

const Role = mongoose.model("roles", roleSchema);
module.exports = { Role, parseRoleModel, serializeRole };
