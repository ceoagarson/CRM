import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { UserActions, UserContext } from '../../../contexts/userContext';
import { paths } from '../../../Routes';
import { Login } from '../../../services/UserServices';
import { IUser } from '../../../types/models/user.type';
import { BackendError } from '../../../types';


function LoginForm() {
  const goto = useNavigate()
  const { mutate, data, isSuccess, isLoading, isError, error } = useMutation
    <AxiosResponse<IUser>,
      BackendError,
      { username: string, password: string }
    >(Login)

  const { setChoice } = useContext(ChoiceContext)
  const { setUser } = useContext(UserContext)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required(),
      password: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required()
    }),
    onSubmit: (values: {
      username: string,
      password: string
    }) => {
      mutate(values)
    },
  });

  // passworrd handling
  const [visiblity, setVisiblity] = useState(false);
  const handlePasswordVisibility = () => {
    setVisiblity(!visiblity);
  };
  const handleMouseDown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setUser({ type: UserActions.login, payload: data.data })
        setChoice({ type: UserChoiceActions.close_user })
        goto(paths.dashboard)
      }, 400)
    }
  }, [setUser, goto, setChoice, isSuccess, data])

  return (
    <form onSubmit={formik.handleSubmit}>

      <Stack
        direction="column"
        p={2}
        gap={2}
      >
        <TextField
          autoFocus
          fullWidth
          variant="standard"
          required
          focused
          error={
            formik.touched.username && formik.errors.username ? true : false
          }
          id="username"
          label="Username or Email"
          helperText={
            formik.touched.username && formik.errors.username ? formik.errors.username : ""
          }
          {...formik.getFieldProps('username')}
        />
        <TextField
          required
          variant="standard"
          focused
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
              logged in
            </Alert>
          ) : null
        }
        <Button variant="contained"
          disabled={Boolean(isLoading)}
          type="submit" fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Login"}
        </Button>
      </Stack>
    </form>
  )
}

export default LoginForm
