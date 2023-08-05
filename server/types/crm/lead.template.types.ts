export type ILeadTemplate = {
    _id: string,
    name: string,
    customer_name: string,
    customer_designation: string,
    mobile: number,
    email: string,
    city: string,
    state: string,
    country: string,
    address: string,
    work_description: string,
    turnover: number,
    alternate_mobile1: number,
    alternate_mobile2: number,
    alternate_email: string,

    lead_type: string
    stage: string
    lead_source: string

    remarks: string,
    lead_owners: string,

    visiting_card: string,
    is_customer: boolean,

    last_whatsapp_date: Date,
    created_at: Date,
    created_by: string,
    updated_at: Date,
    updated_by: string
}

