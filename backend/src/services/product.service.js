import productRepository from "../repositories/product.repository.js";

const getData = async (page) => {
    const limit = 10
    const offset = (page - 1) * limit
    const totalProduct = await productRepository.count()
    const totalPages = Math.ceil(totalProduct / limit)


    if (totalProduct === 0) {
        return {
            success: true,
            data: [],
            pagination: {
                totalProduct: 0,
                currentPage: page,
                totalPages: 0,
                limit
            }
        }
    }


    if (page > totalPages) {
        return {
            success: false,
            message: "Page exceeds total pages"
        }
    }


    const data = await productRepository.getData(limit, offset)
    return {
        success: true,
        data,
        pagination: {
            totalProduct,
            currentPage: page,
            totalPages,
            limit
        }
    }

}

const getById = async (productId) => {
    const result = await productRepository.getById(productId)
    if (result.length === 0) {
        return {
            success: false,
            message: "Product Not Found"
        }
    }
    return {
        success: true,
        data: result
    }
}

const createData = (product) => {
    return productRepository.createData(product)
}

const updateProduct = async (productId, product) => {
    const result = await productRepository.updateProduct(productId, product)

    if (result.affectedRows === 0) {
        return {
            success: false,
            message: "Product Not Found"
        }
    }

    if (result.changedRows === 0) {
        return {
            success: false,
            message: "no data has been changed"
        }
    }
    return {
        success: true,
        message: "successfully updated product data"
    }
}

const deleteById = async (productId) => {
    const result = await productRepository.deleteById(productId)

    if (result.affectedRows === 0) {
        return {
            success: false,
            message: "Product Not Found"
        }

    }
    return {
        success: true,
        message: "successfully deleted the product"
    }

}

const removeAll = async() => {
    const result = await productRepository.removeAll()
    return {
        message : "success",
        result
    }
}

export default {
    getData, getById, createData, updateProduct, deleteById, removeAll
}
