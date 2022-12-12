const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
const {
  getProducts,
  insertProduct,
  updateProductById,
  deleteProductbyID,
  deleteAllProducts,
} = require("../controllers/productController");
const { ApiError } = require("../helpers/apiError");
const httpStatusCodes = require("../helpers/httpStatusCodes");

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.status(200).send(products);
});

router.post("/", async (req, res) => {
  const insertedProduct = await insertProduct(req.body);
  res.status(200).send(insertedProduct);
});

router.patch("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      throw new ApiError(
        "VALIDATION_ERROR",
        httpStatusCodes.BAD_REQUEST,
        "Invalid ID"
      );
    const updatedProduct = await updateProductById(req.params.id, req.body);
    if (updatedProduct) res.status(200).send(updatedProduct);
    else res.status(404).send("empty");
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id))
      throw new ApiError(
        "VALIDATION_ERROR",
        httpStatusCodes.BAD_REQUEST,
        "Invalid ID"
      );
    const deletedProduct = await deleteProductbyID(req.params.id);
    res.status(200).send(deletedProduct);
  } catch (error) {
    next(error);
  }
});
router.delete("/", async (req, res, next) => {
  try {
    const response = await deleteAllProducts();
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
