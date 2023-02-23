import express from "express";
import multer from "multer";
import { OrganizationProfile, SendVerifyOrganizationEmail, UpdateOrganizationProfile, VerifyOrganizationEmail } from "../controllers/organization.controller";
import { isAdmin, isAuthenticatedUser, isOwner } from "../middlewares/auth.middleware";

const router = express.Router()
const upload = multer({ storage: multer.diskStorage({ destination: "/tmp/" }) })

router.route("/organization")
    .get(isAuthenticatedUser, isAdmin, isOwner, OrganizationProfile)
    .put(isAuthenticatedUser, isAdmin,isOwner,upload.single("organization_dp"), UpdateOrganizationProfile)
router.post("/organization/email/verify",isAdmin,isOwner, isAuthenticatedUser, SendVerifyOrganizationEmail)
router.patch("/organization/email/verify/:token", isAuthenticatedUser, VerifyOrganizationEmail)

export default router;