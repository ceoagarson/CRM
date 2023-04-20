import express from "express";
import { isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";
import { CreateMachine,  GetMachines, UpdateMachine } from "../controllers/machine.controller";

const router = express.Router()

router.route("/machines")
    .get(isAuthenticatedUser, isAdmin, GetMachines)
    .post(isAuthenticatedUser, isAdmin, CreateMachine)
router.route("/machines/:id")
    .put(isAuthenticatedUser, isAdmin, UpdateMachine)

export default router