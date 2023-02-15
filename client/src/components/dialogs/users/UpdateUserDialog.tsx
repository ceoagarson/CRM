import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography } from '@mui/material'
import { useState } from 'react'
import UpdateUserForm from '../../forms/user/UpdateUserForm'

function UpdateUserDialog() {
  const [open,setOpen]=useState(true)
  return (
    <Dialog open={open}
            onClose={()=>setOpen(false)}
        >
            <DialogTitle textAlign="center">Update Password Form</DialogTitle>
            <DialogContent>
                <UpdateUserForm />
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

export default UpdateUserDialog