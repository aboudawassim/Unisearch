const { Schema, mongoose } = require("mongoose");

const productSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: String,
  description: String,
  keys: Array,
  createdAt: Date,
});

var handleE11000 = function (error, res, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("There was a duplicate key error"));
  } else {
    next();
  }
};

productSchema.post("save", handleE11000);
productSchema.post("update", handleE11000);
productSchema.post("findOneAndUpdate", handleE11000);
productSchema.post("insertMany", handleE11000);

function parseProductModel(params) {
  return new Product({
    name: params.name,
    description: params.description,
    keys: params.keys ?? [],
    createdAt: new Date(),
  });
}

function serializeProduct(doc) {
  return {
    id: doc._id,
    name: doc.name,
    description: doc.description,
    keys: doc.keys,
    createdAt: doc.createdAt,
  };
}

const Product = mongoose.model("product", productSchema);
module.exports = { Product, parseProductModel, serializeProduct };
