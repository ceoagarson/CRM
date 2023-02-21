import { NextFunction, Request, Response } from 'express';
import isEmail from 'validator/lib/isEmail';
import { catchAsyncError } from '../middlewares/catchAsyncError.middleware.ts';
import { Organization } from '../models/organization.model';
import { User } from '../models/user.model';
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
        const onwer_id = req.user?._id
        const user = await User.findById(onwer_id)
        if (!user)
            return res.status(403).json({ message: "please login to access this resource" })
        const id = user.organization._id
        let organization = await Organization.findById(id)
        if (!organization)
            return res.status(404).json({ message: "this organization not found" })
        let { organization_name, organization_email, organization_mobile, address, country } = req.body as TOrganizationBody;
        if (!organization_name || !organization_email || !organization_mobile)
            return res.status(400).json({ message: "please fill all required fields" })
        if (organization_name !== organization.organization_name) {
            if (await Organization.findOne({ organization_name: organization_name.toLowerCase().trim() }))
                return res.status(403).json({ message: `${organization_name} already exists` });
        }
        if (organization_email !== organization.organization_email) {
            if (await Organization.findOne({ organization_email: organization_email.toLowerCase().trim() }))
                return res.status(403).json({ message: `${organization_email} already exists` });
        }
        if (organization_mobile !== organization.organization_mobile) {
            if (await Organization.findOne({ organization_mobile: String(organization_mobile).toLowerCase().trim() }))
                return res.status(403).json({ message: `${organization_mobile} already exists` });
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
            organization_name,
            organization_email,
            organization_mobile,
            address, country,
            organization_dp,
            updated_at: new Date(Date.now()),
            updated_by: user._id
        }).then(() =>
            res.status(200).json({ message: "organization profile updated" })
        )
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
            organization.emailVerifyToken = null;
            organization.emailVerifyExpire = null;
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
        organization.emailVerifyToken = null;
        organization.emailVerifyExpire = null;
        await organization.save();
        res.status(200).json({
            msg: `congrats ${organization.organization_email} verification successful`
        });
    })

