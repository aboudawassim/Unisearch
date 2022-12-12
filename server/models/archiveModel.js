const { Schema, mongoose } = require("mongoose");

const archiveSchema = new Schema({
  id: Schema.Types.ObjectId,
  content: String,
  owner: String,
  ownerID: Schema.Types.ObjectId,
  createdAt: Date,
});

var handleE11000 = function (error, res, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
};

archiveSchema.post("save", handleE11000);
archiveSchema.post("update", handleE11000);
archiveSchema.post("findOneAndUpdate", handleE11000);
archiveSchema.post("insertMany", handleE11000);

function parseArchiveModel(params) {
  return new Archive({
    owner: params.owner,
    ownerID: params.ownerID,
    content: params.content,
    createdAt: new Date(),
  });
}

function serializeArchive(doc) {
  return {
    id: doc._id,
    owner: doc.owner,
    ownerID: doc.ownerID,
    content: doc.content,
    createdAt: doc.createdAt,
  };
}

const Archive = mongoose.model("archive", archiveSchema);
module.exports = { Archive, parseArchiveModel, serializeArchive };
