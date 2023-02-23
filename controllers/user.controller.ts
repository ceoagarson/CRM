import { NextFunction, Request, Response } from 'express';
import isEmail from "validator/lib/isEmail";
import { uploadFileToCloudinary } from '../utils/uploadFile.util';
import { catchAsyncError } from '../middlewares/catchAsyncError.middleware.ts';
import { deleteToken, sendUserToken } from '../middlewares/auth.middleware';
import { User } from '../models/user.model';
import { Asset } from '../types/asset.type';
import isMongoId from "validator/lib/isMongoId";
import { destroyFile } from "../utils/destroyFile.util";
import { TUserBody } from '../types/user.type';
import { sendEmail } from '../utils/sendEmail.util';
import { Organization } from '../models/organization.model';
import { IOrganization } from '../types/organization.type';


// Create Owner account
export const SignUp = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        let { username, email, password, organization_name, organization_email, organization_mobile, mobile } = req.body as TUserBody & IOrganization
        // validations
        if (!username || !email || !password || !organization_name || !organization_email || !organization_mobile || !mobile)
            return res.status(400).json({ message: "fill all the required fields" });
        if (!isEmail(email))
            return res.status(400).json({ message: "please provide valid email" });
        if (!isEmail(organization_email))
            return res.status(400).json({ message: "please provide valid organization email" });
        if (await User.findOne({ username: username.toLowerCase().trim() }))
            return res.status(403).json({ message: `${username} already exists` });
        if (await User.findOne({ email: email.toLowerCase().trim() }))
            return res.status(403).json({ message: `${email} already exists` });
        if (await User.findOne({ mobile: String(mobile).toLowerCase().trim() }))
            return res.status(403).json({ message: `${mobile} already exists` });

        if (await Organization.findOne({ organization_mobile: String(organization_mobile).toLowerCase().trim() }))
            return res.status(403).json({ message: `${organization_mobile} already exists` });
        if (await Organization.findOne({ organization_name: organization_name.toLowerCase().trim() }))
            return res.status(403).json({ message: `${organization_name} already exists` });
        if (await Organization.findOne({ organization_email: organization_email.toLowerCase().trim() }))
            return res.status(403).json({ message: `${organization_email} already exists` });

        let dp: Asset = {
            public_id: "",
            url: "",
            size: 0,
            format: ""
        }
        if (req.file) {
            const allowedFiles = ["image/png", "image/jpeg", "image/gif"];
            const storageLocation = `crm/owners/dp`;
            if (!allowedFiles.includes(req.file.mimetype))
                return res.status(400).json({ message: `${req.file.originalname} is not valid, only ${allowedFiles} types are allowed to upload` })
            if (req.file.size > 200 * 1024)
                return res.status(400).json({ message: `${req.file.originalname} is too large limit is :200Kb` })
            const doc = await uploadFileToCloudinary(req.file.path, storageLocation)
            if (doc)
                dp = doc
            else {
                return res.status(500).json({ message: "file uploading error" })
            }
        }
        let organization = new Organization({
            organization_name,
            organization_email,
            organization_mobile
        })
        let owner = new User({
            username,
            password,
            email,
            mobile,
            roles: ["owner", "admin"],
            dp
        })
        owner.organization = organization._id
        owner.created_by = owner._id
        owner.updated_by = owner._id
        organization.owners = [owner._id]
        organization.created_by = owner._id
        organization.updated_by = owner._id
        sendUserToken(res, owner.getAccessToken())
        await owner.save()
        organization = await organization.save()
        owner = await User.findById(owner._id).populate('organization').populate("created_by").populate("updated_by") || owner
        res.status(201).json({ owner, organization })
    })


// create normal user 
export const NewUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user)
        return res.status(403).json({ message: "please login to access this resource" })
    let { username, email, mobile, password } = req.body as TUserBody;
    // validations
    if (!username || !email || !password || !mobile)
        return res.status(400).json({ message: "fill all the required fields" });
    if (!isEmail(email))
        return res.status(400).json({ message: "please provide valid email" });


    if (await User.findOne({ username: username.toLowerCase().trim() }))
        return res.status(403).json({ message: `${username} already exists` });

    if (await User.findOne({ email: email.toLowerCase().trim() }))
        return res.status(403).json({ message: `${email} already exists` });
    if (await User.findOne({ mobile: String(mobile).toLowerCase().trim() }))
        return res.status(403).json({ message: `${mobile} already exists` });

    let dp: Asset = {
        public_id: "",
        url: "",
        size: 0,
        format: ""
    }

    if (req.file) {
        const allowedFiles = ["image/png", "image/jpeg", "image/gif"];
        const storageLocation = `crm/users/dp`;
        if (!allowedFiles.includes(req.file.mimetype))
            return res.status(400).json({ message: `${req.file.originalname} is not valid, only ${allowedFiles} types are allowed to upload` })
        if (req.file.size > 200 * 1024)
            return res.status(400).json({ message: `${req.file.originalname} is too large limit is :200Kb` })
        const doc = await uploadFileToCloudinary(req.file.path, storageLocation)
        if (doc)
            dp = doc
        else {
            return res.status(500).json({ message: "file uploading error" })
        }
    }
    const user = await new User({
        username,
        email,
        password,
        mobile,
        dp,
        organization: req.user?.organization._id,
        created_by: req.user._id,
        updated_by: req.user._id,
        roles: ["user"]
    }).save()
    res.status(201).json(user)
})

// update user only admin can do
export const UpdateUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(400).json({ message: "user id not valid" })
    let user = await User.findOne({ _id: id, organization: req.user?.organization });
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    let { email, username, mobile } = req.body as TUserBody;
    if (!username || !email || !mobile)
        return res.status(400).json({ message: "fill all the required fields" });
    //check username
    if (username !== user.username) {
        if (await User.findOne({ username: String(username).toLowerCase().trim() }))
            return res.status(403).json({ message: `${username} already exists` });
    }
    // check mobile
    if (mobile != user.mobile) {
        if (await User.findOne({ mobile: String(mobile).toLowerCase().trim() }))
            return res.status(403).json({ message: `${mobile} already exists` });
    }
    //check email
    if (email !== user.email) {
        if (await User.findOne({ email: String(email).toLowerCase().trim() }))
            return res.status(403).json({ message: `${email} already exists` });
    }
    // check first owner to update himself
    if ((String(user.created_by) === String(user._id)))
        if ((String(user.created_by) !== String(req.user?._id)))
            return res.status(403).json({ message: "not allowed contact crm administrator" })

    //handle dp
    let dp = user.dp;
    if (req.file) {
        const allowedFiles = ["image/png", "image/jpeg", "image/gif"];
        const storageLocation = `crm/users/dp`;
        if (!allowedFiles.includes(req.file.mimetype))
            return res.status(400).json({ message: `${req.file.originalname} is not valid, only ${allowedFiles} types are allowed to upload` })
        if (req.file.size > 200 * 1024)
            return res.status(400).json({ message: `${req.file.originalname} is too large limit is :200Kb` })

        const doc = await uploadFileToCloudinary(req.file.path, storageLocation)
        if (doc) {
            await destroyFile(user.dp?.public_id || "")
            dp = doc
        }
        else {
            return res.status(500).json({ message: "file uploading error" })
        }
    }
    if (email !== user.email) {
        await User.findByIdAndUpdate(user.id, {
            email, username,
            dp,
            email_verified: false
        })
            .then(() => { return res.status(200).json({ message: "user updated" }) })
    }
    await User.findByIdAndUpdate(user.id, {
        email,
        username,
        mobile,
        dp,
        updated_by: req.user?._id,
        updated_at: new Date(Date.now()),
    }).then(() => res.status(200).json({ message: "user updated" }))
})

// get profile 
export const GetProfile = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const profile = await User.findById(req.user?._id).populate('organization').populate("created_by").populate("updated_by")
    if (profile)
        return res.status(200).json(profile)
    res.status(403).json({ message: "please login to access the profile" })
})

// get user only admin can do
export const GetUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    if (!isMongoId(req.params.id))
        return res.status(400).json({ message: "user id not valid" })
    const user = await User.findById(req.params.id).populate('organization').populate("created_by").populate("updated_by")
    if (!user)
        return res.status(404).json({ message: "user not found" })
    res.status(200).json(user)
})

// get all users only admin can do
export const GetUsers =
    catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const users = await User.find({ organization: req.user?.organization }).populate('organization').populate("created_by").populate("updated_by")
        res.status(200).json(users)
    })
// login 
export const Login = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body as TUserBody & { username: string };
    if (!username)
        return res.status(400).json({ message: "please enter username or email" })
    if (!password)
        return res.status(400).json({ message: "please enter password" })

    let user = await User.findOne({
        username: String(username).toLowerCase().trim(),
    }).select("+password").populate("organization").populate("created_by").populate("updated_by")
    if (!user) {
        user = await User.findOne({
            email: String(username).toLowerCase().trim(),
        }).select("+password").populate("organization").populate("created_by").populate("updated_by")
        if (user)
            if (!user.email_verified)
                return res.status(403).json({ message: "please verify email id before login" })
    }
    if (!user)
        return res.status(403).json({ message: "Invalid username or password" })
    if (!user.is_active)
        return res.status(401).json({ message: "you are blocked, contact admin" })
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched)
        return res.status(403).json({ message: "Invalid username or password" })
    sendUserToken(res, user.getAccessToken())
    user.last_login = new Date(Date.now())
    await user.save()
    res.status(200).json(user)
})

// logout
export const Logout = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.accessToken)
        return res.status(200).json({ message: "already logged out" })
    await deleteToken(res);
    res.status(200).json({ message: "logged out" })
})
//update profile 
export const UpdateProfile = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let user = await User.findOne({ _id: req.user?._id, organization: req.user?.organization });
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    let { email, mobile } = req.body as TUserBody;
    if (!email || !mobile) {
        return res.status(400).json({ message: "please fill required fields" })
    }

    if (mobile != user.mobile) {
        if (await User.findOne({ mobile: String(mobile).toLowerCase().trim() }))
            return res.status(403).json({ message: `${mobile} already exists` });
    }
    //check email
    if (email !== user.email) {
        if (await User.findOne({ email: String(email).toLowerCase().trim() }))
            return res.status(403).json({ message: `${email} already exists` });
    }

    //handle dp
    let dp = user.dp;
    if (req.file) {
        const allowedFiles = ["image/png", "image/jpeg", "image/gif"];
        const storageLocation = `crm/users/dp`;
        if (!allowedFiles.includes(req.file.mimetype))
            return res.status(400).json({ message: `${req.file.originalname} is not valid, only ${allowedFiles} types are allowed to upload` })
        if (req.file.size > 200 * 1024)
            return res.status(400).json({ message: `${req.file.originalname} is too large limit is :200Kb` })

        const doc = await uploadFileToCloudinary(req.file.path, storageLocation)
        if (doc) {
            await destroyFile(user.dp?.public_id || "")
            dp = doc
        }
        else {
            return res.status(500).json({ message: "file uploading error" })
        }
    }
    if (email != user.email) {
        await User.findByIdAndUpdate(user.id, {
            email,
            dp,
            mobile,
            email_verified: false,
            updated_by: user.id
        })
            .then(() => { return res.status(200).json({ message: "user updated" }) })
    }
    await User.findByIdAndUpdate(user.id, {
        email,
        mobile,
        dp,
        updated_by: user._id
    })
        .then(() => res.status(200).json({ message: "profile updated" }))
})
//update password
export const updatePassword = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword, confirmPassword } = req.body as TUserBody & { oldPassword: string, newPassword: string, confirmPassword: string };
    if (!oldPassword || !newPassword || !confirmPassword)
        return res.status(400).json({ message: "please fill required fields" })
    if (confirmPassword == oldPassword)
        return res.status(403).json({ message: "new password should not be same to the old password" })
    if (newPassword !== confirmPassword)
        return res.status(403).json({ message: "new password and confirm password not matched" })
    let user = await User.findOne({ _id: req.user?._id, organization: req.user?.organization }).select("+password")
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    const isPasswordMatched = await user.comparePassword(oldPassword);
    if (!isPasswordMatched)
        return res.status(401).json({ message: "Old password is incorrect" })
    user.password = newPassword;
    user.updated_by = user._id
    await user.save();
    res.status(200).json({ message: "password updated" });
});
// make admin
export const MakeAdmin = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(400).json({ message: "user id not valid" })
    let user = await User.findOne({ _id: id, organization: req.user?.organization })
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    if (user.roles?.includes("admin"))
        return res.status(404).json({ message: "already a admin" })
    user.roles?.push("admin")
    if (req.user)
        user.updated_by = req.user._id
    await user.save();
    res.status(200).json({ message: "admin role provided successfully", user });
})
// make owner
export const MakeOwner = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(400).json({ message: "user id not valid" })
    let user = await User.findOne({ _id: id, organization: req.user?.organization })
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    if (String(user.created_by._id) === String(user._id))
        return res.status(403).json({ message: "not allowed contact crm administrator" })

    if (user.roles?.includes("owner"))
        return res.status(404).json({ message: "already a owner" })
    let organization = await Organization.findById(user.organization._id)
    if (!organization)
        return res.status(404).json({ message: "you are not a member of any organization" })
    user.roles?.push("owner")
    if (req.user)
        user.updated_by = req.user._id
    await user.save();
    organization.owners.push(user._id)
    organization.updated_at = new Date(Date.now())
    if (req.user)
        organization.updated_by = req.user?._id
    await organization.save();
    res.status(200).json({ message: "new owner created successfully" });
})

// block user
export const BlockUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    //update role of user
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(400).json({ message: "user id not valid" })
    let user = await User.findOne({ _id: id, organization: req.user?.organization })
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    if (!user.is_active)
        return res.status(404).json({ message: "user already blocked" })

    if (String(user.created_by._id) === String(user._id))
        return res.status(403).json({ message: "not allowed contact crm administrator" })
    if (String(user._id) === String(req.user?._id))
        return res.status(403).json({ message: "not allowed this operation here, because you may block yourself" })
    user.is_active = false
    if (req.user)
        user.updated_by = req.user._id
    await user.save();
    res.status(200).json({ message: "user blocked successfully" });
})
// unblock user
export const UnBlockUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    //update role of user
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(400).json({ message: "user id not valid" })
    let user = await User.findOne({ _id: id, organization: req.user?.organization })
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    if (user.is_active)
        return res.status(404).json({ message: "user is already active" })
    user.is_active = true
    if (req.user)
        user.updated_by = req.user._id
    await user.save();
    res.status(200).json({ message: "user unblocked successfully" });
})

// revoke permissions
export const RevokePermissions = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    //update role of user
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(400).json({ message: "user id not valid" })
    let user = await User.findOne({ _id: id, organization: req.user?.organization })
    if (!user) {
        return res.status(404).json({ message: "user not found" })
    }
    if (String(user.created_by._id) === String(user._id))
        return res.status(403).json({ message: "not allowed contact crm administrator" })
    if (String(user._id) === String(req.user?._id))
        return res.status(403).json({ message: "not allowed this operation here, because you may harm yourself" })
    await User.findByIdAndUpdate(id, {
        roles: ["user"],
        updated_by: req.user?._id
    })
    let organization = await Organization.findById(user.organization._id)
    if (!organization)
        return res.status(404).json({ message: "you are not a member of any organization" })
    organization.owners = organization.owners.filter((owner => {
        return String(owner) !== String(user?._id)
    }))
    organization.updated_at = new Date(Date.now())
    if (req.user)
        organization.updated_by = req.user?._id
    await organization.save();
    res.status(200).json({ message: "user permissions revoked successfully" });
})

// sending password reset mail controller
export const SendPasswordResetMail = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    if (!email) return res.status(400).json({ message: "please provide email id" })
    const userEmail = String(email).toLowerCase().trim();
    if (!isEmail(userEmail))
        return res.status(400).json({ message: "provide a valid email" })
    const user = await User.findOne({ email: userEmail });
    if (!user)
        return res.status(404).json({ message: "you have no account with this email id" })
    const resetToken = await user.getResetPasswordToken();
    await user.save();
    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"
    )}/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n valid for 15 minutes only \n\n\n\nIf you have not requested this email then, please ignore it.`;
    const options = {
        to: user.email,
        subject: `Crm Password Recovery`,
        message: message,
    };
    let response = await sendEmail(options);
    if (response) {
        return res.status(200).json({
            message: `Email sent to ${user.email} successfully`,
        })
    }
    else {
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;
        await user.save();
        return res.status(500).json({ message: "email could not be sent, something went wrong" })
    }
});
// reset password controller
export const ResetPassword = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let resetPasswordToken = req.params.token;
    const { newPassword, confirmPassword } = req.body;
    if (!newPassword || !confirmPassword)
        return res.status(400).json({ message: "Please fill all required fields " })
    if (newPassword !== confirmPassword)
        return res.status(400).json({ message: "passwords do not matched" })
    let user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user)
        return res.status(403).json({ message: "Reset Password Token is invalid or has been expired" })

    user.password = req.body.newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();
    res.status(200).json({ message: "password updated" });
});
// send verification mail controller
export const SendVerifyEmail = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    if (!email)
        return res.status(400).json({ message: "please provide your email id" })
    const userEmail = String(email).toLowerCase().trim();
    if (!isEmail(userEmail))
        return res.status(400).json({ message: "provide a valid email" })
    const user = await User.findOne({ email: userEmail });
    if (!user)
        return res.status(404).json({ message: "you have no account with this email id" })
    const verifyToken = await user.getEmailVerifyToken();
    await user.save();
    const emailVerficationUrl = `${req.protocol}://${req.get(
        "host"
    )}/email/verify/${verifyToken}`;
    const message = `Your email verification link is :- \n\n ${emailVerficationUrl} \n\n valid for 15 minutes only \n\nIf you have not requested this email then, please ignore it.`;
    const options = {
        to: user.email,
        subject: `CRM Email Verification`,
        message,
    };

    let response = await sendEmail(options);
    if (response) {
        return res.status(200).json({
            message: `Email sent to ${user.email} successfully`,
        })
    }
    else {
        user.emailVerifyToken = null;
        user.emailVerifyExpire = null;
        await user.save();
        return res.status(500).json({ message: "email could not be sent, something went wrong" })
    }
});
// verify mail controller
export const VerifyEmail = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const emailVerifyToken = req.params.token;
    let user = await User.findOne({
        emailVerifyToken,
        emailVerifyExpire: { $gt: Date.now() },
    });
    if (!user)
        return res.status(403).json({ message: "Email verification Link  is invalid or has been expired" })
    user.email_verified = true;
    user.emailVerifyToken = null;
    user.emailVerifyExpire = null;
    await user.save();
    res.status(200).json({
        message: `congrats ${user.email} verification successful`
    });
});

