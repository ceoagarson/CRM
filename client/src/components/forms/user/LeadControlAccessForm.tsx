import { AxiosResponse } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { UpdateUserLeadAccess } from '../../../services/UserServices';
import { Button, Checkbox, FormControlLabel, Typography,  CircularProgress, Stack, Alert } from '@mui/material'
import { IUser, LeadField, LeadFieldType } from '../../../types/users/user.type';
import { BackendError } from '../../../types';



function LeadControlAccessForm({ user }: { user: IUser }) {
    const { setChoice } = useContext(ChoiceContext)
    const [LeadFields, setLeadFields] = useState(user.lead_fields)
    const { mutate, isLoading, isSuccess, isError, error } = useMutation
        <AxiosResponse<any>, BackendError, { id: string, leadFields: { lead_fields: LeadField[] } }>
        (UpdateUserLeadAccess)
    function handleHidden(key: LeadFieldType) {
        let newFields = LeadFields
        newFields = LeadFields.map((item) => {
            if (item.field === key) {
                return ({
                    ...item,
                    hidden: !item.hidden
                })
            }
            else {
                return item
            }
        })
        setLeadFields(newFields)
    }
    function handleReadOnly(key: LeadFieldType) {
        let newFields = LeadFields
        newFields = LeadFields.map((item) => {
            if (item.field === key) {
                return ({
                    ...item,
                    readonly: !item.readonly
                })
            }
            else {
                return item
            }
        })
        setLeadFields(newFields)
    }

    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                setChoice({ type: UserChoiceActions.close_user })
            }, 1000)
    }, [setChoice, isSuccess])

    return (
        <>

            <Stack direction={"column"} sx={{ maxWidth: '300px',backgroundColor:'whitesmoke' }} gap={1}>
                <Typography variant={"subtitle1"} sx={{ fontWeight: "bold", textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.1)' }}>Leads Options for Selected User</Typography>

                {
                    LeadFields.map((field, index) => {
                        return (
                            <Stack key={index} direction="column" justifyContent={"left"}>
                                <Typography sx={{ fontSize: 15, fontWeight: 'bold' }}>{field.field.replace("_", " ").toLocaleUpperCase()}</Typography>
                                <FormControlLabel sx={{ fontSize: 12 }} control={<Checkbox size="small" checked={Boolean(field.hidden)} />} onChange={() => {
                                    handleHidden(field.field)
                                }} label="Hidden" />
                                <FormControlLabel sx={{ fontSize: 12 }} control={<Checkbox size="small" checked={Boolean(field.readonly)} />}
                                    onChange={() => {
                                        handleReadOnly(field.field)
                                    }}
                                    label="Read Only"
                                />
                            </Stack>
                        )
                    })
                }
            </Stack>

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
                        Access For selected user updated successfully
                    </Alert>
                ) : null
            }

            <Stack gap={2} p={2} direction={"row"} alignItems={"center"} justifyContent={"center"}>
                <Button size={"small"} variant="contained" color="primary"
                    onClick={() => {
                        mutate({ id: user._id, leadFields: { lead_fields: LeadFields } })
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress /> :
                        "Save"}
                </Button>
                <Button size={"small"} variant="outlined" color="primary"
                    onClick={() => {
                        setChoice({ type: UserChoiceActions.close_user })
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress /> :
                        "Cancel"}
                </Button>
            </Stack>

        </>
    )
}

export default LeadControlAccessForm