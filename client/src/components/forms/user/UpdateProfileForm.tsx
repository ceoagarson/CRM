import { Alert, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { UpdateProfile } from '../../../services/UserServices';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { useContext, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { IUser } from '../../../types/models/user.type';
import { BackendError, Target } from '../../../types';


type TformData = {
  email: string,
  mobile: string,
  dp: string | Blob | File
}

function UpdateProfileForm({ user }: { user: IUser }) {
  const { mutate, isLoading, isSuccess, isError, error } = useMutation
    <AxiosResponse<IUser>, BackendError, FormData>
    (UpdateProfile)
  const { setChoice } = useContext(ChoiceContext)

  const formik = useFormik<TformData>({
    initialValues: {
      email: user.email,
      mobile: String(user.mobile),
      dp: user.dp?.url
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required('Required field')
        .min(10, 'Must be 10 digits')
        .max(10, 'Must be 10 digits'),
      email: Yup.string()
        .email('provide a valid email id')
        .required('Required field')
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
      formdata.append("mobile", values.mobile)
      formdata.append("dp", values.dp)
      mutate(formdata)
    }
  });
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setChoice({ type: UserChoiceActions.close_user })
      }, 1000)
    }
  }, [isSuccess, setChoice])

  return (
    <form onSubmit={formik.handleSubmit}>

      <Stack
        direction="column"
        gap={2}>
        <TextField
          variant='standard'
          
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
          variant='standard'
          type="number"
          required
          fullWidth
          error={
            formik.touched.mobile && formik.errors.mobile ? true : false
          }
          id="mobile"
          label="Mobile"
          helperText={
            formik.touched.mobile && formik.errors.mobile ? formik.errors.mobile : ""
          }
          {...formik.getFieldProps('mobile')}
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
              profile updated 
            </Alert>
          ) : null
        }
        <Button variant="contained" color="primary" type="submit"
          disabled={Boolean(isLoading)}
          fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Update"}</Button>
      </Stack>
    </form>
  )
}

export default UpdateProfileForm
