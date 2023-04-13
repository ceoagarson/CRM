import { Dialog, DialogContent, DialogTitle, DialogActions,  Button } from '@mui/material'
import { useContext } from 'react'
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { IUser } from '../../../types/user.type'
import UpdateUserForm from '../../forms/user/UpdateUserForm'

function UpdateUserDialog({ user }: { user: IUser }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === UserChoiceActions.update_user ? true : false}
            onClose={() => setChoice({ type: UserChoiceActions.close })}
        >
            <DialogTitle textAlign="center">Update User Form</DialogTitle>
            <DialogContent>
                {user ?
                    < UpdateUserForm user={user} />
                    : null
                }
            </DialogContent>
            <DialogActions>
                <Button fullWidth onClick={() => setChoice({ type: UserChoiceActions.close })}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateUserDialog