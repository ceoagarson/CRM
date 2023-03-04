import { Fade, IconButton, Menu, MenuItem, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ColumnInstance, Row } from 'react-table';
import ToogleColumns from './ToogleColumns';
import { Menu as MenuIcon } from '@mui/icons-material';
import ExportToExcel from '../utils/ExportToExcel';
import { IOpportunity } from '../../../types/opportunity.type';
import { MenuActions, MenuContext } from '../../../contexts/menuContext';
import { ChoiceContext, OpportunityChoiceActions } from '../../../contexts/dialogContext';
import NewOpportunityDialog from '../../dialogs/opportunities/NewOpportunityDialog';


type Props = {
    columns: ColumnInstance<IOpportunity>[],
    selectedFlatRows: Row<IOpportunity>[]
}
type SelectedData = {
    name?: string,
    email?: string,
    mobile?: number,
    description?: string,
    city?: string,
    state?: string,
    probability?: string,
    country?: string,
    opportunity_owner?: string,
    customer_name?: string,
    address?: string,
    alternate_mobile?: number,
    alternate_email?: string,
    customer_designation?: string,
    opportunity_source?: string,
    remarks?: string,
    status: Boolean,
    status_changed_by?: string,
    updated_by?: string,
    updated_at?: string,
    created_at?: string,
    dp?: string,

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
            ExportToExcel(selectedData, "opportunities_data")
        }
        catch (err) {
            setSent(false)
        }

    }

    // refine data
    useEffect(() => {
        let data: SelectedData[] = []
        selectedFlatRows.map((item) => {
            const opportunity = item.original
            return data.push({
                name:opportunity.name,
                email:opportunity.email,
                mobile:opportunity.mobile,
                description:opportunity.description,
                city:opportunity.city,
                state:opportunity.state,
                probability:opportunity.probability,
                country:opportunity.country,
                opportunity_owner:opportunity.opportunity_owner.username,
                customer_name:opportunity.customer_name,
                address:opportunity.address,
                alternate_mobile:opportunity.alternate_mobile,
                alternate_email:opportunity.alternate_email,
                customer_designation:opportunity.customer_designation,
                opportunity_source:opportunity.opportunity_source,
                remarks:opportunity.remarks,
                status: opportunity.status,
                status_changed_by:opportunity.status_changed_by.username,
                updated_by:opportunity.updated_by.username,
                updated_at:new Date(opportunity.updated_at).toLocaleDateString(),
                created_at:new Date(opportunity.created_at).toLocaleDateString(),
                dp:opportunity.dp.url

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
                onClick={(e) => setMenu({ type: MenuActions.opportunity_table_menu, payload: { type: MenuActions.opportunity_table_menu, anchorEl: e.currentTarget } })
                }
            >
                <MenuIcon />
            </IconButton>
            <ToogleColumns columns={columns} open={toogleCol} handleClose={() =>
                setToogleCol(false)
            } />
            <Menu
                anchorEl={menu.anchorEl}
                open={Boolean(menu.type === MenuActions.opportunity_table_menu)}
                onClose={(e) => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }
                TransitionComponent={Fade}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    setChoice({ type: OpportunityChoiceActions.create_opportunity })
                    setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }}
                >New Opportunity</MenuItem>
                <MenuItem onClick={() => {
                    setToogleCol(true)
                    setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }}
                >Show and hide columns</MenuItem>
                <MenuItem onClick={handleExcel}
                >Export To Excel</MenuItem>
            </Menu>
            <NewOpportunityDialog />
        </>
    )
}

export default TableMenu
