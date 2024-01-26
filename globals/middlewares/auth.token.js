import {requestHandler} from "../utilities/index.js";
import jwtVerifier from "./jwt.middleware.js";
import ApiResponse from "../utilities/api-response.js";

const authMiddleware = ({blockOnError}) => {

    return requestHandler(async (req, res, next) => {
        const auth = req.headers.Authorization?.split(" ")[0]

        if(!auth && blockOnError) {
            return res.status(401).json(new ApiResponse({
                status: 401,
                message: "Missing Auth Token"
            }))
        }

        res["auth"] = auth;
        next();
    })
}

function checkAuthToken({blockOnError = false}) {
    if(blockOnError) {
        return [authMiddleware({blockOnError: true}), jwtVerifier()]
    }

    return authMiddleware;
}

export default checkAuthToken;