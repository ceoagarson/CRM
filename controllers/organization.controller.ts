import { NextFunction, Request, Response } from 'express';
import isEmail from 'validator/lib/isEmail';
import isMongoId from 'validator/lib/isMongoId';
import { catchAsyncError } from '../middlewares/catchAsyncError.middleware.ts';
import { Organization } from '../models/organization.model';
import { User } from '../models/user.model';
import { Asset } from '../types/asset.type';
import { TOrganizationBody } from '../types/organization.type';
import { destroyFile } from '../utils/destroyFile.util';
import { sendEmail } from '../utils/sendEmail.util';
import { uploadFileToCloudinary } from '../utils/uploadFile.util';

// Organization Profile
export const OrganizationProfile = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const onwerid = req.user?._id
        const user = await User.findById(onwerid)
        if (!user)
            return res.status(403).json({ message: "please login to access this resource" })
        const profile = await Organization.findById(user.organization._id)
        if (!profile)
            res.status(404).json({ message: "this organization not found" })
        return res.status(200).json(profile)
    })
// update organization profile
export const UpdateOrganizationProfile = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const onwerid = req.user?._id
        const user = await User.findById(onwerid)
        if (!user)
            return res.status(403).json({ message: "please login to access this resource" })
        const id = user.organization._id
        let organization = await Organization.findById(id)
        if (!organization)
            return res.status(404).json({ message: "this organization not found" })
        let { organization_name, organization_email } = req.body as TOrganizationBody;
        // validations
        if (organization_email) {
            return res.status(403).json({ message: "email updation not allowed here" })
        }
        if (organization_name !== organization.organization_name) {
            if (await Organization.findOne({ organization_name: organization_name.toLowerCase().trim() }))
                return res.status(403).json({ message: `${organization_name} already exists` });
        }
        let organization_dp = organization.organization_dp
        if (req.file) {
            const allowedFiles = ["image/png", "image/jpeg", "image/gif"];
            const storageLocation = `crm/organizations/dp`;
            if (!allowedFiles.includes(req.file.mimetype))
                return res.status(400).json({ message: `${req.file.originalname} is not valid, only ${allowedFiles} types are allowed to upload` })
            if (req.file.size > 200 * 1024)
                return res.status(400).json({ message: `${req.file.originalname} is too large limit is :200Kb` })
            const doc = await uploadFileToCloudinary(req.file.path, storageLocation)
            if (doc) {
                await destroyFile(organization.organization_dp?.public_id || "")
                organization_dp = doc
            }
            else {
                return res.status(500).json({ message: "file uploading error" })
            }
        }
        await Organization.findByIdAndUpdate(organization._id, {
            ...req.body,
            organization_dp
        }).then(() =>
            res.status(200).json({ message: "organization profile updated" })
        )
    })

// Update Organization Email
export const UpdateEmailOrganization = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const onwerid = req.user?._id
        const user = await User.findById(onwerid)
        if (!user)
            return res.status(403).json({ message: "please login to access this resource" })
        let organization = await Organization.findById(user.organization._id)
        if (!organization)
            return res.status(404).json({ message: "this organization not found" })
        let { previousEmail, newEmail } = req.body as TOrganizationBody & { previousEmail: string, newEmail: string }
        if (!previousEmail || !newEmail)
            return res.status(404).json({ message: "please fil all the required fields" })
        if (!isEmail(newEmail))
            return res.status(400).json({ message: "please provide valid email" })
        if (previousEmail !== organization.organization_email)
            return res.status(403).json({ message: "previous email is incorrect" })
        if (previousEmail === newEmail)
            return res.status(403).json({ message: "new email should be different from previous email " })
        if (newEmail !== previousEmail) {
            if (await Organization.findOne({ organization_email: newEmail.toLowerCase().trim() }))
                return res.status(403).json({ message: `${newEmail} already exists` });
        }
        await Organization.findByIdAndUpdate(organization._id, { organization_email: newEmail, email_verified: false }).then(() => res.status(200).json({ message: "email updated" }))
    })
//Verify Organization Email
export const SendVerifyOrganizationEmail = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const onwerid = req.user?._id
        const user = await User.findById(onwerid)
        if (!user)
            return res.status(403).json({ message: "please login to access this resource" })
        let organization = await Organization.findById(user.organization._id)
        if (!organization)
            return res.status(404).json({ message: "this organization not found" })
        const verifyToken = await organization.getEmailVerifyToken();
        await organization.save();
        const emailVerficationUrl = `${req.protocol}://${req.get(
            "host"
        )}/email/verify/${verifyToken}`;
        const message = `Your email verification link is :- \n\n ${emailVerficationUrl} \n\nImportant !link will expire in 15 miutes \n\nIf you have not requested this email then, please ignore it.`;
        const options = {
            to: organization.organization_email,
            subject: `CRM Organization Admin  Email Verification`,
            message,
        };
        try {
            sendEmail(options);
            res.status(200).json({
                message: `Email sent to ${organization.organization_email} successfully`,
            });
        } catch (err) {
            organization.emailVerifyToken = undefined;
            organization.emailVerifyExpire = undefined;
            await organization.save();
            return res.status(500).json({ message: "email could not be sent, something went wrong" })
        }
    })
export const VerifyOrganizationEmail = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const emailVerifyToken = req.params.token;
        if (!emailVerifyToken)
            return res.status(403).json({ message: "email verify token is required" })
        let organization = await Organization.findOne({
            emailVerifyToken,
            emailVerifyExpire: { $gt: Date.now() },
        });
        if (!organization)
            return res.status(403).json({ message: "Email verification Link  is invalid or has been expired" })
        organization.email_verified = true;
        organization.emailVerifyToken = undefined;
        organization.emailVerifyExpire = undefined;
        await organization.save();
        res.status(200).json({
            msg: `congrats ${organization.organization_email} verification successful`
        });
    })

