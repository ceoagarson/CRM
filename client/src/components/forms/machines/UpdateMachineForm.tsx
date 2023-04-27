import { Alert, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext, useState } from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { queryClient } from '../../..';
import { BackendError } from '../../../types';
import { ChoiceContext, ProductionChoiceActions } from '../../../contexts/dialogContext';
import { UpdateMachine } from '../../../services/MachineServices';
import { ICategory, IMachine } from '../../../types/production.type';


function UpdateMachineForm({ machine,data }: { machine: IMachine,data:ICategory[] }) {
    const [categories, setCategories] = useState(data)
    const { mutate, isLoading, isSuccess, isError, error } = useMutation
        <AxiosResponse<string>, BackendError, {
            id: string,
            body: {
                name: string,
                category: string
            }
        }>
        (UpdateMachine, {
            onSuccess: () => queryClient.invalidateQueries('machines')
        })

    const { setChoice } = useContext(ChoiceContext)

    const formik = useFormik<{
        name: string,
        category: string
    }>({
        initialValues: {
            name: machine.name.toUpperCase(),
            category: machine.category.category
        },
        validationSchema: Yup.object({
            name: Yup.string().required("required field"),
            category: Yup.string().required()
        }),
        onSubmit: (values: {
            name: string,
            category: string
        }) => {
            mutate({
                id: machine._id,
                body: {
                    name: values.name,
                    category: values.category
                }
            })
        }
    });

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                setChoice({ type: ProductionChoiceActions.close })
            }, 1000)
        }
    }, [isSuccess, setChoice])

    useEffect(() => {
        setCategories(data)
    }, [data])

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
                        formik.touched.name && formik.errors.name ? true : false
                    }
                    id="name"
                    label="Machine"
                    fullWidth
                    helperText={
                        formik.touched.name && formik.errors.name ? formik.errors.name : ""
                    }
                    {...formik.getFieldProps('name')}
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
                    {
                        categories.map((category, index) => {
                            return <option value={category.category}>{category.category.toUpperCase()}</option>
                        })
                    }
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
                        Machine updated
                    </Alert>
                ) : null
            }
            <Button variant="contained" color="primary" type="submit"
                disabled={Boolean(isLoading)}
                fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Update Machine"}
            </Button>
        </form>
    )
}

export default UpdateMachineForm
