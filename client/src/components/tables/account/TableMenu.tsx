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
    dp?: string,
    email_verified?: Boolean,
    is_active?: Boolean,
    last_login?: string,
    organization?: string,
    organization_email?: string,
    roles?: string,
    createdAt?: string,
    createdBy?: string

}
function TableMenu({ columns, selectedFlatRows }: Props) {
    const { menu, setMenu } = useContext(MenuContext)
    const [toogleCol, setToogleCol] = useState(false)
    const [selectedData, setSelectedData] = useState<SelectedData[]>([])
    const [sent, setSent] = useState(false)
    const { setChoice } = useContext(ChoiceContext)


    function handleExcel() {
        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
        try {
            if (selectedData.length === 0)
                return alert("please select some rows")
            ExportToExcel(selectedData, "USERS_DATA")
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
            const user = item.original
            let created_at = undefined
            return data.push({
                email: user.email,
                dp: user.dp?.url,
                createdAt: created_at
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
