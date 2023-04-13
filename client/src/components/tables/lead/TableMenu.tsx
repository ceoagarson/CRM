import { Fade, IconButton, Menu, MenuItem, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ColumnInstance, Row } from 'react-table';
import ToogleColumns from './ToogleColumns';
import { Menu as MenuIcon } from '@mui/icons-material';
import ExportToExcel from '../utils/ExportToExcel';
import { ILead } from '../../../types/lead.type';
import { MenuActions, MenuContext } from '../../../contexts/menuContext';
import { ChoiceContext, LeadChoiceActions } from '../../../contexts/dialogContext';
import NewLeadDialog from '../../dialogs/leads/NewLeadDialog';


type Props = {
    columns: ColumnInstance<ILead>[],
    selectedFlatRows: Row<ILead>[]
}
type SelectedData = {
    name?: string,
    email?: string,
    mobile?: number,
    work_description?: string,
    city?: string,
    state?: string,
    stage?: string,
    country?: string,
    lead_owner?: string,
    customer_name?: string,
    address?: string,
    alternate_mobile1?: number,
    alternate_email?: string,
    customer_designation?: string,
    lead_source?: string,
    updated_by?: string,
    updated_at?: string,
    created_at?: string,

}
function TableMenu({ columns, selectedFlatRows }: Props) {
    const { menu, setMenu } = useContext(MenuContext)
    const [toogleCol, setToogleCol] = useState(false)
    const [selectedData, setSelectedData] = useState<SelectedData[]>([])
    const [sent, setSent] = useState(false)
    const {setChoice}=useContext(ChoiceContext)


    function handleExcel() {
        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
        try {
            if (selectedData.length === 0)
                return alert("please select some rows")
            ExportToExcel(selectedData, "leads_data")
            setSent(true)
        }
        catch (err) {
            setSent(false)
        }

    }

    // refine data
    useEffect(() => {
        let data: SelectedData[] = []
        selectedFlatRows.map((item) => {
            const lead = item.original
            return data.push({
                name:lead.name,
                email:lead.email,
                mobile:lead.mobile,
                work_description:lead.work_description,
                city:lead.city,
                state:lead.state,
                stage:lead.stage,
                country:lead.country,
                lead_owner:lead.lead_owner.username,
                customer_name:lead.customer_name,
                address:lead.address,
                alternate_mobile1:lead.alternate_mobile1,
                alternate_email:lead.alternate_email,
                customer_designation:lead.customer_designation,
                lead_source:lead.lead_source,
                updated_by:lead.updated_by.username,
                updated_at:new Date(lead.updated_at).toLocaleDateString(),
                created_at:new Date(lead.created_at).toLocaleDateString(),
            })
        })
        setSelectedData(data)
    }, [selectedFlatRows])

    return (
        <>
            {/* snak bar */}
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
            >
                <MenuIcon />
            </IconButton>
            <ToogleColumns columns={columns} open={toogleCol} handleClose={() =>
                setToogleCol(false)
            } />
            <Menu
                anchorEl={menu.anchorEl}
                open={Boolean(menu.type === MenuActions.lead_table_menu)}
                onClose={(e) => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }
                TransitionComponent={Fade}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    setChoice({ type: LeadChoiceActions.create_lead })
                    setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }}
                >New Lead</MenuItem>
                <MenuItem onClick={() => {
                    setToogleCol(true)
                    setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }}
                >Show and hide columns</MenuItem>
                <MenuItem onClick={handleExcel}
                >Export To Excel</MenuItem>
            </Menu>
            <NewLeadDialog />
        </>
    )
}

export default TableMenu
