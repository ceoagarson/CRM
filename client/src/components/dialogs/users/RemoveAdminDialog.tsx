import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack, CircularProgress, Alert } from '@mui/material'
import { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { RemoveAdmin } from '../../../services/UserServices';
import { BackendError } from '../../../types';
import { queryClient } from '../../../main';

function RemoveAdminDialog({ id }: { id: string }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error, isError } = useMutation
        <AxiosResponse<any>, BackendError, string>
        (RemoveAdmin,{
            onSuccess: () => {
                queryClient.invalidateQueries('users')
            }
        })

    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                setChoice({ type: UserChoiceActions.close_user })
            }, 1000)
    }, [setChoice, isSuccess])

    return (
        <Dialog open={choice === UserChoiceActions.remove_admin ? true : false}
            onClose={() => setChoice({ type: UserChoiceActions.close_user })}
        >
            <DialogTitle textAlign="center">
                Revoke Permissions
            </DialogTitle>
            <DialogContent>
                {
                    isError ? (
                        <Alert color="error" >
                            {error?.response.data.message}
                        </Alert>
                    ) : null
                }
                {
                    isSuccess ? (
                        <Alert color="success">
                            all permissions revoked
                        </Alert>
                    ) : null
                }
                <Typography variant="body1">
                    Warning ! This is a dangerous  Action, Be careful
                </Typography>
            </DialogContent>

            <Stack
                direction="column"
                gap={2}
                padding={2}
                width="100%"
            >
                <Button fullWidth variant="outlined" color="error"
                    onClick={() => {
                        setChoice({ type: UserChoiceActions.remove_admin })
                        mutate(id)
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress /> :
                        "Remove Admin"}
                </Button>
                <Button fullWidth variant="contained"
                    disabled={isLoading}
                    color="warning" onClick={() => setChoice({ type: UserChoiceActions.close_user })}>Cancel</Button>
            </Stack >
        </Dialog >
    )
}

export default RemoveAdminDialog
