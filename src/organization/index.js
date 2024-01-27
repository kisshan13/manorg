import { Router } from "express";

import * as controller from "./controller.js";
import jwtVerifier from "../../globals/middlewares/jwt.middleware.js";
import authToken from "../../globals/middlewares/auth.token.js";

const router = Router();

export default () => {

    console.log(...authToken({blockOnError: true}))
    router.use(...authToken({ blockOnError: true }))
  

    router.get("/hii", (req, res) => res.send("hello"))
    router.post("/create", controller.create);
    router.get("/info", controller.info);
    router.post("/invite", controller.inviteCreate);

    return router
}