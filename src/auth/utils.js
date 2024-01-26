import {z} from "zod";
import bcrypt from "bcrypt";

export const register = z.object({
    name: z.string(),
    mail: z.string().email(),
    countryCode: z.number(),
    phone: z.number(),
    password: z.string(),
})

export const login = z.object({
    mail: z.string().email(),
    password: z.string()
})

export const generateHash = async (pass) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pass, salt)

    return hash
}