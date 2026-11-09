import sendResponse from "../utils/response.js"

const rejectQuery = (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        return sendResponse(res, 400, {
            message: "Query parameters are not allowed"
        })
    }
    next()
}
export default rejectQuery