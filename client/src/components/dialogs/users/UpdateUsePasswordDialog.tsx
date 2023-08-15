import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material'
import { useContext } from 'react';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import UpdateUserPasswordForm from '../../forms/user/UpdateUserPasswordForm';
import { IUser } from '../../../types/users/user.type';


function UpdateUsePasswordDialog({ user }: { user: IUser }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog open={choice === UserChoiceActions.update_user_password ? true : false}
                onClose={() => setChoice({ type: UserChoiceActions.close_user })}
            >
                <DialogTitle textAlign="center">Update Password</DialogTitle>
                <DialogContent>
                    <UpdateUserPasswordForm user={user} />
                </DialogContent>
                <Button onClick={() => setChoice({ type: UserChoiceActions.close_user })}>Cancel</Button>
            </Dialog >
        </>
    )
}

export default UpdateUsePasswordDialog
