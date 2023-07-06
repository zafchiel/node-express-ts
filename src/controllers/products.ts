import { Response, Request, NextFunction } from "express"
import db from "../db"
import { products, Product } from "../db/schema"
import { eq, sql } from "drizzle-orm"
import { StatusCodes } from "http-status-codes"
import { NotFoundError } from "../../errors"

export const getAllProducts = async (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const productArray: Product[] = await db.select().from(products)

    if (!productArray) {
      throw new NotFoundError("No products found")
    }

    _res.status(StatusCodes.OK).json(productArray)
  } catch (error) {
    next(error)
  }
}

export const getProductById = async (_req: Request, _res: Response) => {
  const { id } = _req.params
  const product: Product[] = await db
    .select()
    .from(products)
    .where(sql`${products.id} = ${id}`)
    .limit(1)

  if (!product) {
    throw new NotFoundError(`Product of id: ${id} not found`)
  }
  _res.status(StatusCodes.OK).json(product)
}

export const getProductByName = async (_req: Request, _res: Response) => {
  const { name } = _req.params
  const product: Product[] = await db
    .select()
    .from(products)
    .where(eq(products.name, name))

  if (!product) {
    throw new NotFoundError(`Product of name: ${name} not found`)
  }
  _res.status(StatusCodes.OK).json(product)
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
    throw new Error("Could not create product")
  }
  _res.status(StatusCodes.CREATED).json(product)
}
