import dotenv from "dotenv";
import {resolve} from "node:path";
dotenv.config({path: resolve("config/.env.development")});

console.log(process.env.NODE_ENV );


export const PORT= +process.env.PORT
export const SALT_ROUNDS= process.env.SALT_ROUNDS
export const DB_URI= process.env.DB_URI
export const SECRET_KEY= process.env.SECRET_KEY