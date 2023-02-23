import express from "express";
import multer from "multer";
import { CreateLead, FilterLeads, FuzzySearchLeads, GetLead, GetLeads, ToogleLeadStatus, UpdateLead } from "../controllers/lead.controller";
import {  isAdmin, isAuthenticatedUser, isCrmAdmin } from "../middlewares/auth.middleware";

const router = express.Router()
const upload = multer({ storage: multer.diskStorage({ destination: "/tmp/" }) })

router.route("/leads")
    .get(isAuthenticatedUser, GetLeads)
    .post(isAuthenticatedUser, upload.single("dp"), CreateLead)
router.route("/leads/:id")
    .get(isAuthenticatedUser, GetLead)
    .put(isAuthenticatedUser,isAdmin, upload.single("dp"), UpdateLead)
    .patch(isAuthenticatedUser,isAdmin, ToogleLeadStatus)
router.get("/leads/filter", isAuthenticatedUser, FilterLeads)
router.get("/leads/search", isAuthenticatedUser, FuzzySearchLeads)

export default router