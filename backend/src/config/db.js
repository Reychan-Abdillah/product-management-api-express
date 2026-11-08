import mysql from "mysql2/promise"
import path from "node:path"
import dotenv from 'dotenv'
import {fileURLToPath} from "node:url"


const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);

dotenv.config({ 
    path: path.resolve(currentDir, "../../.env")
});

const db = await mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT

})

export default db