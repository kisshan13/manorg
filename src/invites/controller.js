import {requestHandler} from "../../globals/utilities/index.js";
import Invites from "./schema.js";
import {ApiError} from "../../globals/utilities/errors.js";

export const accept = requestHandler(async (req, res, next) => {
    const {id} = req.params.id;

    const inv = await Invites.findOne({
        inviteCode: id
    })

    if (!inv) {
        throw new ApiError(400, "No such invite code exists");
    }
})