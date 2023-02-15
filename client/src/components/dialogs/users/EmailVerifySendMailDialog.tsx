import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useState } from 'react'
import EmailVerifySendMailDialogForm from '../../forms/user/EmailVerifySendMailDialogForm'


function EmailVerifySendMailDialog() {
    const [open, setOpen] = useState(true)
    return (
        <Dialog open={open}
            onClose={() => setOpen(false)}
            scroll="paper"
        >
            <DialogTitle textAlign="center">Update Password Form</DialogTitle>
            <DialogContent>
                <EmailVerifySendMailDialogForm />
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

export default EmailVerifySendMailDialog