import { Alert, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { queryClient } from '../../..';
import { ActivityChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { NewActivity } from '../../../services/ActivityServices';
import { BackendError } from '../../../types';
import { ILead } from '../../../types/lead.type';


function NewActivityForm({ id }: { id: string }) {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation
    <AxiosResponse<ILead>, BackendError, {
      id: string, body: {
        type: string,
        description: string,
        remarks: string,
        resource_type: string
      }
    }>
    (NewActivity, {
      onSuccess: () => queryClient.invalidateQueries('leads')
    })

  const { setChoice } = useContext(ChoiceContext)

  const formik = useFormik<{
    type: string,
    description: string,
    remarks: string,
    resource_type: string
  }>({
    initialValues: {
      type: "",
      description: "",
      remarks: "",
      resource_type: ""
    },
    validationSchema: Yup.object({
      type: Yup.string()
        .required('Required field'),
      resource_type: Yup.string().required("required field"),
      description: Yup.string().required("required field")
        .min(20, 'Must be 20 characters or more')
        .max(1000, 'Must be 1000 characters or less'),
      remarks: Yup.string()
        .min(10, 'Must be 10 characters or more')
        .max(500, 'Must be 500 characters or less')
    }),
    onSubmit: (values: {
      type: string,
      description: string,
      remarks: string,
      resource_type: string
    }) => {
      mutate({ id: id, body: values })
    }
  });


  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setChoice({ type: ActivityChoiceActions.close })
      }, 1000)
    }
  }, [isSuccess, setChoice])

  return (
    <form onSubmit={formik.handleSubmit}>
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
            new actiivity created successfully
          </Alert>
        ) : null
      }
      <Stack
        gap={2}
        py={2}
      >
        {/* type */}
        <TextField
          variant='standard'
          select
          SelectProps={{
            native: true
          }}
          focused
          required
          error={
            formik.touched.type && formik.errors.type ? true : false
          }
          id="type"
          label="type"
          fullWidth
          helperText={
            formik.touched.type && formik.errors.type ? formik.errors.type : ""
          }
          {...formik.getFieldProps('type')}
        >
          <option value="">
            <Typography p={2} variant="body2">Select</Typography>
          </option>
          <option value="telephonic">
            <Typography p={2} variant="body2">telephonic</Typography>
          </option><option value="visited">
            <Typography p={2} variant="body2">visited</Typography>
          </option>
        </TextField>
        {/* resource_type */}
        <TextField
          variant='standard'
          select
          SelectProps={{
            native: true
          }}
          focused
          required
          error={
            formik.touched.resource_type && formik.errors.resource_type ? true : false
          }
          id="resource_type"
          label="resource_type"
          fullWidth
          helperText={
            formik.touched.resource_type && formik.errors.resource_type ? formik.errors.resource_type : ""
          }
          {...formik.getFieldProps('resource_type')}
        >
          <option value="">
            <Typography p={2} variant="body2">Select</Typography>
          </option>
          <option value="lead">
            <Typography p={2} variant="body2">lead</Typography>
          </option><option value="account">
            <Typography p={2} variant="body2">account</Typography>
          </option>
          <option value="opportunity">
            <Typography p={2} variant="body2">opportunity</Typography>
          </option>
        </TextField>

        {/* description */}
        <TextField
          variant='standard'
          multiline
          minRows={2}
          required
          focused
          error={
            formik.touched.description && formik.errors.description ? true : false
          }
          id="description"
          label="description"
          fullWidth
          helperText={
            formik.touched.description && formik.errors.description ? formik.errors.description : ""
          }
          type="number"
          {...formik.getFieldProps('description')}
        />
        {/* remarks */}
        <TextField
          variant='standard'
          multiline
          minRows={2}
          focused
          error={
            formik.touched.remarks && formik.errors.remarks ? true : false
          }
          id="remarks"
          label="remarks"
          fullWidth
          helperText={
            formik.touched.remarks && formik.errors.remarks ? formik.errors.remarks : ""
          }
          type="number"
          {...formik.getFieldProps('remarks')}
        />
      </Stack>
      <Button variant="contained" color="primary" type="submit"
        disabled={Boolean(isLoading)}
        fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Create"}
      </Button>
    </form>
  )
}

export default NewActivityForm
