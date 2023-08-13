import { Fade, IconButton, Menu, MenuItem, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Menu as MenuIcon } from '@mui/icons-material';
import { MenuActions, MenuContext } from '../../../contexts/menuContext';
import { ChoiceContext, LeadChoiceActions } from '../../../contexts/dialogContext';
import ExportToExcel from '../../../utils/ExportToExcel';
import NewLeadDialog from '../../dialogs/leads/NewLeadDialog';
import { ILead } from '../../../types/leads/lead.type';
import { ILeadTemplate } from '../../../types/leads/lead.template.types';

let template: ILeadTemplate[] = [
    {
        _id: "",
        name: "",
        customer_name: "",
        customer_designation: "",
        mobile: "6787876765",
        email: "",
        city: "",
        state: "",
        country: "",
        address: "",
        work_description: "",
        turnover: "5 lakhs",
        alternate_mobile1: "6787876766",
        alternate_mobile2: "6787876767",
        alternate_email: '',
        lead_type: "wholesale+retail",
        stage: "useless",
        lead_source: "cold calling",
        remarks: "remarks",
        lead_owners: "nishu,sandeep",
        is_customer: false,
        last_whatsapp_date: new Date(),
        created_at: new Date(),
        created_by: "nishu",
        updated_at: new Date(),
        updated_by: "nishu",
    }
]

type Props = {
    selectedFlatRows: ILead[]
}

function LeadTableMenu({ selectedFlatRows }: Props) {
    const { menu, setMenu } = useContext(MenuContext)
    const [selectedData, setSelectedData] = useState<ILeadTemplate[]>(template)
    const [sent, setSent] = useState(false)
    const { setChoice } = useContext(ChoiceContext)

    function handleExcel() {
        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
        try {
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
        let data: ILeadTemplate[] = []
        selectedFlatRows.map((lead) => {
            return data.push(

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
                    created_by: lead.created_by.username,
                    updated_at: lead.updated_at,
                    updated_by: lead.updated_by.username,
                    lead_owners: lead.lead_owners.map((owner) => {
                        return owner.username + ","
                    }).toString()
                })
        })
        if (data.length > 0)
            setSelectedData(data)
    }, [selectedFlatRows])


    return (
        <>

            {/* export snak bar */}
            <Snackbar
                open={sent}
                autoHideDuration={6000}
                onClose={() => setSent(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                message="File Exported Successfuly"
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
                onClose={() => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
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
                >Add New</MenuItem>
                <MenuItem onClick={handleExcel}
                >Export To Excel</MenuItem>

            </Menu>
            <NewLeadDialog />
        </>
    )
}

export default LeadTableMenu
