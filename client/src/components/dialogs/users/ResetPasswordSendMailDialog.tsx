import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useContext} from 'react'
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import ResetPasswordSendMailForm from '../../forms/user/ResetPasswordSendMailForm'

function ResetPasswordSendMailDialog() {
    const { choice, setChoice } = useContext(ChoiceContext)

    return (
        <Dialog open={choice === UserChoiceActions.reset_password_mail ? true : false}
            onClose={() => setChoice({ type: UserChoiceActions.close })}
        >
            <DialogTitle textAlign="center">Reset Password  </DialogTitle>
            <DialogContent>
                <ResetPasswordSendMailForm />
            </DialogContent>
            <DialogActions>
                <Typography
                    variant="button"
                    component="p"
                    sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                </Typography >
            </DialogActions>
        </Dialog>
    )
}

export default ResetPasswordSendMailDialog