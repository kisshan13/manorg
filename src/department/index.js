import {Router} from "express";
import authToken from "../../globals/middlewares/auth.token.js";
import jwtVerifier from "../../globals/middlewares/jwt.middleware.js";

const router = Router()

export default () => {
    router.use(authToken({blockOnError: true}))
    router.use(jwtVerifier())

    // router.use()
}
