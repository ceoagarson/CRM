import {  Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useState } from 'react'
import ResetPasswordForm from '../../forms/user/ResetPasswordForm'


function ResetPasswordDialog() {
  const [open,setOpen]=useState(true)

    return (
        <Dialog open={open}
            onClose={()=>setOpen(false)}
        >
            <DialogTitle textAlign="center">Update Password Form</DialogTitle>
            <DialogContent>
                <ResetPasswordForm />
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

export default ResetPasswordDialog