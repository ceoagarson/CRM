import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, CircularProgress, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { UserActions, UserContext } from '../../../contexts/userContext';
import { paths } from '../../../Routes';
import { Signup } from '../../../services/UserServices';
import { BackendError, Target } from '../../../types';
import { IUser } from '../../../types/user.type';

type TFormData = {
  organization_name: string
  organization_email: string,
  organization_mobile: string,
  username: string,
  email: string
  password: string
  mobile: string
  dp: string | Blob | File
}

function OwnerSignUpForm() {
  const goto = useNavigate()
  const { dispatch } = useContext(UserContext)
  const { mutate, data, isLoading, isSuccess, isError, error } = useMutation
    <AxiosResponse<{ owner: IUser }>, BackendError, FormData>
    (Signup)
  const { setChoice } = useContext(ChoiceContext)

  const formik = useFormik<TFormData>({
    initialValues: {
      organization_name: "",
      organization_email: "",
      organization_mobile: "",
      username: "",
      email: "",
      password: "",
      mobile: "",
      dp: ""
    },
    validationSchema: Yup.object({
      organization_name: Yup
        .string()
        .required('Required field')
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less'),
      organization_email: Yup.string()
        .email('provide a valid email id')
        .required('Required field'),
      organization_mobile: Yup
        .string()
        .min(10, 'Must be 10 digits')
        .max(10, 'Must be 10 digits ')
        .required('Required field'),
      mobile: Yup
        .string()
        .min(10, 'Must be 10 digits')
        .max(10, 'Must be 10 digits ')
        .required('Required field'),
      username: Yup
        .string()
        .required('Required field')
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less'),
      email: Yup
        .string()
        .email('provide a valid email id')
        .required('Required field'),
      password: Yup
        .string()
        .min(6, 'Must be 6 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required field'),
      dp: Yup
        .mixed<File>()
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
    onSubmit: (values: TFormData) => {
      let formdata = new FormData()
      formdata.append("organization_name", values.organization_name)
      formdata.append("username", values.username)
      formdata.append("organization_email", values.organization_email)
      formdata.append("organization_mobile", values.organization_mobile)
      formdata.append("mobile", values.mobile)
      formdata.append("email", values.email)
      formdata.append("password", values.password)
      formdata.append("dp", values.dp)
      mutate(formdata)
    }
  });

  // password visibility handling 
  const [visiblity, setVisiblity] = useState(false);
  const handlePasswordVisibility = () => {
    setVisiblity(!visiblity);
  };
  const handleMouseDown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        dispatch({ type: UserActions.login, payload: data.data.owner })
        setChoice({ type: UserChoiceActions.close })
        goto(paths.dashboard)
      }, 1000)
    }
  }, [isSuccess, dispatch, goto, data, setChoice])

  return (
    <form onSubmit={formik.handleSubmit}>

      <Stack
        direction="column"
        gap={2}
      >
        <TextField
          variant='standard'

          autoFocus
          fullWidth
          required
          error={
            formik.touched.organization_name && formik.errors.organization_name ? true : false
          }
          id="organization_name"
          label="Organization Name"
          helperText={
            formik.touched.organization_name && formik.errors.organization_name ? formik.errors.organization_name : ""
          }
          {...formik.getFieldProps('organization_name')}
        />
        <TextField
          variant='standard'

          required
          fullWidth
          error={
            formik.touched.organization_email && formik.errors.organization_email ? true : false
          }
          id="organization_email"
          label="Organization Email Id"
          helperText={
            formik.touched.organization_email && formik.errors.organization_email ? formik.errors.organization_email : ""
          }
          {...formik.getFieldProps('organization_email')}
        />
        <TextField
          variant='standard'
          type="number"
          required
          fullWidth
          error={
            formik.touched.organization_mobile && formik.errors.organization_mobile ? true : false
          }
          id="organization_mobile"
          label="Organization Mobile"
          helperText={
            formik.touched.organization_mobile && formik.errors.organization_mobile ? formik.errors.organization_mobile : ""
          }
          {...formik.getFieldProps('organization_mobile')}
        />

        <TextField
          variant='standard'

          fullWidth
          required
          error={
            formik.touched.username && formik.errors.username ? true : false
          }
          id="username"
          label="Username"
          helperText={
            formik.touched.username && formik.errors.username ? formik.errors.username : ""
          }
          {...formik.getFieldProps('username')}
        />
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

          required
          error={
            formik.touched.password && formik.errors.password ? true : false
          }
          id="password"
          label="Password"
          fullWidth
          helperText={
            formik.touched.password && formik.errors.password ? formik.errors.password : ""
          }
          type={visiblity ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handlePasswordVisibility}
                  onMouseDown={(e) => handleMouseDown(e)}
                >
                  {visiblity ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...formik.getFieldProps('password')}
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
          label="User Mobile"
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
            formik.touched.dp && formik.errors.dp ? (formik.errors.dp) : ""
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
              You Created an Organization Successfully
            </Alert>
          ) : null
        }
        <Button variant="contained"
          disabled={Boolean(isLoading)}
          color="primary" type="submit" fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Register"}</Button>
      </Stack>
    </form >
  )
}

export default OwnerSignUpForm
