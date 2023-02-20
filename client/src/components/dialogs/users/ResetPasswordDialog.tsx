import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material'
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import ResetPasswordForm from '../../forms/user/ResetPasswordForm';

function ResetPasswordDialog() {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { token } = useParams()
    return (
        <>
            <Dialog
                open={choice === UserChoiceActions.reset_password || token ? true : false}
                onClose={() => setChoice({ type: UserChoiceActions.close })}
            >
                <DialogTitle textAlign="center">Reset Password</DialogTitle>
                <DialogContent>
                    <ResetPasswordForm token={token || ""} />
                </DialogContent>
                <Button onClick={() => setChoice({ type: UserChoiceActions.close })}>Cancel</Button>
            </Dialog >
        </>
    )
}

export default ResetPasswordDialog
