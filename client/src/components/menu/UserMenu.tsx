import { Menu, MenuItem } from '@mui/material'
import React, { useContext } from 'react'
import { ChoiceActions, ChoiceContext } from '../../contexts/dialogContext';
import { UserContext } from '../../contexts/userContext';
import NewUserDialog from '../dialogs/users/NewUserDialog';
type Props = {
    anchorEl: null | HTMLElement,
    handleClose: () => void,
    handleLogout: (e: React.MouseEvent) => void
}
function UserMenu({ anchorEl, handleClose, handleLogout }: Props) {
    const openMenu = Boolean(anchorEl);
    const { user } = useContext(UserContext)
    const { setChoice } = useContext(ChoiceContext)
    return (
        <>
            {/* new user dialog */}
            <NewUserDialog />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                {user?.roles?.includes("admin") ?
                    <MenuItem onClick={() => setChoice({ type: ChoiceActions.new_user })}>New User</MenuItem>
                    :
                    null
                }
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default UserMenu