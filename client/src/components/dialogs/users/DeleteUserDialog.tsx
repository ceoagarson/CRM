import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography, Stack } from '@mui/material'
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { DeleteUser } from '../../../services/UserServices';


function DeleteUserDialog({ id }: { id: string }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate } = useMutation(DeleteUser)
    return (
        <>
            <Dialog open={choice === ChoiceActions.delete_user ? true : false}
                onClose={() => setChoice({ type: ChoiceActions.close })}
            >
                <DialogTitle textAlign="center">
                    <Typography variant="h6" component="h1">
                        Remove User Account
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" color="error">
                        Warning ! This is a Danger Permanent Action
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Stack
                        gap={2}
                        padding={2}
                        width="100%"
                    >
                        <Button fullWidth variant="outlined" color="error" onClick={() => {
                            setChoice({ type: ChoiceActions.delete_user })
                            mutate(id)
                        }} >Delete</Button>
                        <Button fullWidth variant="contained" color="warning" onClick={() => setChoice({ type: ChoiceActions.close })}>Cancel</Button>
                    </Stack >
                </DialogActions>
            </Dialog >
        </>
    )
}

export default DeleteUserDialog
