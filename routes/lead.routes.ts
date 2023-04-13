import express from "express";
import multer from "multer";
import { CreateLead, GetLead, GetLeads, NewRemark, UpdateLead } from "../controllers/lead.controller";
import {  isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";

const router = express.Router()
const upload = multer({ storage: multer.diskStorage({ destination: "/tmp/" }) })

router.route("/leads")
    .get(isAuthenticatedUser, GetLeads)
    .post(isAuthenticatedUser, upload.none(), CreateLead)
router.route("/leads/:id")
    .get(isAuthenticatedUser, GetLead)
    .put(isAuthenticatedUser,isAdmin, upload.none(), UpdateLead)
    .patch(isAuthenticatedUser, isAdmin, NewRemark)

// router.get("/filter/leads", isAuthenticatedUser, FilterLeads)
// router.get("/leads/search", isAuthenticatedUser, FuzzySearchLeads)

export default router