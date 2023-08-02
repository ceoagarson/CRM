import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack, CircularProgress, Alert } from '@mui/material'
import { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { LeadChoiceActions,  ChoiceContext } from '../../../contexts/dialogContext';
import {  PreserveLead } from '../../../services/LeadsServices';
import { ILead } from '../../../types/leads/lead.type';
import { BackendError } from '../../../types';
import { queryClient } from '../../../main';


function PreserveLeadDialog({ lead }: { lead: ILead }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error, isError } = useMutation
        <AxiosResponse<any>, BackendError, {id:string}>
        (PreserveLead,
            {
                onSuccess: () => {
                    queryClient.invalidateQueries('leads')
                }
            }
        )

    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                setChoice({ type: LeadChoiceActions.close })
            }, 1000)
    }, [setChoice, isSuccess])

    return (
        <Dialog open={choice === LeadChoiceActions.preserve_lead ? true : false}
            onClose={() => setChoice({ type: LeadChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
               Preserve Lead
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
                        lead preserved
                    </Alert>
                ) : null
            }
            <DialogContent>
                <Typography variant="body1" color="error">
                   This will Preserve selected lead permanently
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
                        setChoice({ type: LeadChoiceActions.preserve_lead })
                        mutate({id:lead._id})
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress /> :
                        "Preserve"}
                </Button>
                <Button fullWidth variant="contained"
                    disabled={isLoading}
                    onClick={() => setChoice({ type: LeadChoiceActions.close })}>Cancel</Button>
            </Stack >
        </Dialog >
    )
}

export default PreserveLeadDialog
