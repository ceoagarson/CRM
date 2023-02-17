import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography } from '@mui/material'
import { useContext } from 'react';
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import LoginForm from '../../forms/user/LoginForm';
import UpdatePasswordForm from '../../forms/user/UpdatePasswordForm';


function UpdatePasswordDialog() {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog open={choice === ChoiceActions.update_password ? true : false}
                onClose={() => setChoice({ type: ChoiceActions.close })}
            >
                <DialogTitle textAlign="center">Update Password</DialogTitle>
                <DialogContent>
                    <UpdatePasswordForm />
                </DialogContent>
                <Button onClick={() => setChoice({ type: ChoiceActions.close })}>Cancel</Button>
            </Dialog >
        </>
    )
}

export default UpdatePasswordDialog
