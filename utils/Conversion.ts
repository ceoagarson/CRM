import Account from "../models/account.model";
import Lead from "../models/lead.model";
import Opportunity from "../models/opportunity.model";
import { IAccount } from "../types/account.type";
import { ILead } from "../types/lead.type";
import { IOpportunity } from "../types/opportunity.types";
import { IUser } from "../types/user.type";

export function handleLeadToAccountConversion({ lead, user }: { lead: ILead, user: IUser }) {
    return new Account({
        _id:lead._id,
        name: lead.name,
        customer_name: lead.customer_name,
        customer_designination: lead.customer_designination,
        mobile: lead.mobile,
        email: lead.email,
        city: lead.city,
        state: lead.state,
        address: lead.address,
        description: lead.description,
        alternate_mobile: lead.alternate_mobile,
        alternate_email: lead.alternate_email,
        probability: lead.probability,
        account_owner: lead.lead_owner,
        organization: lead.organization,
        dp: lead.dp,
        account_source: lead.lead_source,
        remarks: lead.remarks,
        country: lead.country,
        created_by: user._id,
        updated_by: user._id,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        status_changed_by: user._id,
        activities: lead.activities
    })
}
export function handleLeadToOpportunityConversion({ lead, user }: { lead: ILead, user: IUser }) {
    return new Opportunity({
        _id:lead._id,
        name: lead.name,
        customer_name: lead.customer_name,
        customer_designination: lead.customer_designination,
        mobile: lead.mobile,
        email: lead.email,
        city: lead.city,
        state: lead.state,
        address: lead.address,
        description: lead.description,
        alternate_mobile: lead.alternate_mobile,
        alternate_email: lead.alternate_email,
        probability: lead.probability,
        opportunity_owner: lead.lead_owner,
        organization: lead.organization,
        dp: lead.dp,
        opportunity_source: lead.lead_source,
        remarks: lead.remarks,
        country: lead.country,
        created_by: user._id,
        updated_by: user._id,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        status_changed_by: user._id,
        activities: lead.activities
    })

}
export function handleAccountToOpportunityConversion({ account, user }: { account: IAccount, user: IUser }){
    return new Opportunity({
        _id:account._id,
        name: account.name,
        customer_name: account.customer_name,
        customer_designination: account.customer_designination,
        mobile: account.mobile,
        email: account.email,
        city: account.city,
        state: account.state,
        address: account.address,
        description: account.description,
        alternate_mobile: account.alternate_mobile,
        alternate_email: account.alternate_email,
        probability: account.probability,
        opportunity_owner: account.account_owner,
        organization: account.organization,
        dp: account.dp,
        opportunity_source: account.account_source,
        remarks: account.remarks,
        country: account.country,
        created_by: user._id,
        updated_by: user._id,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        status_changed_by: user._id,
        activities: account.activities
    })
}
export function handleAccountToLeadConversion({ account, user }: { account: IAccount, user: IUser }) {
    return new Lead({
        _id:account._id,
        name: account.name,
        customer_name: account.customer_name,
        customer_designination: account.customer_designination,
        mobile: account.mobile,
        email: account.email,
        city: account.city,
        state: account.state,
        address: account.address,
        description: account.description,
        alternate_mobile: account.alternate_mobile,
        alternate_email: account.alternate_email,
        probability: account.probability,
        lead_owner: account.account_owner,
        organization: account.organization,
        dp: account.dp,
        lead_source: account.account_source,
        remarks: account.remarks,
        country: account.country,
        created_by: user._id,
        updated_by: user._id,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        status_changed_by: user._id,
        activities: account.activities
    })
}
export function handleOpportunityToAccountConversion({ opportunity, user }: { opportunity: IOpportunity, user: IUser }) {
    return new Account({
        _id:opportunity._id,
        name: opportunity.name,
        customer_name: opportunity.customer_name,
        customer_designination: opportunity.customer_designination,
        mobile: opportunity.mobile,
        email: opportunity.email,
        city: opportunity.city,
        state: opportunity.state,
        address: opportunity.address,
        description: opportunity.description,
        alternate_mobile: opportunity.alternate_mobile,
        alternate_email: opportunity.alternate_email,
        probability: opportunity.probability,
        account_owner: opportunity.opportunity_owner,
        organization: opportunity.organization,
        dp: opportunity.dp,
        account_source: opportunity.opportunity_source,
        remarks: opportunity.remarks,
        country: opportunity.country,
        created_by: user._id,
        updated_by: user._id,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        status_changed_by: user._id,
        activities: opportunity.activities
    })
}
export function handleOpportunityToLeadConversion({ opportunity, user }: { opportunity: IOpportunity, user: IUser }) {
    return new Lead({
        _id:opportunity._id,
        name: opportunity.name,
        customer_name: opportunity.customer_name,
        customer_designination: opportunity.customer_designination,
        mobile: opportunity.mobile,
        email: opportunity.email,
        city: opportunity.city,
        state: opportunity.state,
        address: opportunity.address,
        description: opportunity.description,
        alternate_mobile: opportunity.alternate_mobile,
        alternate_email: opportunity.alternate_email,
        probability: opportunity.probability,
        lead_owner: opportunity.opportunity_owner,
        organization: opportunity.organization,
        dp: opportunity.dp,
        lead_source: opportunity.opportunity_source,
        remarks: opportunity.remarks,
        country: opportunity.country,
        created_by: user._id,
        updated_by: user._id,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
        status_changed_by: user._id,
        activities: opportunity.activities
    })
}

