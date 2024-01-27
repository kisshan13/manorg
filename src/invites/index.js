import {Router} from "express";

const router = Router()

export default () => {
    router.get("/:id")

    return router
}