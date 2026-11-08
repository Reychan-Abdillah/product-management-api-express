import productServices from "../services/product.service.js"
import sendResponse from "../utils/response.js"

const getData = async (req, res) => {
    const page = req.page
    const products = await productServices.getData(page)
    if (!products.success) {
        return sendResponse(res, 404, {message :products.message})
    }
    return sendResponse(res, 200, products)
}
export default {
    getData
}


