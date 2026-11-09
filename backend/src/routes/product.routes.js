import express from "express"
import productController from "../controllers/product.controller.js"
import validatePagination from "../middleware/validation/validatePagination.js"
import validateProduct from "../middleware/validation/validateProduct.js"
import catchAsync from "../utils/catchAsync.js"
import rejectQuery from "../middleware/rejectQuery.js"
import validateProductId from "../middleware/validation/validateProductId.js"

const router = express.Router()
router.get("/", validatePagination, catchAsync(productController.getData))
router.get("/:id", rejectQuery, validateProductId, catchAsync(productController.getById))
router.post("/", rejectQuery, validateProduct("create"), catchAsync(productController.createData))
router.patch("/:id", rejectQuery,validateProductId, validateProduct("update"), catchAsync(productController.updateProduct))
router.delete("/:id", rejectQuery, validateProductId, catchAsync(productController.deleteById))
router.delete("/", rejectQuery, catchAsync(productController.removeAll))
export default router