import express from "express";
import { CreateLead, GetLead, GetLeads, NewRemark, UpdateLead } from "../controllers/lead.controller";
import {  isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";

const router = express.Router()

router.route("/leads")
    .get(isAuthenticatedUser, GetLeads)
    .post(isAuthenticatedUser, CreateLead)
router.route("/leads/:id")
    .get(isAuthenticatedUser, GetLead)
    .put(isAuthenticatedUser, UpdateLead)
    .patch(isAuthenticatedUser, NewRemark)

export default router