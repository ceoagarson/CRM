import { Fade, IconButton, Menu, MenuItem, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ColumnInstance, Row } from 'react-table';
import ToogleColumns from './ToogleColumns';
import { Menu as MenuIcon } from '@mui/icons-material';
import ExportToExcel from '../utils/ExportToExcel';
import { IAccount } from '../../../types/account.type';
import { MenuActions, MenuContext } from '../../../contexts/menuContext';
import { ChoiceContext, AccountChoiceActions } from '../../../contexts/dialogContext';
import NewAccountDialog from '../../dialogs/accounts/NewAccountDialog';


type Props = {
    columns: ColumnInstance<IAccount>[],
    selectedFlatRows: Row<IAccount>[]
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
    account_owner?: string,
    customer_name?: string,
    address?: string,
    alternate_mobile?: number,
    alternate_email?: string,
    customer_designation?: string,
    account_source?: string,
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
            ExportToExcel(selectedData, "accounts_data")
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
            const account = item.original
            return data.push({
                name:account.name,
                email:account.email,
                mobile:account.mobile,
                description:account.description,
                city:account.city,
                state:account.state,
                probability:account.probability,
                country:account.country,
                account_owner:account.account_owner.username,
                customer_name:account.customer_name,
                address:account.address,
                alternate_mobile:account.alternate_mobile,
                alternate_email:account.alternate_email,
                customer_designation:account.customer_designation,
                account_source:account.account_source,
                remarks:account.remarks,
                status: account.status,
                status_changed_by:account.status_changed_by.username,
                updated_by:account.updated_by.username,
                updated_at:new Date(account.updated_at).toLocaleDateString(),
                created_at:new Date(account.created_at).toLocaleDateString(),
                dp:account.dp.url

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
                onClick={(e) => setMenu({ type: MenuActions.account_table_menu, payload: { type: MenuActions.account_table_menu, anchorEl: e.currentTarget } })
                }
            >
                <MenuIcon />
            </IconButton>
            <ToogleColumns columns={columns} open={toogleCol} handleClose={() =>
                setToogleCol(false)
            } />
            <Menu
                anchorEl={menu.anchorEl}
                open={Boolean(menu.type === MenuActions.account_table_menu)}
                onClose={(e) => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }
                TransitionComponent={Fade}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    setChoice({ type: AccountChoiceActions.create_account })
                    setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }}
                >New Account</MenuItem>
                <MenuItem onClick={() => {
                    setToogleCol(true)
                    setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }}
                >Show and hide columns</MenuItem>
                <MenuItem onClick={handleExcel}
                >Export To Excel</MenuItem>
            </Menu>
            <NewAccountDialog />
        </>
    )
}

export default TableMenu
