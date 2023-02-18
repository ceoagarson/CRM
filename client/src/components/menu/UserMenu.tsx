import { Button, Menu, MenuItem } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ChoiceActions, ChoiceContext } from '../../contexts/dialogContext';
import { MenuActions, MenuContext } from '../../contexts/menuContext';
import { UserActions, UserContext } from '../../contexts/userContext';
import { paths } from '../../Routes';
import { Logout } from '../../services/UserServices';
import EmailVerifySendMailDialog from '../dialogs/users/EmailVerifySendMailDialog';
import NewUserDialog from '../dialogs/users/NewUserDialog';
import UpdatePasswordDialog from '../dialogs/users/UpdatePasswordDialog';
import UpdateProfileDialog from '../dialogs/users/UpdateProfileDialog';

function UserMenu() {
    const { menu, setMenu } = useContext(MenuContext)
    const { user, dispatch } = useContext(UserContext)
    const { setChoice } = useContext(ChoiceContext)
    const { mutate, isSuccess } = useMutation(Logout)
    const goto = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            dispatch({ type: UserActions.logout })
            setChoice({ type: ChoiceActions.close })
            setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
            goto(paths.home)
        }
    }, [dispatch, goto, setChoice, setMenu, isSuccess])
    return (
        <>
            {/* new user dialog */}
            <NewUserDialog />
            <Menu
                anchorEl={menu.anchorEl}
                open={Boolean(menu.type === MenuActions.user_menu)}
                onClose={() => setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })}
            >
                <MenuItem
                    onClick={() => {
                        setChoice({ type: ChoiceActions.update_profile })
                        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                    }
                    }
                >View Profile</MenuItem>
                {user?.roles?.includes("owner") ?
                    <MenuItem onClick={() => {
                        setChoice({ type: ChoiceActions.new_user })
                        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })

                    }
                    }>New User</MenuItem>
                    :
                    null
                }
                <MenuItem onClick={() => {
                    setChoice({ type: ChoiceActions.update_password })
                    setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                }}>
                    Update Password
                </MenuItem>
                {
                    !user?.email_verified ?

                        <MenuItem onClick={() => {
                            setChoice({ type: ChoiceActions.verify_email })
                            setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                        }}>
                            Verify Email
                        </MenuItem>
                        : null
                }
                <MenuItem>
                    <Button fullWidth color="error" variant="outlined"
                        onClick={
                            () => {
                                mutate()
                                setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                            }
                        }
                    >
                        Logout
                    </Button>
                </MenuItem>
            </Menu>
            <EmailVerifySendMailDialog />
            <UpdateProfileDialog />
            <UpdatePasswordDialog />
        </>
    )
}

export default UserMenu