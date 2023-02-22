import express from "express";
import { ConvertResource } from "../controllers/conversion.controller";
import { isAuthenticatedUser } from "../middlewares/auth.middleware";

const router = express.Router()

router.post("/convert/:id", isAuthenticatedUser, ConvertResource)

export default router