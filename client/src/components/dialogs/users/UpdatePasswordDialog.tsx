import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useState } from 'react'
import UpdatePasswordForm from '../../forms/user/UpdatePasswordForm'


function UpdatePasswordDialog() {
    const [open, setOpen] = useState(true)

    return (
        <Dialog open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle textAlign="center">Update Password Form</DialogTitle>
            <DialogContent>
                <UpdatePasswordForm />
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

export default UpdatePasswordDialog