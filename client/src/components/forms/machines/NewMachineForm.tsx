import { Alert, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { queryClient } from '../../..';
import { BackendError } from '../../../types';
import { ChoiceContext,  ProductionChoiceActions } from '../../../contexts/dialogContext';
import { NewMachine } from '../../../services/MachineServices';


function NewMachineForm() {
    const { mutate, isLoading, isSuccess, isError, error } = useMutation
        <AxiosResponse<string>, BackendError, {
            machine: string,
            category: string }>
        (NewMachine, {
            onSuccess: () => queryClient.invalidateQueries('machines')
        })

    const { setChoice } = useContext(ChoiceContext)

    const formik = useFormik<{
        machine: string,
        category:string
    }>({
        initialValues: {
            machine: "",
            category:"A"
        },
        validationSchema: Yup.object({
            machine: Yup.string().required("required field"),
            category:Yup.string().required()
        }),
        onSubmit: (values: {
            machine: string,
            category: string
        }) => {
            mutate({machine:values.machine,category:values.category})
        }
    });

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setChoice({ type: ProductionChoiceActions.close })
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
                    required
                    autoFocus
                    error={
                        formik.touched.machine && formik.errors.machine ? true : false
                    }
                    id="machine"
                    label="Machine"
                    fullWidth
                    helperText={
                        formik.touched.machine && formik.errors.machine ? formik.errors.machine : ""
                    }
                    {...formik.getFieldProps('machine')}
                />
                < TextField
                    variant='standard'
                    select
                    SelectProps={{
                        native: true
                    }}
                    focused
                    required
                    error={
                        formik.touched.category && formik.errors.category ? true : false
                    }
                    id="category"
                    label="Category"
                    fullWidth
                    helperText={
                        formik.touched.category && formik.errors.category ? formik.errors.category : ""
                    }
                    {...formik.getFieldProps('category')}
                >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </TextField>
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
                        new Machine added
                    </Alert>
                ) : null
            }
            <Button variant="contained" color="primary" type="submit"
                disabled={Boolean(isLoading)}
                fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Add Machine"}
            </Button>
        </form>
    )
}

export default NewMachineForm
