import moment from "moment";

import * as utils from "../../globals/utilities/index.js";
import ApiResponse from "../../globals/utilities/api-response.js";
import { ApiError } from "../../globals/utilities/errors.js";
import PERMISSION from "../../globals/config/permission.js";

import User from "../auth/schema.js";
import * as userPipeline from "../auth/pipelines.js";

import Invites from "../invites/schema.js";

import Organization from "./schema.js";
import * as schemas from "./utils.js";

import { generateOrganizationCode } from "./utils.js";
import { invitePrefixes } from "./constants.js";
import permission from "../../globals/config/permission.js";

const { requestHandler } = utils;

export const create = requestHandler(async (req, res, next) => {
    const info = schemas.create.parse(req.body);

    const userInfo = res?.id ? await User.findById(res?.id) : null;

    if (!userInfo) {
        return res.status(400).json(
            new ApiResponse({
                status: 400,
                message: "No such used exists to create organization with.",
            })
        );
    }

    if (userInfo.organization) {
        return res.status(400).json(
            new ApiResponse({
                status: 400,
                message: "Only one organization can be created at a time.",
            })
        );
    }

    const organization = new Organization({
        ...info,
        organizationCode: generateOrganizationCode(info.name),
        createdBy: userInfo._id,
        ownedBy: userInfo._id,
    });

    userInfo.organization = organization._id;
    userInfo.permissions = ["*"];

    const [savedUser, saveOrg] = await Promise.all([
        organization.save(),
        userInfo.save(),
    ]);

    return res.status(201).json(
        new ApiResponse({
            status: 201,
            message: "Organization Created Successfully.",
        })
    );
});

export const inviteCreate = requestHandler(async (req, res, next) => {
    const { email, expiresIn } = schemas.inviteCreate.parse(req.body);
    const { user } = await userPipeline.checkPermission({
        userId: res?.id,
        permission: [PERMISSION.invite.create, PERMISSION.invite.manage],
    });

    const invite = new Invites({
        organization: user.organization,
        expiresIn: moment().add(expiresIn, "days"),
        invitedBy: user.id,
        inviteTo: email,
        inviteCode: generateOrganizationCode(
            invitePrefixes[Math.floor(Math.random() * invitePrefixes.length)]
        ),
    });

    await invite.save();

    // TODO: Add mailing service to send the invite.
    console.log(invite)
    res.status(201).send(new ApiResponse({ status: 201, message: "Invite created successfully.", inviteCode: invite.inviteCode }));
});

export const info = requestHandler(async (req, res, next) => {
    const user = await User.findById(res?.id).select("organization").populate("organization").lean()

    res.send(user)
})


// Requires Permission: "INVITE-MANAGE"
export const invites = requestHandler(async (req, res, next) => {
    const {user} = await userPipeline.checkPermission({userId: res?.id, permission: [permission.invite.manage]});
    console.log(user.organization)
    const invites = await Invites.find({organization: user.organization}).limit(10).populate("invitedBy", "-password -permissions").lean();
    console.log(invites)
    res.status(200).json(new ApiResponse({status: 200, message: "Invites", data: {invites}}));

})