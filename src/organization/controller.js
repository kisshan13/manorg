import * as utils from "../../globals/utilities/index.js"
import ApiResponse from "../../globals/utilities/api-response.js";


import User from "../auth/schema.js";
import * as userPipeline from "../auth/pipelines.js"

import Organization from "./schema.js";
import * as schemas from "./utils.js";

import {generateOrganizationCode} from "./utils.js";
import {ApiError} from "../../globals/utilities/errors.js";
import PERMISSION from "../../globals/config/permission.js";

const {requestHandler} = utils;

export const create = requestHandler(async (req, res, next) => {
    const info = schemas.create.parse(req.body);


    const userInfo = res?.id ? await User.findById(res?.id) : null;

    if(!userInfo) {
        return res.status(400).json(new ApiResponse({
            status: 400,
            message: "No such used exists to create organization with."
        }))
    }

    if(userInfo.organization) {
        return res.status(400).json(new ApiResponse({
            status: 400,
            message: "Only one organization can be created at a time."
        }))
    }

    const organization = new Organization({
        ...info,
        organizationCode: generateOrganizationCode(info.name),
        createdBy: userInfo._id,
        ownedBy: userInfo._id,
    });

    userInfo.organization = organization._id
    userInfo.permissions = ["*"]

    const [savedUser, saveOrg] = await Promise.all([
        organization.save(),
        userInfo.save()
    ]);

    return res.status(201).json(new ApiResponse({
        status: 201,
        message: "Organization Created Successfully."
    }));
});

export const inviteCreate = requestHandler(async (req, res,next) => {

    const {user} = await  userPipeline.checkPermission({userId: user, permission: [PERMISSION.invite.create, PERMISSION.invite.manage]});

    const organization = user?.organization ? await Organization.findById(user.organization).lean() : false

    if(!organization) {
        throw new ApiError(400, "You're not in any organization.")
    }
})
