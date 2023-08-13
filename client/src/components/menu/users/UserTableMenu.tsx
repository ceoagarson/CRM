import { Fade, IconButton, Menu, MenuItem, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Menu as MenuIcon } from '@mui/icons-material';
import { MenuActions, MenuContext } from '../../../contexts/menuContext';
import { ChoiceContext, UserChoiceActions } from '../../../contexts/dialogContext';
import ExportToExcel from '../../../utils/ExportToExcel';
import NewUserDialog from '../../dialogs/users/NewUserDialog';
import { IUser } from '../../../types/users/user.type';

type Props = {
    selectedFlatRows: IUser[]
}
type SelectedData = {
    username?: string,
    email?: string,
    dp?: string,
    email_verified?: Boolean,
    is_active?: Boolean,
    last_login?: string,
    roles?: string,
    created_at?: string,
    createdBy?: string

}
function UserTableMenu({ selectedFlatRows }: Props) {
    const { menu, setMenu } = useContext(MenuContext)
    const [selectedData, setSelectedData] = useState<SelectedData[]>([])
    const [sent, setSent] = useState(false)
    const { setChoice } = useContext(ChoiceContext)


    function handleExcel() {
        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
        try {
            if (selectedData.length === 0)
                return alert("please select some rows")
            ExportToExcel(selectedData, "users_data")
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
        selectedFlatRows.map((user) => {
            let lastlogin = undefined
            let created_at = undefined
            if (user.last_login && user.created_at) {
                lastlogin = new Date(user.last_login).toLocaleDateString()
                created_at = new Date(user.created_at).toLocaleDateString()
            }
            return data.push({
                username: user.username,
                email: user.email,
                dp: user.dp?.url,
                email_verified: user.email_verified,
                is_active: user.is_active,
                last_login: lastlogin,
                roles: user?.is_admin ? "admin" : "user",
                created_at: created_at
            })
        })
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
                onClick={(e) => setMenu({ type: MenuActions.user_table_menu, payload: { type: MenuActions.user_table_menu, anchorEl: e.currentTarget } })
                }
                sx={{ border: 1, borderRadius: 2, marginLeft: 2 }}
            >
                <MenuIcon />
            </IconButton>

            <Menu
                anchorEl={menu.anchorEl}
                open={Boolean(menu.type === MenuActions.user_table_menu)}
                onClose={() => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }
                TransitionComponent={Fade}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ borderRadius: 2 }}
            >
                <MenuItem onClick={() => {
                    setChoice({ type: UserChoiceActions.new_user })
                    setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }}
                >New User</MenuItem>
                <MenuItem onClick={handleExcel}
                >Export To Excel</MenuItem>

            </Menu>
            <NewUserDialog />
        </>
    )
}

export default UserTableMenu
