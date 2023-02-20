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
import { paths } from '../../../Routes';
import { ResetPassword } from '../../../services/UserServices';
import { BackendError } from '../../../types';

function ResetPasswordForm({ token }: { token: string }) {
  const { setChoice } = useContext(ChoiceContext)
  const goto = useNavigate()
  const { mutate, isLoading, isSuccess, isError, error } = useMutation
    <AxiosResponse<string>,
      BackendError,
      { token: string, body: { newPassword: string, confirmPassword: string } }
    >
    (ResetPassword)

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required field'),
      confirmPassword: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required field')
    }),
    onSubmit: (values: {
      newPassword: string,
      confirmPassword: string
    }) => {
      let body = values
      mutate({ token, body })
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
        setChoice({ type: UserChoiceActions.close })
        goto(paths.dashboard)
      }, 1000)
    }
  }, [goto, setChoice, isSuccess])

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
            Reset password successfully
          </Alert>
        ) : null
      }
      <Stack
        direction="column"
        pt={2}
        gap={2}
      >
        <TextField
          required
          error={
            formik.touched.newPassword && formik.errors.newPassword ? true : false
          }
          id="newPassword"
          variant="standard"
          label="New Password"
          fullWidth
          helperText={
            formik.touched.newPassword && formik.errors.newPassword ? formik.errors.newPassword : ""
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
          {...formik.getFieldProps('newPassword')}
        />
        <TextField
          required
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false
          }
          id="confirmPassword"
          variant="standard"
          label="Password"
          fullWidth
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ""
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
          {...formik.getFieldProps('confirmPassword')}
        />

        <Button variant="contained"
          disabled={Boolean(isLoading)}
          color="primary" type="submit" fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Reset"}
          </Button>
      </Stack>
    </form>
  )
}

export default ResetPasswordForm
