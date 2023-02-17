import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack, CircularProgress } from '@mui/material'
import { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from '../../..';
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { DeleteUser } from '../../../services/UserServices';
import { BackendError } from '../../../types';
import AlertBar from '../../alert/Alert';


function DeleteUserDialog({ id }: { id: string }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isSuccess, isLoading, isError, error } = useMutation
        <AxiosResponse<any>, BackendError, string>
        (DeleteUser,
            {
                onSuccess: () => {
                    queryClient.invalidateQueries('users')

                }
            }
        )
    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                setChoice({ type: ChoiceActions.close })
            }, 1000)
    }, [setChoice, isSuccess])
    return (
        <>
            <Dialog open={choice === ChoiceActions.delete_user ? true : false}
                onClose={() => setChoice({ type: ChoiceActions.close })}
            >
                <AlertBar color="error" open={isError} message={error?.response.data.message} />
                <AlertBar color="success" open={isSuccess} message="user deleted successfully" />
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
                <Stack
                    direction="column"
                    gap={2}
                    padding={2}
                    width="100%"
                >
                    <Button >Delete</Button>

                    <Button fullWidth variant="outlined" color="error"
                        onClick={() => {
                            setChoice({ type: ChoiceActions.delete_user })
                            mutate(id)
                        }}
                        disabled={Boolean(isLoading)}

                    >{Boolean(isLoading) ? <CircularProgress /> : "Delete"}</Button>
                    <Button fullWidth variant="contained"
                        disabled={Boolean(isLoading)}
                        color="warning" onClick={() => setChoice({ type: ChoiceActions.close })}>Cancel</Button>
                </Stack >
            </Dialog >
        </>
    )
}

export default DeleteUserDialog
