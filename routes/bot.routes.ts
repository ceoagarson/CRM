import express from "express";
import { isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";
import { AssignFlow, CreateFlow, DestroyFlow, FuzzySearchTrackers, GetConnectedUsers, GetFlows, GetTrackers, ToogleTrackerStatus, UpdateFlow, UpdateTrackerName } from "../controllers/bot.controller";

const router = express.Router()

router.route("/flows").get(isAuthenticatedUser, isAdmin, GetFlows)
router.route("/flows").post(isAuthenticatedUser, isAdmin, CreateFlow)
router.route("/flows/:id").delete(isAuthenticatedUser, isAdmin, DestroyFlow)
router.route("/flows/:id").put(isAuthenticatedUser, isAdmin, UpdateFlow)
router.route("/trackers").get(isAuthenticatedUser, isAdmin, GetTrackers)
router.route("/trackers/:id").put(isAuthenticatedUser, isAdmin, UpdateTrackerName)
router.route("/toogle").post(isAuthenticatedUser, isAdmin, ToogleTrackerStatus)
router.route("/connected/users").get(isAuthenticatedUser, GetConnectedUsers)
router.route("/flows/asign/:id").patch(isAuthenticatedUser, AssignFlow)
router.route("/search/trackers").get(isAuthenticatedUser, FuzzySearchTrackers)
export default router

