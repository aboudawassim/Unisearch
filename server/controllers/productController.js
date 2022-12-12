const { ApiError } = require("../helpers/apiError");
const httpStatusCodes = require("../helpers/httpStatusCodes");
const {
  Product,
  serializeProduct,
  parseProductModel,
} = require("../models/productModel");

const getProducts = async () => {
  try {
    let products = await Product.find();
    return products.map((product) => serializeProduct(product));
  } catch (error) {
    throw new ApiError(error.name, httpStatusCodes.NOT_FOUND, "No products");
  }
};

const insertProduct = async (product) => {
  try {
    const newProduct = parseProductModel(product);
    const insertedProduct = newProduct.save();
    return insertedProduct;
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.BAD_REQUEST,
      "Product not saved"
    );
  }
};

const updateProductById = async (id, body) => {
  try {
    await Product.findOneAndUpdate({ _id: id }, body);
    const updatedProduct = await Product.findOne({ _id: id });
    return serializeProduct(updatedProduct);
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.NOT_FOUND,
      "Product not found"
    );
  }
};

const deleteProductbyID = async (id) => {
  try {
    const productExists = await Product.findOne({ _id: id });
    if (productExists == null)
      throw new ApiError(
        "NOT_FOUND",
        httpStatusCodes.NOT_FOUND,
        "Product not found"
      );
    await Product.deleteOne({ _id: id });
    const deleted = await Product.findOne({ _id: id });
    if (deleted == null)
      return {
        success: "true",
        statusCode: httpStatusCodes.OK,
        message: "Product deleted successfully",
      };
    else
      throw new ApiError(
        "DELETE_FAILED",
        httpStatusCodes.INTERNAL_SERVER,
        "Product not deleted"
      );
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.INTERNAL_SERVER,
      "Product not deleted"
    );
  }
};

const deleteAllProducts = async () => {
  try {
    const response = await Product.deleteMany({});
    return {
      success: "true",
      statusCode: httpStatusCodes.OK,
      message: "Products deleted successfully",
    };
  } catch (error) {
    throw new ApiError(
      error.name,
      httpStatusCodes.INTERNAL_SERVER,
      "Products not deleted"
    );
  }
};

module.exports = {
  getProducts,
  insertProduct,
  updateProductById,
  deleteProductbyID,
  deleteAllProducts,
};
