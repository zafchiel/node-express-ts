import { Response, Request } from "express"
import db from "../db"
import { products, Product } from "../db/schema"

export const getAllProducts = async (_req: Request, _res: Response) => {
  const productArray: Product[] = await db.select().from(products)

  if (!productArray) {
    throw new Error("No products found")
  }

  _res.status(200).json(productArray)
}
