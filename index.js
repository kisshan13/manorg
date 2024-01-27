import express from "express";
import { config } from "dotenv";
import * as url from 'url';

import * as middlewares from "./globals/middlewares/index.js"
import loadAPIRoutes from "./globals/config/load-modules.js";

const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

config();

async function main() {

    const app = express();

    app.use(express.json());

    const modules = await loadAPIRoutes(app, { dirname: __dirname });

    app.listen(3000, () => {
        console.log("Server Running On Port 3000")
    })

}

main()