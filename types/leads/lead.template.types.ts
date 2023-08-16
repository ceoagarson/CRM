export type ILeadTemplate = {
    _id: string,
    name: string,
    customer_name: string,
    customer_designation: string,
    mobile: string,
    email: string,
    city: string,
    state: string,
    country: string,
    address: string,
    work_description: string,
    turnover: string,
    alternate_mobile1: string,
    alternate_mobile2: string,
    alternate_email: string,

    lead_type: string
    stage: string
    lead_source: string

    remarks: string,
    lead_owners: string,
    is_customer: boolean,

    last_whatsapp_date: Date,
    created_at: Date,
    created_by_username: string,
    updated_at: Date,
    updated_by_username: string,
    status?: string
}

