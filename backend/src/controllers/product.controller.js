import productServices from "../services/product.service.js"
import sendResponse from "../utils/response.js"

const getData = async (req, res) => {
    const page = req.page
    const result = await productServices.getData(page)
    if (!result.success) {
        return sendResponse(res, 404, result.message)
    }
    return sendResponse(res, 200, result)
}

const getById = async (req, res) => {
    const prodctId = req.params.id
    const result = await productServices.getById(prodctId)
    if (!result.success) {
        return sendResponse(res, 400, result.message)
    }
    return sendResponse(res, 200, ...result.data)
}

const createData = async (req, res) => {
    const product = req.body
    const result = await productServices.createData(product)
    return sendResponse(res, 200, result)
}

const updateProduct = async (req, res) => {
    const productId = req.params.id
    const product = req.body
    const result = await productServices.updateProduct(productId, product)

    if (!result.success) {
        return sendResponse(res, 400, result.message)
    }
    return sendResponse(res, 200, result.message)
}

const deleteById = async (req, res) => {
    const productId = req.params.id
    const result = await productServices.deleteById(productId)
    if (!result.success) {
        return sendResponse(res, 400, result.message)
    }
    return sendResponse(res, 200, result.message)
}

const removeAll = async (req, res) => {
    const result = await productServices.removeAll()
    sendResponse(res, 200, result)
    

}
export default {
    getData, getById, createData, updateProduct, deleteById, removeAll
}


