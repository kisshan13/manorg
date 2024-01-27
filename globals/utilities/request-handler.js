/**
 *
 * @param {(req: import("express").Request, res:import("express").Response, next:import("express").NextFunction) => void} controller
 */
export const requestHandler =(controller) => {
    return (req, res, next) => {
        Promise.resolve(controller(req, res,next)).catch((err) => next(err))
    }
}