import express from "express";
import multer from "multer";
import {  OrganizationProfile, SendVerifyOrganizationEmail, UpdateOrganizationProfile, VerifyOrganizationEmail } from "../controllers/organization.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const router = express.Router()
const upload = multer({ storage: multer.diskStorage({ destination: "/tmp/" }) })

router.route("/organization")
    .get(isAuthenticatedUser, OrganizationProfile)
    .put(isAuthenticatedUser, upload.single("organization_dp"), UpdateOrganizationProfile)
router.post("/organization/email/verify", isAuthenticatedUser, SendVerifyOrganizationEmail)
router.patch("/organization/email/verify/:token", isAuthenticatedUser, VerifyOrganizationEmail)

export default router;