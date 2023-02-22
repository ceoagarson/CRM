import { NextFunction, Request, Response } from "express";
import isMongoId from "validator/lib/isMongoId";
import { catchAsyncError } from "../middlewares/catchAsyncError.middleware.ts";
import Account from "../models/account.model";
import Lead from "../models/lead.model";
import Opportunity from "../models/opportunity.model";
import { handleAccountToLeadConversion, handleAccountToOpportunityConversion, handleLeadToAccountConversion, handleLeadToOpportunityConversion, handleOpportunityToAccountConversion, handleOpportunityToLeadConversion } from "../utils/Conversion";


export const ConvertResource = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const { target_resource_type, resource_type } = req.body as Request['body'] & { resource_type: "lead" | "account" | "opportunity", target_resource_type: "lead" | "account" | "opportunity" }
    const resource_id = req.params.id
    if (!target_resource_type || !resource_type || !resource_id)
        return res.status(403).json({ message: "fill all the required fields" })
    if (target_resource_type === resource_type)
        return res.status(403).json({ message: "resource type should be different from the existing type" })

    if (!isMongoId(resource_id))
        return res.status(403).json({ message: "resource id not valid" })
    if (!req.user) {
        return res.status(403).json({ message: "please login to access this resource" })
    }
    if (resource_type === "lead") {
        let Resource = await Lead.findById(resource_id)
        if (!Resource)
            return res.status(404).json({ message: `${resource_type} resource not found` })
        if (req.user) {
            if (target_resource_type === "account") {
                let account = handleLeadToAccountConversion({ lead: Resource, user: req.user })
                await account.save()
                await Lead.findByIdAndRemove(Resource._id)
                return res.status(201).json(account)
            }
            if (target_resource_type === "opportunity") {
                let opportunity = handleLeadToOpportunityConversion({ lead: Resource, user: req.user })
                await opportunity.save()
                await Lead.findByIdAndRemove(Resource._id)
                return res.status(201).json(opportunity)
            }
        }
    }
    else if (resource_type === "account") {
        let Resource = await Account.findById(resource_id)
        if (!Resource)
            return res.status(404).json({ message: `${resource_type} resource not found` })
        if (req.user) {
            if (target_resource_type === "lead") {
                let lead = handleAccountToLeadConversion({ account: Resource, user: req.user })
                await lead.save()
                await Account.findByIdAndRemove(Resource._id)
                return res.status(201).json(lead)
            }

            if (target_resource_type === "opportunity") {
                let opportunity = handleAccountToOpportunityConversion({ account: Resource, user: req.user })
                await opportunity.save()
                await Account.findByIdAndRemove(Resource._id)
                return res.status(201).json(opportunity)
            }
        }
    }
    else if (resource_type === "opportunity") {
        let Resource = await Opportunity.findById(resource_id)
        if (!Resource)
            return res.status(404).json({ message: `${resource_type} resource not found` })
        if (req.user) {
            if (target_resource_type === "lead") {
                let lead = handleOpportunityToLeadConversion({ opportunity: Resource, user: req.user })
                await lead.save()
                await Opportunity.findByIdAndRemove(Resource._id)
                return res.status(201).json(lead)
            }
            if (target_resource_type == "account") {

                let account = handleOpportunityToAccountConversion({ opportunity: Resource, user: req.user })
                await account.save()
                await Opportunity.findByIdAndRemove(Resource._id)
                return res.status(201).json(account)
            }
        }
    }
    else {
        return res.status(404).json({ message: ` ${resource_type} resource not found` })
    }
    res.status(500).json({ message: "something went wrong" })
})
