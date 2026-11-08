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
export default {
    getData
}
