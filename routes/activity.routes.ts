import express from "express";
import { CreateActivity, DeleteActivity, FilterActivities, FuzzySearchActivities, GetActivities, GetActivity, ToogleActivityStatus, UpdateActivity } from "../controllers/activity.controller";
import {  isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";

const router = express.Router()

router.route("/activities")
    .get(isAuthenticatedUser, GetActivities)
router.route("/activity/:id")
    .post(isAuthenticatedUser, CreateActivity)
    .get(isAuthenticatedUser, GetActivity)
    .put(isAuthenticatedUser, UpdateActivity)
    .patch(isAuthenticatedUser, ToogleActivityStatus)
    .delete(isAuthenticatedUser,isAdmin, DeleteActivity)
router.get("/activity/filter", isAuthenticatedUser, FilterActivities)
router.get("/activity/search", isAuthenticatedUser, FuzzySearchActivities)

export default router