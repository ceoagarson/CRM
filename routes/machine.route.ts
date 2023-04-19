import express from "express";
import { isAdmin, isAuthenticatedUser } from "../middlewares/auth.middleware";
import { CreateMachine, GetMachine, GetMachines, UpdateMachine } from "../controllers/machine.controller";

const router = express.Router()

router.route("/machines")
    .get(isAuthenticatedUser, isAdmin, GetMachines)
    .post(isAuthenticatedUser, isAdmin, CreateMachine)
router.route("/machines/:id")
    .get(isAuthenticatedUser, isAdmin, GetMachine)
    .put(isAuthenticatedUser, isAdmin, UpdateMachine)

export default router