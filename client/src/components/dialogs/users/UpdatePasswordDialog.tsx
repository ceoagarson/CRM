import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material'
import { useContext } from 'react';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import UpdatePasswordForm from '../../forms/user/UpdatePasswordForm';


function UpdatePasswordDialog() {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog open={choice === UserChoiceActions.update_password ? true : false}
                onClose={() => setChoice({ type: UserChoiceActions.close })}
            >
                <DialogTitle textAlign="center">Update Password</DialogTitle>
                <DialogContent>
                    <UpdatePasswordForm />
                </DialogContent>
                <Button onClick={() => setChoice({ type: UserChoiceActions.close })}>Cancel</Button>
            </Dialog >
        </>
    )
}

export default UpdatePasswordDialog
