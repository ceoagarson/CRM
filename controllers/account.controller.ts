import { NextFunction, Request, Response } from "express"
import isEmail from "validator/lib/isEmail"
import isMongoId from "validator/lib/isMongoId"
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.ts"
import Account from "../models/account.model"
import { User } from "../models/user.model"
import { TAccountBody } from "../types/account.type"
import { Asset } from "../types/asset.type"
import { uploadFileToCloudinary } from "../utils/uploadFile.util"

// create account any one can do in the organization
export const CreateAccount = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, mobile, email, description } = req.body as TAccountBody
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(404).json({ message: "please login to access this resource" })
    // validations
    if (!name || !email || !mobile || !description)
        return res.status(400).json({ message: "fill all the required fields" });
    if (!isEmail(email))
        return res.status(403).json({ message: "please provide valid email" });
    if ((String(mobile).trim().length !== 10))
        return res.status(403).json({ message: "please provide valid mobile number" });
    if (await Account.findOne({ name: name.toLowerCase().trim() }))
        return res.status(403).json({ message: `${name} already exists` });

    if (await Account.findOne({ email: email.toLowerCase().trim() }))
        return res.status(403).json({ message: `${email} already exists` });
    if (await Account.findOne({ mobile: String(mobile).trim() }))
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
    const account = await new Account({
        ...req.body,
        dp,
        description: description,
        organization: user.organization._id,
        account_owner: user._id,
        created_by: user._id,
        updated_by: user._id,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        status_changed_by: user._id
    }).save()
    res.status(200).json({ account })
})
// update account only admin can do
export const UpdateAccount = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { name, mobile, email, description } = req.body as TAccountBody

    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(403).json({ message: "please login to access this resource" })
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "account id not valid" })
    let account = await Account.findById(id);
    if (!account) {
        return res.status(404).json({ message: "account not found" })
    }
    // validations
    if (!name || !email || !mobile || !description)
        return res.status(400).json({ message: "fill all the required fields" });
    if (!isEmail(email))
        return res.status(403).json({ message: "please provide valid email" });
    if ((String(mobile).trim().length !== 10))
        return res.status(403).json({ message: "please provide valid mobile number" });
    if (name !== account.name)
        if (await Account.findOne({ name: name.toLowerCase().trim(), organization: account.organization?._id }))
            return res.status(403).json({ message: `${name} already exists` });
    if (email !== account.email)
        if (await Account.findOne({ email: email.toLowerCase().trim(), organization: account.organization?._id }))
            return res.status(403).json({ message: `${email} already exists` });
    console.log(mobile, account.mobile)
    if (mobile != account.mobile)
        if (await Account.findOne({ mobile: String(mobile).trim(), organization: account.organization?._id }))
            return res.status(403).json({ message: `${mobile} already exists` });

    let dp: Asset = {
        public_id: "",
        url: "",
        size: 0,
        format: ""
    }

    if (req.file) {
        const allowedFiles = ["image/png", "image/jpeg", "image/gif"];
        const storageLocation = `crm/accounts/dp`;
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
    await Account.findByIdAndUpdate(account._id, {
        ...req.body,
        dp,
        description,
        organization: user.organization,
        updated_at: new Date(Date.now()),
        updated_by: user._id
    }).then(() =>
        res.status(200).json({ message: "account updated" })
    )
})
//toogle account status only admin can do "open",/"close"
export const ToogleAccountStatus = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user?._id)
    if (!user)
        return res.status(403).json({ message: "please login to access this resource" })
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "account id not valid" })
    let account = await Account.findById(id);
    if (!account) {
        return res.status(404).json({ message: "account not found" })
    }

    await Account.findByIdAndUpdate(account._id, {
        status: !account.status,
        status_changed_by: user._id
    }).then(() => res.status(200).json({ message: "account status updated" }))
})


// get a account anyone can do in the organization
export const GetAccount = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!isMongoId(id)) return res.status(403).json({ message: "account id not valid" })
    let account = await Account.findById(id).populate('account_owner').populate('organization').populate('activities').populate('status_changed_by').populate('updated_by')
    if (!account) {
        return res.status(404).json({ message: "account not found" })
    }
    return res.status(200).json(account)
})
// get all accounts  anyone can do in the organization
export const GetAccounts = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let accounts = await Account.find({ organization: req.user?.organization }).populate('account_owner').populate('organization').populate('activities').populate('status_changed_by').populate('updated_by')
    if (!accounts) {
        return res.status(404).json({ message: "accounts not found" })
    }
    return res.status(200).json(accounts)
})

// filter accounts anyone can do in the organization
export const FilterAccounts = catchAsyncError(async (req, res, next) => {
    let filter = [];
    if (req.query.city)
        filter.push({ city: { $regex: req.query.city } });
    if (req.query.state) filter.push({ state: { $regex: req.query.state } });
    if (req.query.state) filter.push({ state: { $regex: req.query.state } });
    if (req.query.country) filter.push({ country: { $regex: req.query.country } });
    if (req.query.account_owner) filter.push({ account_owner: { $regex: req.query.account_owner } });
    if (req.query.organization) filter.push({ organization: { $regex: req.query.organization } });
    if (req.query.account_source) filter.push({ account_source: { $regex: req.query.account_source } });
    if (req.query.open) filter.push({ open: { $regex: req.query.open } });
    if (req.query.createdOn) filter.push({ createdOn: { $regex: req.query.createdOn } });
    if (filter.length < 1)
        return res.status(400).json({ message: "no filter provided" })

    const accounts = await Account.find({
        $and: filter,
    }).sort({ createdAt: -1 });
    if (accounts.length > 0)
        return res.status(200).json(accounts);
    else
        return res.status(404).json({ message: "accounts not found" })
});

// fuzzy search accounts anyone can do in the organization
export const FuzzySearchAccounts = catchAsyncError(async (req, res, next) => {
    const key = String(req.params.query);
    const accounts = await Account.find({
        $or: [
            { name: { $regex: key } },
            { email: { $regex: key } },
            { mobile: { $regex: key } },
            { city: { $regex: key } },
            { state: { $regex: key } },
            { description: { $regex: key } },
            { account_type: { $regex: key } },
            { account_owner: { $regex: key } },
            { customer_name: { $regex: key } },
            { address: { $regex: key } },
            { country: { $regex: key } },
            { alternate_mobile: { $regex: key } },
            { alternate_email: { $regex: key } },
            { customer_designination: { $regex: key } },
            { account_source: { $regex: key } },
            { remarks: { $regex: key } },
            { createdOn: { $regex: key } }
        ],
    }).sort({ createdAt: -1 });
    if (accounts.length > 0) res.status(200).json({ accounts });
    else return res.status(404).json({ message: "user not found" });
});