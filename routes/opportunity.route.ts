import express from "express";
import multer from "multer";
import { CreateOpportunity, DeleteOpportunity, FilterOpportunities, FuzzySearchOpportunities, GetOpportunity, GetOpportunities, ToogleOpportunityStatus, UpdateOpportunity } from "../controllers/opportunity.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const router = express.Router()
const upload = multer({ storage: multer.diskStorage({ destination: "/tmp/" }) })

router.route("/opportunities")
    .get(isAuthenticatedUser, GetOpportunities)
    .post(isAuthenticatedUser, upload.single("dp"), CreateOpportunity)
router.route("/opportunities/:id")
    .get(isAuthenticatedUser, GetOpportunity)
    .put(isAuthenticatedUser, upload.single("dp"), UpdateOpportunity)
    .patch(isAuthenticatedUser, ToogleOpportunityStatus)
    .delete(isAuthenticatedUser, DeleteOpportunity)
router.get("/opportunities/filter", isAuthenticatedUser, FilterOpportunities)
router.get("/opportunities/search", isAuthenticatedUser, FuzzySearchOpportunities)

export default router