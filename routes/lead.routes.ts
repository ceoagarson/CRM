import express from "express";
import { BulkLeadUpdateFromExcel, ConvertCustomer, CreateLead, DeleteLead, FuzzySearchCustomers, FuzzySearchLeads, GetCustomers, GetLeads, NewRemark, UpdateLead, GetUpdatableLeadFields, UpdateLeadFields, BackUpAllLieds, getAllReferParties, CreateReferParty, UpdateReferParty, DeleteReferParty, ReferLead, UpdateReferLead } from "../controllers/lead.controller";
import { isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";
import { upload } from "./user.routes";

const router = express.Router()

router.route("/leads")
    .get(isAuthenticatedUser, GetLeads)
    .post(isAuthenticatedUser, upload.single('visiting_card'), CreateLead)
router.route("/customers").get(isAuthenticatedUser, GetCustomers)
    .post(isAuthenticatedUser, upload.single('visiting_card'), CreateLead)
router.route("/leads/:id")
    .put(isAuthenticatedUser, upload.single('visiting_card'), UpdateLead)
    .patch(isAuthenticatedUser, ConvertCustomer)
    .delete(isAuthenticatedUser, isAdmin, DeleteLead)
router.route("/update/leads/bulk").put(isAuthenticatedUser, upload.single('file'), BulkLeadUpdateFromExcel)
router.route("/remarks/leads/:id").patch(isAuthenticatedUser, NewRemark)
router.route("/search/leads").get(isAuthenticatedUser, FuzzySearchLeads)
router.route("/search/customers").get(isAuthenticatedUser, FuzzySearchCustomers)
router.route("/fields/lead/update").put(isAuthenticatedUser, isAdmin, UpdateLeadFields)
router.route("/lead-updatable-fields").get(isAuthenticatedUser, isAdmin, GetUpdatableLeadFields)
router.route("/backup/leads").get(isAuthenticatedUser, isAdmin, BackUpAllLieds)
router.route("/refers/leads/:id").patch(isAuthenticatedUser, ReferLead)
router.route("/refers/leads/:id").put(isAuthenticatedUser, UpdateReferLead)
router.route("/refers").get(isAuthenticatedUser, getAllReferParties)
router.route("/refers").post(isAuthenticatedUser, CreateReferParty)
router.route("/refers/:id").post(isAuthenticatedUser, UpdateReferParty)
router.route("/refers/:id").delete(isAuthenticatedUser, DeleteReferParty)
export default router