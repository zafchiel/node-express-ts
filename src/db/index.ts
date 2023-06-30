import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"
import dotenv from "dotenv"
dotenv.config()

if (!process.env.DB_URL) {
  throw new Error("DATABASE_URL is missing")
}

const connectionString = process.env.DB_URL
const client = postgres(connectionString)
const db = drizzle(client, { schema })

export default db
