
import sendResponse from "../../utils/response.js"

const validateProduct = (mode) => {
    return (req, res, next) => {
        if (
            !req.body ||
            typeof req.body !== "object" ||
            Array.isArray(req.body)
        ) {
            return sendResponse(res, 400, {
                message: "Request body must be an object"
            })
        }

        const { name, price, stock } = req.body

        const allowedFields = ["name", "price", "stock"]


        const invalidFields = Object.keys(req.body).filter(
            (field) => !allowedFields.includes(field)
        )

        if (invalidFields.length > 0) {
            return sendResponse(res, 400, {
                message: `Unknown fields: ${invalidFields.join(", ")}`
            })
        }

        if (mode === "create") {
            if (name === undefined || price === undefined || stock === undefined) {
                return sendResponse(res, 400, {
                    message: "Name, price, and stock are required"
                })
            }
        }


        if (mode === "update" && Object.keys(req.body).length === 0) {
            return sendResponse(res, 400, {
                message: "At least one field is required"
            })
        }

        if (name !== undefined) {
            if (typeof name !== "string" || name.trim() === "") {
                return sendResponse(res, 400, {
                    message: "Name must be a non-empty string"
                })
            }
        }


        if (price !== undefined) {
            if (
                typeof price !== "number" ||
                !Number.isFinite(price) ||
                price <= 0
            ) {
                return sendResponse(res, 400, {
                    message: "Price must be a positive number"
                })
            }
        }

        if (stock !== undefined) {
            if (!Number.isInteger(stock) || stock < 0) {
                return sendResponse(res, 400, {
                    message: "Stock must be a non-negative integer"
                })
            }
        }

        next()
    }
    
}

export default validateProduct
