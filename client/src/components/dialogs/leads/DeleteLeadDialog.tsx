import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack, CircularProgress, Alert } from '@mui/material'
import { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { DeleteLead } from '../../../services/LeadsServices';
import { ILead } from '../../../types/leads/lead.type';
import { BackendError } from '../../../types';
import { queryClient } from '../../../main';


function DeleteLeadDialog({ lead }: { lead: ILead }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error, isError } = useMutation
        <AxiosResponse<any>, BackendError, { id: string }>
        (DeleteLead, {
            onSuccess: () => {
                queryClient.invalidateQueries('customers')
                queryClient.invalidateQueries('leads')
            }
        })

    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                setChoice({ type: LeadChoiceActions.close_lead })
            }, 1000)
    }, [setChoice, isSuccess])

    return (
        <Dialog open={choice === LeadChoiceActions.delete_lead ? true : false}
            onClose={() => setChoice({ type: LeadChoiceActions.close_lead })}
        >
            <DialogTitle textAlign="center">
                Delete Lead
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
                        lead deleted
                    </Alert>
                ) : null
            }
            <DialogContent>
                <Typography variant="body1" color="error">
                    {`Warning ! This will delete selected lead permanently and associated remarks to it. ${lead.mobile}`}

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
                        setChoice({ type: LeadChoiceActions.delete_lead })
                        mutate({ id: lead._id })
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress /> :
                        "Delete"}
                </Button>
                <Button fullWidth variant="contained"
                    disabled={isLoading}
                    onClick={() => setChoice({ type: LeadChoiceActions.close_lead })}>Cancel</Button>
            </Stack >
        </Dialog >
    )
}

export default DeleteLeadDialog
