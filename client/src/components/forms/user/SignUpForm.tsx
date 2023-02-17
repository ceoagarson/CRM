import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment, LinearProgress, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useContext,useState } from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { ChoiceActions,ChoiceContext } from '../../../contexts/dialogContext';

import { Signup } from '../../../services/UserServices';

type Target = EventTarget & (HTMLTextAreaElement | HTMLInputElement)
  & {
    files?: FileList | null
  }
type TformData = {
  organization_name: string,
  organization_email: string,
  username: string,
  email: string,
  password: string,
  dp: string | Blob | File
}
function OwnerSignUpForm() {
  const { mutate, isLoading, isSuccess } = useMutation(Signup)
  const { setChoice } = useContext(ChoiceContext)

  const formik = useFormik<TformData>({
    initialValues: {
      organization_name: '',
      organization_email: '',
      username: '',
      email: '',
      password: '',
      dp: ''
    },
    validationSchema: Yup.object({
      organization_name: Yup.string()
        .required('Required field')
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less'),
      organization_email: Yup.string()
        .email('provide a valid email id')
        .required('Required field'),
      username: Yup.string()
        .required('Required field')
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less'),
      email: Yup.string()
        .email('provide a valid email id')
        .required('Required field'),
      password: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .max(30, 'Must be 30 characters or less')
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
      formdata.append("organization_name", values.organization_name)
      formdata.append("username", values.username)
      formdata.append("organization_email", values.organization_email)
      formdata.append("email", values.email)
      formdata.append("password", values.password)
      formdata.append("dp", values.dp)
      mutate(formdata)
    }
  });
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
        setChoice({ type: ChoiceActions.close })
    }
}, [isSuccess,setChoice])
  return (

    <form onSubmit={formik.handleSubmit}>
      <Stack
        direction="column"
        gap={2}

      >
        <TextField
          variant='standard'
          focused
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
          focused
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
          focused
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
          variant='standard'
          focused
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
        {isLoading && <LinearProgress color="info" />}
        <Button variant="contained"
          disabled={Boolean(isLoading)}
          color="primary" type="submit" fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Register"}</Button>
      </Stack>
    </form >
  )
}

export default OwnerSignUpForm
