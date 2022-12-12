const { Schema, mongoose } = require("mongoose");

const pathSchema = new Schema({
  id: Schema.Types.ObjectId,
  path: String,
  createdAt: Date,
});

var handleE11000 = function (error, res, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
};

pathSchema.post("save", handleE11000);
pathSchema.post("update", handleE11000);
pathSchema.post("findOneAndUpdate", handleE11000);
pathSchema.post("insertMany", handleE11000);

function parsePathModel(params) {
  return new Path({
    path: params.path,
    createdAt: new Date(),
  });
}

function serializePath(doc) {
  return {
    id: doc._id,
    path: doc.path,
    createdAt: doc.createdAt,
  };
}

const Path = mongoose.model("paths", pathSchema);
module.exports = { Path, parsePathModel, serializePath };
