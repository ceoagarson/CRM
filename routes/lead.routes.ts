import express from "express";
import { CreateLead, DeleteLead, GetLeads, NewRemark, PreserveLead, PreserveLeadsInBulk, UpdateLead, UploadLeadFromExcel } from "../controllers/lead.controller";
import { isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";
import { upload } from "./user.routes";

const router = express.Router()

router.route("/leads")
    .get(isAuthenticatedUser, GetLeads)
    .post(isAuthenticatedUser, CreateLead)
router.route("/leads/:id")
    .put(isAuthenticatedUser, UpdateLead)
    .patch(isAuthenticatedUser, PreserveLead)
    .delete(isAuthenticatedUser, isAdmin, DeleteLead)
router.route("/preserve/bulk").put(isAuthenticatedUser, PreserveLeadsInBulk)
router.route("/remarks/leads/:id").patch(isAuthenticatedUser, NewRemark)
router.post("/upload/excel", upload.single("leads"), isAuthenticatedUser, UploadLeadFromExcel)


export default router