import { Fade, IconButton, Menu, MenuItem, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Row } from 'react-table';
import { Menu as MenuIcon } from '@mui/icons-material';
import { ILead } from '../../types/lead.type';
import { MenuActions, MenuContext } from '../../contexts/menuContext';
import { ChoiceContext, LeadChoiceActions } from '../../contexts/dialogContext';
import ExportToExcel from '../tables/utils/ExportToExcel';
import NewLeadDialog from '../dialogs/leads/NewLeadDialog';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { BackendError } from '../../types';
import { queryClient } from '../..';
import {  PreserveLeadsInBulk } from '../../services/LeadsServices';

type Props = {
    selectedFlatRows: Row<ILead>[]
}
type SelectedData = {
    name: string,
    email: string,
    work_description: string,
    mobile: string,
    city: string,
    state: string,
    stage: string,
    country: string,
    lead_owner: string,
    customer_name: string,
    address: string,
    alternate_mobile1: string,
    alternate_mobile2: string,
    alternate_email: string,
    customer_designation: string,
    lead_source: string,
    updated_by: string,
    updated_at: string,
    created_at: string,
    turnover: string,
    lead_type: string,
    last_remark: string

}
function LeadTableMenu({ selectedFlatRows }: Props) {
    const { menu, setMenu } = useContext(MenuContext)
    const [selectedData, setSelectedData] = useState<SelectedData[]>([])
    const [sent, setSent] = useState(false)
    const { setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess } = useMutation
        <AxiosResponse<{ ids: string[] }>, BackendError, { ids: string[] }>
        (PreserveLeadsInBulk,
            {
                onSuccess: () => {
                    queryClient.invalidateQueries('leads')
                }
            }
        )

    function HandlePreserveLead() {
        try {
            if (selectedData.length === 0)
                return alert("please select some rows")
            let ids: string[] = []
            selectedFlatRows.forEach((row) => {
                ids.push(row.original._id)
            })
            mutate({ ids: ids })
        }
        catch (err) {
            console.log(err)
        }
    }
    function handleExcel() {
        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
        try {
            if (selectedData.length === 0)
                return alert("please select some rows")
            ExportToExcel(selectedData, "leads_data")
            setSent(true)
        }
        catch (err) {
            console.log(err)
            setSent(false)
        }

    }

    // refine data
    useEffect(() => {
        let data: SelectedData[] = []
        selectedFlatRows.map((item) => {
            const lead = item.original
            let last_remark = ""
            if (lead.remarks.length)
                last_remark = lead.remarks[lead.remarks.length - 1].remark
            return data.push({
                name: lead.name,
                email: lead.email,
                mobile: lead.mobile,
                work_description: lead.work_description,
                city: lead.city,
                state: lead.state,
                stage: lead.stage,
                country: lead.country,
                turnover: lead.turnover,
                lead_type: lead.lead_type,
                lead_owner: lead.lead_owners.toString(),
                customer_name: lead.customer_name,
                last_remark: last_remark,
                address: lead.address,
                alternate_mobile1: lead.alternate_mobile1,
                alternate_mobile2: lead.alternate_mobile2,
                alternate_email: lead.alternate_email,
                customer_designation: lead.customer_designation,
                lead_source: lead.lead_source,
                updated_by: lead.updated_by.username,
                updated_at: new Date(lead.updated_at).toLocaleDateString(),
                created_at: new Date(lead.created_at).toLocaleDateString(),
            })
        })
        setSelectedData(data)
    }, [selectedFlatRows])

    return (
        <>
            <Snackbar
                open={isLoading}
                autoHideDuration={6000}
                onClose={() => setSent(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message="Started the process..."
            />
            {/* export snak bar */}
            <Snackbar
                open={sent}
                autoHideDuration={6000}
                onClose={() => setSent(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message="File Exported Successfuly"
            />
            {/* preserved snak bar */}
            <Snackbar
                open={isSuccess}
                autoHideDuration={6000}
                onClose={() => setSent(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message="Selected Leads Preserved Successfuly"
            />

            <IconButton size="medium"
                onClick={(e) => setMenu({ type: MenuActions.lead_table_menu, payload: { type: MenuActions.lead_table_menu, anchorEl: e.currentTarget } })
                }
                sx={{ border: 1, borderRadius: 2, marginLeft: 2 }}
            >
                <MenuIcon />
            </IconButton>

            <Menu
                anchorEl={menu.anchorEl}
                open={Boolean(menu.type === MenuActions.lead_table_menu)}
                onClose={(e) => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }
                TransitionComponent={Fade}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ borderRadius: 2 }}
            >
                <MenuItem onClick={() => {
                    setChoice({ type: LeadChoiceActions.create_lead })
                    setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }}
                >New Lead</MenuItem>
                <MenuItem disabled={isLoading} onClick={handleExcel}
                >Export To Excel</MenuItem>
                <MenuItem disabled={isLoading} onClick={HandlePreserveLead}
                >Preserve Lead</MenuItem>
            </Menu>
            <NewLeadDialog />
        </>
    )
}

export default LeadTableMenu
