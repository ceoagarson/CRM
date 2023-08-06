import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack, CircularProgress, Alert } from '@mui/material'
import { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { ConvertCustomer } from '../../../services/LeadsServices';
import { ILead } from '../../../types/leads/lead.type';
import { BackendError } from '../../../types';
import { queryClient } from '../../../main';


function ConvertLeadToCustomerDialog({ lead }: { lead: ILead }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error, isError } = useMutation
        <AxiosResponse<any>, BackendError, { id: string }>
        (ConvertCustomer,
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
        <Dialog open={choice === LeadChoiceActions.convert_customer ? true : false}
            onClose={() => setChoice({ type: LeadChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
                Convert To Customer
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
                        converted customer
                    </Alert>
                ) : null
            }
            <DialogContent>
                <Typography variant="body1" color="error">
                    This will make a new customer
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
                        mutate({ id: lead._id })
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress /> :
                        "Make Customer"}
                </Button>
                <Button fullWidth variant="contained"
                    disabled={isLoading}
                    onClick={() => setChoice({ type: LeadChoiceActions.close })}>Cancel</Button>
            </Stack >
        </Dialog >
    )
}

export default ConvertLeadToCustomerDialog
