import {z} from "zod";

export const create = z.object({
    name: z.string(),
    size: z.number(),
    category: z.string(),
    address: z.object({
        addressLine: z.string().optional(),
        pincode: z.number().optional(),
        city: z.string(),
        country: z.string()
    }),
})

export const generateOrganizationCode = (name) => {
    const formattedText = inputText.replace(/\s/g, '').toUpperCase();
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    const code = formattedText.slice(0, 3) + randomNumber;

    return code;
}