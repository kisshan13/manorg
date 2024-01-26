import fs from "fs"
import path from "path"
import {errorMiddleware} from "../middlewares/index.js";

async function loadAPIRoutes(app, config) {
    const routesPath = path.resolve(config.dirname, "src")
    const routes = await fs.readdirSync(routesPath);

    routes.forEach(async (file, i) => {
        const filePath = path.resolve(routesPath, file, "index.js");
        const loaderFn = await import("file:///" + filePath)

        app.use(`/api/${file}`, loaderFn.default())
        console.log(`⚡ Loaded "/api/${file}" `)

        if(routes?.length === i + 1) {
            app.use(errorMiddleware);
            console.log(`⚡ Loaded Error Handler `)
        }

    })

    return true;
}

export default loadAPIRoutes;
