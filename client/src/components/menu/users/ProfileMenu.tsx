import { Button, Menu, MenuItem } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { MenuActions, MenuContext } from '../../../contexts/menuContext';
import { ChoiceContext, UserChoiceActions } from '../../../contexts/dialogContext';
import { paths } from '../../../Routes';
import NewUserDialog from '../../dialogs/users/NewUserDialog';
import EmailVerifySendMailDialog from '../../dialogs/users/EmailVerifySendMailDialog';
import UpdateProfileDialog from '../../dialogs/users/UpdateProfileDialog';
import UpdatePasswordDialog from '../../dialogs/users/UpdatePasswordDialog';
import { Logout } from '../../../services/UserServices';
import { UserContext } from '../../../contexts/userContext';


function ProfileMenu() {
    const { menu, setMenu } = useContext(MenuContext)
    const { user, setUser } = useContext(UserContext)
    const { setChoice } = useContext(ChoiceContext)
    const { mutate, isSuccess } = useMutation(Logout)
    const goto = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            setUser(undefined)
            setChoice({ type: UserChoiceActions.close_user })
            setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
            goto(paths.login)
        }
    }, [setUser, goto, setChoice, setMenu, isSuccess])
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
                        setChoice({ type: UserChoiceActions.update_profile })
                        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                    }
                    }
                >View Profile</MenuItem>
                {user?.created_by._id === user?._id
                    ?

                    <MenuItem onClick={() => {
                        setChoice({ type: UserChoiceActions.update_password })
                        setMenu({ type: MenuActions.close, payload: { type: null, anchorEl: null } })
                    }}>
                        Update Password
                    </MenuItem>
                    : null
                }
                {
                    !user?.email_verified ?

                        <MenuItem onClick={() => {
                            setChoice({ type: UserChoiceActions.verify_email })
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

export default ProfileMenu