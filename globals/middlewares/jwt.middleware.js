import {requestHandler} from "../utilities/index.js";
import * as jwt from "../config/jsonwebtoken.js"

function jwtVerifier() {
    return requestHandler(async (req, res,next ) => {
        const auth = res?.auth;

        const info = jwt.verify(auth);

        res.id = info?.id;
    })
}

export default  jwtVerifier;