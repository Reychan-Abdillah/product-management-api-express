import express from "express"
import productController from "../controllers/product.controller.js"
import validatePagination from "../middleware/validatePagination.js"

const router = express.Router()
router.get("/", validatePagination(), productController.getData)

export default router