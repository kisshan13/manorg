import {Router} from "express";

import * as  controller  from "./controller.js";

const router = Router();

export default () => {
    router.post('/register', controller.register);
    router.post("/login", controller.login);

    return router
}