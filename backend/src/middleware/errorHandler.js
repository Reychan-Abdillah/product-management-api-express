const errorHandler = (err, req, res, next) => {
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            message: "Invalid JSON format"
        })
    }   

    console.error(err)

    return res.status(500).json({
        message: "Internal Server Error"
    })
}

export default errorHandler