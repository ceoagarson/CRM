import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack, CircularProgress, Alert } from '@mui/material'
import { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from '../../..';
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { UnBlockUser } from '../../../services/UserServices';
import { BackendError } from '../../../types';

function UnBlockUserDialog({ id }: { id: string }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error, isError } = useMutation
        <AxiosResponse<any>, BackendError, string>
        (UnBlockUser,
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
        <Dialog open={choice === ChoiceActions.unblock_user ? true : false}
            onClose={() => setChoice({ type: ChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
                Activate User
            </DialogTitle>
            <DialogContent>
                {
                    isError ? (
                        <Alert color="error">
                            {error?.response.data.message}
                        </Alert>
                    ) : null
                }
                {
                    isSuccess ? (
                        <Alert color="success">
                            user activated successfully
                        </Alert>
                    ) : null
                }
                <Typography variant="body1" >
                    Warning ! This will unblock user and make him able to login in to the site, Be careful
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
                        setChoice({ type: ChoiceActions.unblock_user })
                        mutate(id)
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress /> :
                        "Activate"}
                </Button>
                <Button fullWidth variant="contained"
                    disabled={isLoading}
                    color="warning" onClick={() => setChoice({ type: ChoiceActions.close })}>Cancel</Button>
            </Stack >
        </Dialog >
    )
}

export default UnBlockUserDialog
