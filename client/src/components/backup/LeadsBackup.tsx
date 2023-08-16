import { BackupAllLeads } from '../../services/LeadsServices'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { ILead } from '../../types/leads/lead.type'
import { BackendError } from '../../types'
import { Button, Snackbar, Stack } from '@mui/material'
import { ILeadTemplate } from '../../types/leads/lead.template.types'
import ExportToExcel from '../../utils/ExportToExcel'
import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/userContext'

function LeadsBackup() {
    const { data, isLoading } = useQuery<AxiosResponse<ILead[]>, BackendError>("backup_leads", BackupAllLeads, {
        staleTime: 50000
    })
    const { user } = useContext(UserContext)
    const [isSent, setIsSent] = useState(false)
    function handleExport() {
        let leads = data?.data
        let result: ILeadTemplate[] = []
        if (leads) {
            leads && leads.map((lead) => {
                return result.push(

                    {
                        _id: lead._id,
                        name: lead.name,
                        customer_name: lead.customer_name,
                        customer_designation: lead.customer_designation,
                        mobile: lead.mobile,
                        email: lead.email,
                        city: lead.city,
                        state: lead.state,
                        country: lead.country,
                        address: lead.address,
                        work_description: lead.work_description,
                        turnover: lead.turnover,
                        alternate_mobile1: lead.alternate_mobile1,
                        alternate_mobile2: lead.alternate_mobile2,
                        alternate_email: lead.alternate_email,
                        lead_type: lead.lead_type,
                        stage: lead.stage,
                        lead_source: lead.lead_source,
                        remarks: lead.last_remark || "",
                        is_customer: lead.is_customer,
                        last_whatsapp_date: lead.last_whatsapp_date,
                        created_at: lead.created_at,
                        created_by_username: lead.created_by.username,
                        updated_at: lead.updated_at,
                        updated_by_username: lead.updated_by.username,
                        lead_owners: lead.lead_owners.map((owner) => {
                            return owner.username + ","
                        }).toString()
                    })
            })
            ExportToExcel(result, "all_leads_backup")
            setIsSent(true)
        }

    }

    function extractMobiles() {
        let leads = data?.data
        let mobiles: {
            mobile: number
        }[] = []
        if (leads) {
            leads && leads.forEach((lead) => {
                if (lead.mobile)
                    mobiles.push({ mobile: Number(lead.mobile) })
                if (lead.alternate_mobile1)
                    mobiles.push({ mobile: Number(lead.alternate_mobile1) })
                if (lead.alternate_mobile2)
                    mobiles.push({ mobile: Number(lead.alternate_mobile2) })
            })
            ExportToExcel(mobiles, "all_mobiles_backup")
            setIsSent(true)
        }
    }
    return (
        <>
            {/* export snak bar */}
            < Snackbar
                open={isSent}
                autoHideDuration={6000}
                onClose={() => setIsSent(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message="Data Exported Successfuly"
            />

            <Stack direction="row" gap={1} alignItems="center">
                {user?.is_admin ?
                    <>
                        <Button variant='outlined' disabled={isLoading} onClick={() => handleExport()}>{isLoading ? "loading.." : "Export"}</Button>
                        <Button variant='contained' disabled={isLoading} onClick={() => extractMobiles()}>{isLoading ? "Loading.." : "Extract Mobiles"}</Button>
                    </> :
                    null}
            </Stack>
        </>
    )
}

export default LeadsBackup