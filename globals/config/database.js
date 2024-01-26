import mongoose from "mongoose";
import {config} from "dotenv";

config();

const DATABASE_URL = process.env.DATABASE_URL;

if(!DATABASE_URL) {
    console.log("Can't start app without database url specified.")
    process.exit(0)
}

const database = mongoose.createConnection(DATABASE_URL);

export default database