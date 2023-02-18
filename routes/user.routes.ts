import express from "express";
import multer from "multer";
import { SignUp, DeleteUser, GetProfile, GetUser, GetUsers, Login, Logout, NewUser, ResetPassword, SendPasswordResetMail, SendVerifyEmail, updatePassword, UpdateProfile, UpdateUser, MakeOwner, VerifyEmail, MakeAdmin, BlockUser, UnBlockUser, RevokePermissions } from "../controllers/user.controller";
import { isAdmin, isAuthenticatedUser, isOwner } from "../middlewares/auth.middleware";

const router = express.Router()
const upload = multer({ storage: multer.diskStorage({ destination: "/tmp/" }) })

router.post("/signup", upload.single("dp"), SignUp)
router.route("/users")
    .get(isAuthenticatedUser, GetUsers)
    .post(isAuthenticatedUser, isAdmin, upload.single("dp"), NewUser)
router.route("/users/:id")
    .get(isAuthenticatedUser, GetUser)
    .put(isAuthenticatedUser, isAdmin, upload.single("dp"), UpdateUser)
    .delete(isAuthenticatedUser, isAdmin, isOwner, DeleteUser)
    .patch(isAuthenticatedUser, isAdmin, isOwner, MakeAdmin)

router.patch("/owner/update/role/admin/:id", isAuthenticatedUser, isAdmin, isOwner, MakeOwner)
router.patch("/owner/block/user/:id", isAuthenticatedUser, isAdmin, isOwner, BlockUser)
router.patch("/owner/unblock/user/:id", isAuthenticatedUser, isAdmin, isOwner, UnBlockUser)
router.patch("/owner/revoke/user/:id", isAuthenticatedUser, isAdmin, isOwner, RevokePermissions)

router.post("/login", Login)
router.post("/logout", Logout)
router.route("/profile")
    .get(isAuthenticatedUser, GetProfile)
    .put(isAuthenticatedUser, upload.single("dp"), UpdateProfile)
    .patch(isAuthenticatedUser, updatePassword)

router.post("/email/verify", SendVerifyEmail)
router.patch("/email/verify/:token", VerifyEmail)
router.post("/password/reset", SendPasswordResetMail)
router.patch("/password/reset/:token", ResetPassword)


export default router;