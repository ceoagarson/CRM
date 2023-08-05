import express from "express";
import { BulkLeadUpdateFromExcel, CreateLead, DeleteLead,  GetLeads, NewRemark, UpdateLead } from "../controllers/lead.controller";
import { isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";
import { upload } from "./user.routes";

const router = express.Router()

router.route("/leads")
    .get(isAuthenticatedUser, GetLeads)
    .post(isAuthenticatedUser, upload.single('visiting_card'), CreateLead)
router.route("/leads/:id")
    .put(isAuthenticatedUser, upload.single('visiting_card'), UpdateLead)
    .delete(isAuthenticatedUser, isAdmin, DeleteLead)
router.route("/update/leads/bulk").put(isAuthenticatedUser, upload.single('file'), BulkLeadUpdateFromExcel)
router.route("/remarks/leads/:id").patch(isAuthenticatedUser, NewRemark)


export default router