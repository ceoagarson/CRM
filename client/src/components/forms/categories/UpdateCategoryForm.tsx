import { Alert, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { queryClient } from '../../..';
import { BackendError } from '../../../types';
import { ChoiceContext, ProductionChoiceActions } from '../../../contexts/dialogContext';
import { ICategory } from '../../../types/production.type';
import { UpdateCategory } from '../../../services/ProductionServices';


function UpdateCategoryForm({ category }: { category: ICategory }) {
    const { mutate, isLoading, isSuccess, isError, error } = useMutation
        <AxiosResponse<string>, BackendError, {
            id: string,
            body: {
                category: string
            }
        }>
        (UpdateCategory, {
            onSuccess: () => queryClient.invalidateQueries('categories')
        })

    const { setChoice } = useContext(ChoiceContext)

    const formik = useFormik<{
        category: string
    }>({
        initialValues: {
            category: category.category.toUpperCase()
        },
        validationSchema: Yup.object({
            category: Yup.string().required()
        }),
        onSubmit: (values: {
            category: string
        }) => {
            mutate({
                id: category._id,
                body: {
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

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack
                gap={2}
                py={2}
            >
               
                < TextField
                    variant='standard'
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
                        Category updated
                    </Alert>
                ) : null
            }
            <Button variant="contained" color="primary" type="submit"
                disabled={Boolean(isLoading)}
                fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Update Category"}
            </Button>
        </form>
    )
}

export default UpdateCategoryForm
