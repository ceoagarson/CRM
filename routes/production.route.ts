import express from "express";
import { isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";
import { CreateProduction, GetProductionsByDate, GetProductionsByDateRange } from "../controllers/production.controller";

const router = express.Router()

router.route("/productions/:id")
    .post(isAuthenticatedUser, isAdmin, CreateProduction)
router.get("/bydate/productions", isAuthenticatedUser, isAdmin, GetProductionsByDate)
router.get("/bydaterange/productions", isAuthenticatedUser, isAdmin, GetProductionsByDateRange)

export default router