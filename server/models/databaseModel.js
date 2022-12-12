const { Schema, mongoose } = require("mongoose");

const databaseSchema = new Schema({
  id: Schema.Types.ObjectId,
  dialect: String,
  database: String,
  host: String,
  username: String,
  password: String,
  port: String,
  createdAt: Date,
});

var handleE11000 = function (error, res, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
};

databaseSchema.post("save", handleE11000);
databaseSchema.post("update", handleE11000);
databaseSchema.post("findOneAndUpdate", handleE11000);
databaseSchema.post("insertMany", handleE11000);

function parseDatabaseModel(params) {
  return new Database({
    dialect: params.dialect,
    database: params.database,
    host: params.host,
    username: params.username,
    password: params.password,
    port: params.port,
    createdAt: new Date(),
  });
}

function serializeDatabase(doc) {
  return {
    id: doc._id,
    dialect: doc.dialect,
    database: doc.database,
    host: doc.host,
    username: doc.username,
    password: doc.password,
    port: doc.port,
    createdAt: doc.createdAt,
  };
}

const Database = mongoose.model("databases", databaseSchema);
module.exports = { Database, parseDatabaseModel, serializeDatabase };
