import sendResponse from "../../utils/response.js"

const validateProductId = (req, res, next) => {
    const id = Number(req.params.id)
    if( id <= 0|| !Number.isInteger(id)) {
        return sendResponse(res, 400, {
            message : "invalid Product ID"
        })
    }
    req.prodctId = id
    next()
}
export default validateProductId