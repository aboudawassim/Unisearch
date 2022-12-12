const { Schema, mongoose } = require("mongoose");

const permissionSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  createdAt: Date,
});

var handleE11000 = function (error, res, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
};

permissionSchema.post("save", handleE11000);
permissionSchema.post("update", handleE11000);
permissionSchema.post("findOneAndUpdate", handleE11000);
permissionSchema.post("insertMany", handleE11000);

function parsePermissionModel(params) {
  return new Permission({
    name: params.name,
    createdAt: new Date(),
  });
}

function serializePermission(doc) {
  return {
    id: doc._id,
    name: doc.name,
    createdAt: doc.createdAt,
  };
}

const Permission = mongoose.model("permissions", permissionSchema);
module.exports = { Permission, parsePermissionModel, serializePermission };
