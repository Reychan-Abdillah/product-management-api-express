import sendResponse from "../utils/response.js"

const notFound = ( req, res, next) => {
    return sendResponse(res, 404, {
        message: `Route ${req.originalUrl} not found`,
    })
}

export default notFound