import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, LinearProgress, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { UserActions, UserContext } from '../../../contexts/userContext';
import { paths } from '../../../Routes';
import { Login } from '../../../services/UserServices';


function LoginForm() {
  const goto = useNavigate()
  const { mutate, data, isSuccess,isLoading } = useMutation(Login)
  const { setChoice } = useContext(ChoiceContext)
  const { dispatch } = useContext(UserContext)
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required field'),
      password: Yup.string()
        .min(6, 'Must be 6 characters or more')
        .max(30, 'Must be 30 characters or less')
        .required('Required field')
    }),
    onSubmit: (values: {
      username: string,
      password: string
    }) => {
      mutate(values)
    },
  });
  // passworrd validation
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
      dispatch({ type: UserActions.login, payload: data.data.user })
      setChoice({ type: ChoiceActions.close })
      goto(paths.dashboard)
    }
  }, [dispatch, goto, setChoice, isSuccess, data])
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          direction="column"
          pt={2}
          gap={2}
        >
          <TextField
            autoFocus
            variant="standard"
            fullWidth
            required
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
            error={
              formik.touched.password && formik.errors.password ? true : false
            }
            id="password"
            variant="standard"
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
          {isLoading && <LinearProgress />}
          <Button variant="contained"
            disabled={Boolean(isLoading)}
            color="primary" type="submit" fullWidth>Login</Button>
        </Stack>
      </form>
    </>
  )
}

export default LoginForm
