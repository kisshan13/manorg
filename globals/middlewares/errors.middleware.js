import {ZodError} from "zod";

import * as errors from "../utilities/errors.js"
import ApiResponse from "../utilities/api-response.js"

import mongoose from "mongoose";
import ClientSideError from "../classes/errors.js";

function errorMiddleware(err, req, res, next) {
    console.log(err)
    let errMessage = "";
    let status = 500;
    if (err instanceof ZodError) {
        const errInfo = errors.handleZodError(err)
        errMessage = errInfo.message;
        status = errInfo.status;
    }

    if (err instanceof mongoose.mongo.MongoServerError) {
        const errInfo = errors.handleMongoServerError(err)
        errMessage = errInfo.message;
        status = errInfo.status;
    }

    if(err instanceof ClientSideError) {
        errMessage = err.message
        status=err.status
    }


    return res.status(status).json(new ApiResponse({
        status: status,
        message: errMessage || err.message,
        error: err
    }))
}

export default errorMiddleware;