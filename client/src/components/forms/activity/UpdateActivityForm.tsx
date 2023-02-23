import { Alert, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { queryClient } from '../../..';
import { ActivityChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { UpdateActivity } from '../../../services/ActivityServices';
import { BackendError } from '../../../types';
import { IActivity } from '../../../types/activity.type';


function UpdateActivityForm({ activity }: { activity: IActivity }) {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation
    <AxiosResponse<IActivity>, BackendError, {
      id: string, body: {
        activity_type: string,
        description: string,
        remarks: string
      }
    }>
    (UpdateActivity, {
      onSuccess: () => queryClient.invalidateQueries('activities')
    })

  const { setChoice } = useContext(ChoiceContext)

  const formik = useFormik<{
    activity_type: string,
    description: string,
    remarks: string
  }>({
    initialValues: {
      activity_type: activity.activity_type,
      description: activity.description,
      remarks: activity.remarks
    },
    validationSchema: Yup.object({
      activity_type: Yup.string()
        .required('Required field'),
      description: Yup.string().required("required field")
        .min(20, 'Must be 20 characters or more')
        .max(1000, 'Must be 1000 characters or less'),
      remarks: Yup.string()
        .min(10, 'Must be 10 characters or more')
        .max(500, 'Must be 500 characters or less')
    }),
    onSubmit: (values: {
      activity_type: string,
      description: string,
      remarks: string
    }) => {
      mutate({ id: activity._id, body: values })
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
            actiivity updated successfully
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
            formik.touched.activity_type && formik.errors.activity_type ? true : false
          }
          id="activity_type"
          label="activity_type"
          fullWidth
          helperText={
            formik.touched.activity_type && formik.errors.activity_type ? formik.errors.activity_type : ""
          }
          {...formik.getFieldProps('activity_type')}
        >
          <option value="">
            Select
          </option>
          <option value="telephonic">
            telephonic
          </option><option value="visited">
            visited
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
        fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Update"}
      </Button>
    </form>
  )
}

export default UpdateActivityForm
