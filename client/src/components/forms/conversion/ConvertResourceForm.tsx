import { Alert, Button, CircularProgress, TextField } from '@mui/material'
import { AxiosResponse } from 'axios'
import { useFormik } from 'formik'
import * as Yup from "yup"
import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import { queryClient } from '../../..'
import { ChoiceContext, ConversionChoiceActions } from '../../../contexts/dialogContext'
import { Resource_Type } from '../../../services/ActivityServices'
import { ConvertResource } from '../../../services/ConversionServices'
import { BackendError } from '../../../types'
import { Stack } from '@mui/system'

export default function ConvertResourceForm({ id, resource_type }: { id: string, resource_type: Resource_Type }) {
    const { setChoice } = useContext(ChoiceContext)
    const { mutate, isLoading, isSuccess, error, isError } = useMutation
        <AxiosResponse<any>, BackendError, { id: string, body: { resource_type: Resource_Type, target_resource_type: Resource_Type } }>
        (ConvertResource,
            {
                onSuccess: () => {
                    queryClient.invalidateQueries("leads")
                    queryClient.invalidateQueries("accounts")
                    queryClient.invalidateQueries("activities")
                    queryClient.invalidateQueries("opportunities")
                }
            }
        )
    const formik = useFormik<{ target_resource_type: Resource_Type }>({
        initialValues: {
            target_resource_type: ''
        },
        validationSchema: Yup.object({
            target_resource_type: Yup.string()
                .required('Required field')
        }),
        onSubmit: (values) => {
            mutate({
                id: id,
                body: {
                    resource_type: resource_type,
                    target_resource_type: values.target_resource_type
                }
            })
        },
    });
    useEffect(() => {
        if (isSuccess)
            setTimeout(() => {
                setChoice({ type: ConversionChoiceActions.close })
            }, 1000)
    }, [setChoice, isSuccess])
    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack gap={2} >
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
                            Resource Converted successfully
                        </Alert>
                    ) : null
                }
                <TextField
                    select
                    SelectProps={{
                        native: true
                    }}
                    focused
                    required
                    error={
                        formik.touched.target_resource_type && formik.errors.target_resource_type ? true : false
                    }
                    id="target_resource_type"
                    label="target_resource_type"
                    fullWidth
                    helperText={
                        formik.touched.target_resource_type && formik.errors.target_resource_type ? formik.errors.target_resource_type : ""
                    }
                    {...formik.getFieldProps('target_resource_type')}
                >
                    <option value="">
                        Select
                    </option>
                    {resource_type === "lead" ? null :
                        <option value="lead">
                            lead
                        </option>
                    }
                    {resource_type === "account" ? null :
                        <option value="account">
                            account
                        </option>
                    }
                    {resource_type === "opportunity" ? null :
                        <option value="opportunity">
                            opportunity
                        </option>
                    }
                </TextField>
                <Button variant="outlined" color="error" type="submit"
                    disabled={Boolean(isLoading)}
                    fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Convert"}
                </Button>
            </Stack>
        </form>
    )
}
