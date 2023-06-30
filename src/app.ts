import express, { Express } from "express"
import dotenv from "dotenv"
dotenv.config()

const app: Express = express()
const port = process.env.PORT

import { router as productRouter } from "./routes/products"
app.use("/api/v1/products", productRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
