const sendResponse = (res, statusCode, data) => {
    return res.status(statusCode).json(data)
}
export default sendResponse