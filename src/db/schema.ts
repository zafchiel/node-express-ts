import { InferModel } from "drizzle-orm"
import { integer, pgTable, serial, varchar, real } from "drizzle-orm/pg-core"

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  price: real("price").notNull(),
})

export type Product = InferModel<typeof products>
