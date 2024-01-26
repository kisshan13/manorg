import {requestHandler} from "../../globals/utilities/index.js";
import appCache from "../../globals/config/cache.js";
import ApiResponse from "../../globals/utilities/api-response.js";
import * as jwt from "../../globals/config/jsonwebtoken.js"

import User from "./schema.js";

import * as schemas from "./utils.js"
import {generateHash} from "./utils.js";
import bcrypt from "bcrypt";

export const register = requestHandler(async (req, res, next) => {
    const {password, name, countryCode, mail, phone} = schemas.register.parse(req.body);

    const isUserExists = await User.findOne({mail: mail, phone: phone}).lean();

    if (isUserExists) {
        return res.status(400).send(new ApiResponse({status: 400, message: "User with email / phone already exists."}))
    }

    const user = new User({
        name,
        mail,
        phone,
        countryCode,
        password: await generateHash(password),
        isVerified: true,
    });

    await user.save();

    return res.status(201).send(new ApiResponse({
        status: 201,
        message: "User Created Successfully !",
        data: {
            jwt: jwt.sign({id: user._id})
        }
    }));
});

export const login = requestHandler(async (req, res,next) => {
    const {mail, password} = schemas.login.parse(req.body);

    const user = await User.findOne({mail: mail}).lean();

    const isPasswordMatched = user ? bcrypt.compareSync(password, user.password) : false;

    if(!isPasswordMatched) {
        return res.status(401).json(new ApiResponse({
            status: 401,
            message: "Invalid user credentials"
        }))
    }

    return res.status(200).json(new ApiResponse({
        status: 200,
        message: "Logged in Successfully",
        data: {
            jwt: jwt.sign({id: user._id})
        }
    }))
})
