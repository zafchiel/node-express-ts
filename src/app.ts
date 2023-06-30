import express, { Express } from "express"
import { router as productRouter } from "./routes/products"
import bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/v1/products", productRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
