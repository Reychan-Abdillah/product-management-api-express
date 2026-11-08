import sendResponse from "../utils/response.js"

const validatePagination = () => {
    return (req, res, next) => {
        const page = Number(req.query.page ?? 1)

        if(!Number.isInteger(page) || page <= 0) {
           return sendResponse(res,400, {message : "Invalid page"})
        }
        req.page = page
        next()
    }
}
export default validatePagination
