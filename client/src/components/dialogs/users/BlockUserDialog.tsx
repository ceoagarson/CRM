import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack, CircularProgress, Alert } from '@mui/material'
import { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { BlockUser } from '../../../services/UserServices';
import { BackendError } from '../../../types';


function BlockUserDialog({ id }: { id: string }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error, isError } = useMutation
        <AxiosResponse<any>, BackendError, string>
        (BlockUser)

    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                setChoice({ type: UserChoiceActions.close_user })
            }, 1000)
    }, [setChoice, isSuccess])

    return (
        <Dialog open={choice === UserChoiceActions.block_user ? true : false}
            onClose={() => setChoice({ type: UserChoiceActions.close_user })}
        >
            <DialogTitle textAlign="center">
                Block User
            </DialogTitle>
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
                        user blocked
                    </Alert>
                ) : null
            }
            <DialogContent>
                <Typography variant="body1" color="error">
                    Warning ! This will block user.
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
                        setChoice({ type: UserChoiceActions.block_user })
                        mutate(id)
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress /> :
                        "Block"}
                </Button>
                <Button fullWidth variant="contained"
                    disabled={isLoading}
                    onClick={() => setChoice({ type: UserChoiceActions.close_user })}>Cancel</Button>
            </Stack >
        </Dialog >
    )
}

export default BlockUserDialog
