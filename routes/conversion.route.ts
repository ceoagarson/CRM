import express from "express";
import { ConvertResource } from "../controllers/conversion.controller";
import { isAdmin, isAuthenticatedUser} from "../middlewares/auth.middleware";

const router = express.Router()

router.post("/convert/:id", isAuthenticatedUser, isAdmin, ConvertResource)

export default router