import db from "../config/db.js"

const getData = async(limit, offset) => {
    const [rows] = await db.query(
        `SELECT name, price, stock FROM product_express_db ORDER BY id LIMIT ? OFFSET ? `,
        [limit, offset]
    )
    return rows
}


const count = async () => { 
    const [[row]] = await db.query(
        `SELECT COUNT(*) AS total FROM product_express_db`
    )
    return row.total
}

export default {
    getData, count
}


