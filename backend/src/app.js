import express from "express"
import routerProducts from "./routes/product.routes.js"
import notFound from "./middleware/notFound.js"
import errorHandler from "./middleware/errorHandler.js"

const app = express()

app.use(express.json())

app.use("/products", routerProducts)
app.use(notFound)
app.use(errorHandler)
export default app