import express from "express";
import { isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";
import { CreateCategory, CreateMachine, CreateProduction, GetCategories, GetMachines, GetProductionsByDate, GetProductionsByDateRange, UpdateCategory, UpdateMachine } from "../controllers/production.controller";

const router = express.Router()

router.route("/productions/:id")
    .post(isAuthenticatedUser, isAdmin, CreateProduction)
router.get("/bydate/productions", isAuthenticatedUser, isAdmin, GetProductionsByDate)
router.get("/bydaterange/productions", isAuthenticatedUser, isAdmin, GetProductionsByDateRange)
router.route("/machines")
    .get(isAuthenticatedUser, isAdmin, GetMachines)
    .post(isAuthenticatedUser, isAdmin, CreateMachine)
router.route("/machines/:id")
    .put(isAuthenticatedUser, isAdmin, UpdateMachine)
router.route("/categories")
    .get(isAuthenticatedUser, isAdmin, GetCategories)
    .post(isAuthenticatedUser, isAdmin, CreateCategory)
router.route("/categories/:id")
    .put(isAuthenticatedUser, isAdmin, UpdateCategory)

export default router