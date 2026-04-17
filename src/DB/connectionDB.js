import mongoose from "mongoose"
import { DB_URI } from "../../config/config.service.js";

const checkConnection = async () => {
   await mongoose.connect(DB_URI)
   .then(() => {
    console.log(`Connected to ${DB_URI}` );
   })
   .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
   });
}

export default checkConnection;
   