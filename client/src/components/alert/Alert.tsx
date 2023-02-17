import { Alert, Snackbar } from '@mui/material'
import React from 'react'

type Props = {
    color?: "error" | "info" | "success" | "warning",
    message: string | undefined
    open: boolean
}
function AlertBar({
    color, message, open
}: Props) {
    return (
        <Snackbar open={open}>
            <Alert
                severity={color || "error"}
                variant="filled"
            >
                {message}
            </Alert>
        </Snackbar>)
}

export default AlertBar