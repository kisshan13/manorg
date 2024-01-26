import User from "./schema.js"
import {requestHandler} from "../../globals/utilities/index.js";
import {ApiError} from "../../globals/utilities/errors.js";

const injectUserInfo =  async ({lean= false}) => {
    return requestHandler(async (req, res, next) => {
        const user = lean ? await User.findById(res.id) : await  User.findById(res.id).lean();

        if(!user) {
            throw new ApiError(400, "No such user exists with that id.")
        }

        res.user = user;
        next()
    })
}