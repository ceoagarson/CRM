import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack, CircularProgress, Alert } from '@mui/material'
import { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from '../../..';
import { ActivityChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { ToogleActivityStatus } from '../../../services/ActivityServices';
import { BackendError } from '../../../types';
import { IActivity } from '../../../types/activity.type';

function ToogleActivityStatusDialog({ activity }: { activity: IActivity }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error, isError } = useMutation
        <AxiosResponse<any>, BackendError, string>
        (ToogleActivityStatus,
            {
                onSuccess: () => {
                    queryClient.invalidateQueries('activities')
                }
            }
        )

    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                setChoice({ type: ActivityChoiceActions.close })
            }, 1000)
    }, [setChoice, isSuccess])

    return (
        <Dialog open={choice === ActivityChoiceActions.open_close_activity ? true : false}
            onClose={() => setChoice({ type: ActivityChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
            {activity.status ? "Close Activity" : "Open Activity"}
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
                       
                        mutate(activity._id)
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress /> :
                        null}
                    {activity.status ? "Close" : "Open"}
                </Button>
                <Button fullWidth variant="contained"
                    disabled={isLoading}
                    onClick={() => setChoice({ type: ActivityChoiceActions.close })}>Cancel</Button>
            </Stack >
        </Dialog >
    )
}

export default ToogleActivityStatusDialog
