import db from "../config/db.js"

const getData = async (limit, offset) => {
    const [rows] = await db.execute(
        `SELECT name, price, stock FROM product_express_db ORDER BY id LIMIT ? OFFSET ? `,
        [limit, offset]
    )
    return rows
}

const getById = async (productId) => {
    const [row] = await db.execute(
        `SELECT name, price, stock FROM product_express_db WHERE id = ?`,
        [productId]
    )
    return row
}
const count = async () => {
    const [[row]] = await db.query(
        `SELECT COUNT(*) AS total FROM product_express_db`
    )
    return row.total
}

const createData = async (product) => {
    const [result] = await db.query(
        `INSERT INTO product_express_db(name, price, stock) VALUES(?,?,?)`,
        [product.name, product.price, product.stock]
    )
    return result
}


const updateProduct = async (productId, product) => {
    const [result] = await db.execute(
        `UPDATE product_express_db  
        SET
        name = COALESCE(?, name),
        price = COALESCE(?, price),
        stock = COALESCE(?, stock)
        WHERE id = ?`,
        [
            product.name ?? null,
            product.price ?? null,
            product.stock ?? null,
            productId
        ]
    )
    return result
}


const deleteById = async (productId) => {
    const [result] = await db.execute(
        `DELETE FROM product_express_db WHERE id = ?`,
        [productId]
    )
    return result
}

const removeAll = async () => {
    const [result] = await db.execute(
        `TRUNCATE TABLE product_express_db`

    )
    return result
}
export default {
    getData, getById, count, createData, updateProduct, deleteById, removeAll
}


