import express from "express";
import { isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";
import { CreateProduction, GetProduction, GetProductions, GetProductionsByDateRange } from "../controllers/production.controller";

const router = express.Router()

router.route("/productions")
    .get(isAuthenticatedUser, isAdmin, GetProductions)
router.route("/productions/:id")
    .post(isAuthenticatedUser, isAdmin, CreateProduction)
    .get(isAuthenticatedUser, isAdmin, GetProduction)
router.route("/filter/productions/").get(GetProductionsByDateRange)

export default router