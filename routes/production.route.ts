import express from "express";
import { isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";
import { CreateProduction,  GetProductions, GetProductionsByCategory, GetProductionsByDate, GetProductionsByMachine } from "../controllers/production.controller";

const router = express.Router()

router.route("/productions")
    .get(isAuthenticatedUser, isAdmin, GetProductions)
router.route("/productions/:id")
    .post(isAuthenticatedUser, isAdmin, CreateProduction)
    
router.get("/bydate/productions", isAuthenticatedUser, isAdmin, GetProductionsByDate)
router.route("/filter/machine/reports/").get(GetProductionsByMachine)
router.route("/filter/category/reports/").get(GetProductionsByCategory)

export default router