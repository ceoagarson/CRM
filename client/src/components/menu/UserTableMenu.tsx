import { Fade, IconButton, Menu, MenuItem, Snackbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { ColumnInstance, Row } from 'react-table';
import { IUser } from '../../types/user.type';
import { MenuActions, MenuContext } from '../../contexts/menuContext';
import { UserContext } from '../../contexts/userContext';
import { ChoiceContext, UserChoiceActions } from '../../contexts/dialogContext';
import ExportToExcel from '../tables/utils/ExportToExcel';
import ToogleColumns from '../tables/utils/ToogleColumns';
import { Menu as MenuIcon } from '@mui/icons-material';

type Props = {
    columns: ColumnInstance<IUser>[],
    selectedFlatRows: Row<IUser>[]
}
type SelectedData = {
    username?: string,
    email?: string,
    dp?: string,
    email_verified?: Boolean,
    is_active?: Boolean,
    last_login?: string,
    organization?: string,
    organization_email?: string,
    roles?: string,
    created_at?: string,
    createdBy?: string

}
function UserTableMenu({ columns, selectedFlatRows }: Props) {
    const { menu, setMenu } = useContext(MenuContext)
    const {user}=useContext(UserContext)
    const { setChoice }=useContext(ChoiceContext)
    const [toogleCol, setToogleCol] = useState(false)
    const [selectedData, setSelectedData] = useState<SelectedData[]>([])
    const [sent, setSent] = useState(false)


    function handleExcel() {
        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
        try {
            if (selectedData.length === 0)
                return alert("please select some rows")
            ExportToExcel(selectedData, "users_data")
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
                organization: user.organization?.organization_name,
                organization_email: user.organization?.organization_email,
                roles: user?.is_admin?"admin":"user",
                created_at: created_at
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

            <IconButton size="medium" sx={{border:1,borderRadius:2,marginLeft:2}}
                onClick={(e) => setMenu({ type: MenuActions.user_table_menu, payload: { type: MenuActions.user_table_menu, anchorEl: e.currentTarget } })
                }
            >
                <MenuIcon />
            </IconButton>
            <ToogleColumns columns={columns} open={toogleCol} handleClose={() =>
                setToogleCol(false)
            } />
            <Menu
                anchorEl={menu.anchorEl}
                open={Boolean(menu.type === MenuActions.user_table_menu)}
                onClose={(e) => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }
                TransitionComponent={Fade}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{ borderRadius: 2 }}

            >
                {user?.is_admin ?
                    <MenuItem onClick={() => {
                        setChoice({ type: UserChoiceActions.new_user })
                        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })

                    }
                    }>New User</MenuItem>
                    :
                    null
                }
                <MenuItem onClick={() => {
                    setToogleCol(true)
                    setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }}
                >Show and hide columns</MenuItem>
                <MenuItem onClick={handleExcel}
                >Export To Excel</MenuItem>
            </Menu>

        </>
    )
}

export default UserTableMenu