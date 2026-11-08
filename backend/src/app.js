import express from "express"
import routerProducts from "./routes/product.routes.js"
import notFound from "./middleware/notFound.js"

const app = express()
app.use(express.json())
app.use("/products", routerProducts)

app.use(notFound)

export default app