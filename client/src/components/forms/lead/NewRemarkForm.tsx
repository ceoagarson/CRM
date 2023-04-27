import { Alert, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { queryClient } from '../../..';
import { BackendError } from '../../../types';
import { NewRemark } from '../../../services/LeadsServices';
import { ILead } from '../../../types/lead.type';
import { ChoiceContext, LeadChoiceActions } from '../../../contexts/dialogContext';


function NewRemarkForm({ lead }: { lead: ILead }) {
    const { mutate, isLoading, isSuccess, isError, error } = useMutation
        <AxiosResponse<string>, BackendError, { id: string, remark: string }>
        (NewRemark, {
            onSuccess: () => queryClient.invalidateQueries('leads')
        })

    const { setChoice } = useContext(ChoiceContext)

    const formik = useFormik<{
        remark: string
    }>({
        initialValues: {
            remark: ""
        },
        validationSchema: Yup.object({
            remark: Yup.string().required("required field")
                .min(20, 'Must be 20 characters or more')
                .max(200, 'Must be 200 characters or less')
                .required('Required field')
        }),
        onSubmit: (values: {
            remark: string
        }) => {
            mutate({
                id: lead._id,
                remark: values.remark
            })
        }
    });

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setChoice({ type: LeadChoiceActions.close })
            }, 1000)
        }
    }, [isSuccess, setChoice])

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack
                gap={2}
                py={2}
            >
                {/* remarks */}
                <TextField
                    variant='standard'
                    multiline
                    minRows={4}
                    required
                    error={
                        formik.touched.remark && formik.errors.remark ? true : false
                    }
                    id="remark"
                    label="Remark"
                    fullWidth
                    helperText={
                        formik.touched.remark && formik.errors.remark ? formik.errors.remark : ""
                    }
                    {...formik.getFieldProps('remark')}
                />
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
                        new remark added
                    </Alert>
                ) : null
            }
            <Button variant="contained" color="primary" type="submit"
                disabled={Boolean(isLoading)}
                fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Add Remark"}
            </Button>
        </form>
    )
}

export default NewRemarkForm
