import express from "express";
import multer from "multer";
import { CreateAccount, DeleteAccount, FilterAccounts, FuzzySearchAccounts, GetAccount, GetAccounts, ToogleAccountStatus, UpdateAccount } from "../controllers/account.controller";
import {  isAuthenticatedUser, isCrmAdmin } from "../middlewares/auth.middleware";

const router = express.Router()
const upload = multer({ storage: multer.diskStorage({ destination: "/tmp/" }) })

router.route("/accounts")
    .get(isAuthenticatedUser, GetAccounts)
    .post(isAuthenticatedUser, upload.single("dp"), CreateAccount)
router.route("/accounts/:id")
    .get(isAuthenticatedUser, GetAccount)
    .put(isAuthenticatedUser, upload.single("dp"), UpdateAccount)
    .patch(isAuthenticatedUser, ToogleAccountStatus)
    .delete(isAuthenticatedUser,isCrmAdmin,DeleteAccount)
router.get("/accounts/filter", isAuthenticatedUser, FilterAccounts)
router.get("/accounts/search", isAuthenticatedUser, FuzzySearchAccounts)

export default router