import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack, CircularProgress, Alert } from '@mui/material'
import { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from '../../..';
import { AccountChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { ToogleAccountStatus } from '../../../services/AccountServices';
import { BackendError } from '../../../types';
import { IAccount } from '../../../types/account.type';

function ToogleAccountStatusDialog({ account }: { account: IAccount }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error, isError } = useMutation
        <AxiosResponse<any>, BackendError, string>
        (ToogleAccountStatus,
            {
                onSuccess: () => {
                    queryClient.invalidateQueries('accounts')
                }
            }
        )

    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                setChoice({ type: AccountChoiceActions.close })
            }, 1000)
    }, [setChoice, isSuccess])

    return (
        <Dialog open={choice === AccountChoiceActions.open_close_account ? true : false}
            onClose={() => setChoice({ type: AccountChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
            {account.status ? "Close Account" : "Open Account"}
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
                       Updated successfully
                    </Alert>
                ) : null
            }
            <DialogContent>
                <Typography variant="body1" color="error">
                    Warning ! This will dangerous action.
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
                        setChoice({ type: AccountChoiceActions.open_close_account })
                        mutate(account._id)
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress /> :
                        null}
                    {account.status ? "Close" : "Open"}
                </Button>
                <Button fullWidth variant="contained"
                    disabled={isLoading}
                    onClick={() => setChoice({ type: AccountChoiceActions.close })}>Cancel</Button>
            </Stack >
        </Dialog >
    )
}

export default ToogleAccountStatusDialog
