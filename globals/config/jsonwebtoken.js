import jwt from "jsonwebtoken";
import {config} from "dotenv";

config();

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET) {
    console.log(
        "Can't start app without JWT_SECRET"
    )
    process.exit(0)
}

export function sign(info) {
    return jwt.sign(info, JWT_SECRET, {expiresIn: "30d"})
}

export function verify(info) {
    return jwt.verify(info, JWT_SECRET);
}