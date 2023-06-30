import { Response, Request } from "express"
import db from "../db"
import { products, Product } from "../db/schema"
import { eq, sql } from "drizzle-orm"

export const getAllProducts = async (_req: Request, _res: Response) => {
  const productArray: Product[] = await db.select().from(products)

  if (!productArray) {
    throw new Error("No products found")
  }

  _res.status(200).json(productArray)
}

export const getProductById = async (_req: Request, _res: Response) => {
  const { id } = _req.params
  const product: Product[] = await db
    .select()
    .from(products)
    .where(sql`${products.id} = ${id}`)
    .limit(1)

  if (!product) {
    throw new Error("Product not found")
  }
  _res.status(200).json(product)
}

export const getProductByName = async (_req: Request, _res: Response) => {
  const { name } = _req.params
  const product: Product[] = await db
    .select()
    .from(products)
    .where(eq(products.name, name))

  if (!product) {
    throw new Error("Product not found")
  }
  _res.status(200).json(product)
}

export const createProduct = async (_req: Request, _res: Response) => {
  if (!_req.body) {
    throw new Error("Missing body")
  }

  if (!_req.body.name || !_req.body.price) {
    throw new Error("Missing required fields")
  }

  const product: Product[] = await db
    .insert(products)
    .values(_req.body)
    .returning()

  if (!product) {
    throw new Error("Product not found")
  }
  _res.status(200).json(product)
}
