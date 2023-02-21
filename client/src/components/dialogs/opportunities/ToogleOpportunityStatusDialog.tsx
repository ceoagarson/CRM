import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack, CircularProgress, Alert } from '@mui/material'
import { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from '../../..';
import { OpportunityChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { ToogleOpportunityStatus } from '../../../services/OpportunityServices';
import { BackendError } from '../../../types';
import { IOpportunity } from '../../../types/opportunity.type';

function ToogleOpportunityStatusDialog({ opportunity }: { opportunity: IOpportunity }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error, isError } = useMutation
        <AxiosResponse<any>, BackendError, string>
        (ToogleOpportunityStatus,
            {
                onSuccess: () => {
                    queryClient.invalidateQueries('opportunities')
                }
            }
        )

    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                setChoice({ type: OpportunityChoiceActions.close })
            }, 1000)
    }, [setChoice, isSuccess])

    return (
        <Dialog open={choice === OpportunityChoiceActions.open_close_opportunity ? true : false}
            onClose={() => setChoice({ type: OpportunityChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
            {opportunity.status ? "Close Opportunity" : "Open Opportunity"}
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
                        setChoice({ type: OpportunityChoiceActions.open_close_opportunity })
                        mutate(opportunity._id)
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress /> :
                        null}
                    {opportunity.status ? "Close" : "Open"}
                </Button>
                <Button fullWidth variant="contained"
                    disabled={isLoading}
                    onClick={() => setChoice({ type: OpportunityChoiceActions.close })}>Cancel</Button>
            </Stack >
        </Dialog >
    )
}

export default ToogleOpportunityStatusDialog
