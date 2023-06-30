import express from "express"
import {
  getAllProducts,
  getProductById,
  getProductByName,
} from "../controllers/products"
export const router = express.Router()

router.route("/").get(getAllProducts)
router.route("/:id").get(getProductById)
router.route("/name/:name").get(getProductByName)
