import express from "express";
import { CreateLead,  DeleteLead,  GetLeads, NewRemark, UpdateLead } from "../controllers/lead.controller";
import {  isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";

const router = express.Router()

router.route("/leads")
    .get(isAuthenticatedUser, GetLeads)
    .post(isAuthenticatedUser, CreateLead)
router.route("/leads/:id")
    .put(isAuthenticatedUser, UpdateLead)
    .delete(isAuthenticatedUser,isAdmin, DeleteLead)
router.route("/remarks/leads/:id").patch(isAuthenticatedUser, NewRemark)

export default router