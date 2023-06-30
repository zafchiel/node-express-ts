import express from "express"
import { getAllProducts } from "../controllers/products"
export const router = express.Router()

router.route("/").get(getAllProducts)
