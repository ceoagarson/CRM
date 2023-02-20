import { Alert, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { UpdateProfile } from '../../../services/UserServices';
import { BackendError, Target } from '../../../types';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { useContext, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { queryClient } from '../../..';
import { IUser } from '../../../contexts/userContext';


type TformData = {
  email: string,
  dp: string | Blob | File
}

function UpdateProfileForm({ user }: { user: IUser }) {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation
    <AxiosResponse<IUser>, BackendError, FormData>
    (UpdateProfile, {
      onSuccess: () => queryClient.invalidateQueries('profile')
    })
  const { setChoice } = useContext(ChoiceContext)

  const formik = useFormik<TformData>({
    initialValues: {
      email: user.email || "",
      dp: user.dp?.url || ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('provide a valid email id')
        .required('Required field'),
      dp: Yup.mixed<File>()
        .test("size", "size is allowed only less than 200kb",
          file => {
            if (file)
              if (!file.size) //file not provided
                return true
              else
                return Boolean(file.size <= 1024 * 200)
            return true
          }
        )
        .test("type", " allowed only .jpg, .jpeg, .png, .gif images",
          file => {
            const Allowed = ["image/png", "image/jpg", "image/jpeg", "image/png", "image/gif"]
            if (file)
              if (!file.size) //file not provided
                return true
              else
                return Boolean(Allowed.includes(file.type))
            return true
          }
        )
    }),
    onSubmit: (values: TformData) => {
      let formdata = new FormData()
      formdata.append("email", values.email)
      formdata.append("dp", values.dp)
      mutate(formdata)
    }
  });
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setChoice({ type: UserChoiceActions.close })
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
            profile updated successfully
          </Alert>
        ) : null
      }
      <Stack
        direction="column"
        gap={2}>
        <TextField
          variant='standard'
          focused
          required
          fullWidth
          error={
            formik.touched.email && formik.errors.email ? true : false
          }
          id="email"
          label="Email"
          helperText={
            formik.touched.email && formik.errors.email ? formik.errors.email : ""
          }
          {...formik.getFieldProps('email')}
        />
        <TextField
          fullWidth
          error={
            formik.touched.dp && formik.errors.dp ? true : false
          }
          helperText={
            formik.touched.dp && formik.errors.dp ? String(formik.errors.dp) : ""
          }
          label="Display Picture"
          focused
          variant='standard'
          type="file"
          name="dp"
          onBlur={formik.handleBlur}
          onChange={(e) => {
            e.preventDefault()
            const target: Target = e.currentTarget
            let files = target.files
            if (files) {
              let file = files[0]
              formik.setFieldValue("dp", file)
            }
          }}
        />
        <Button variant="contained" color="primary" type="submit"
          disabled={Boolean(isLoading)}
          fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Update"}</Button>
      </Stack>
    </form>
  )
}

export default UpdateProfileForm
