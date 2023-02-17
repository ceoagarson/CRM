import { Dialog, DialogContent, DialogTitle,  DialogActions, Typography, CircularProgress } from '@mui/material'
import { useContext } from 'react'
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { IUser } from '../../../types/user.type'
import UpdateUserForm from '../../forms/user/UpdateUserForm'

function UpdateUserDialog({ user }: { user: IUser }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === ChoiceActions.update_user ? true : false}
            onClose={() => setChoice({ type: ChoiceActions.close })}
        >
            <DialogTitle textAlign="center">Update User Form</DialogTitle>
            <DialogContent>
                {user ?
                    < UpdateUserForm user={user} />
                    : <CircularProgress size="large" />
                }
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