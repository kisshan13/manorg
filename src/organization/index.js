import {Router} from "express";

import checkAuthToken from "../../globals/middlewares/auth.token.js"

import Organization from "./schema.js";
import * as controller from "./controller.js";
import jwtVerifier from "../../globals/middlewares/jwt.middleware.js";
import authToken from "../../globals/middlewares/auth.token.js";

const router = Router();

export {
    Organization
}

export default () => {

    router.use(authToken({blockOnError: true}))
    router.use(jwtVerifier())

    router.post("/create", controller.create);
    router.post("/invite", controller.inviteCreate);

    return router
}