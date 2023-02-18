import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, CircularProgress, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useFormik } from 'formik';
import { useEffect, useContext, useState } from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { queryClient } from '../../..';
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { NewUser } from '../../../services/UserServices';
import { BackendError, Target } from '../../../types';
import { IUser } from '../../../types/user.type';

type TformData = {
    username: string,
    email: string,
    password: string,
    dp: string | Blob | File
}

function NewUserForm() {
    const { mutate, isLoading, isSuccess, isError, error } = useMutation
        <AxiosResponse<IUser>, BackendError, FormData>
        (NewUser, {
            onSuccess: () => queryClient.invalidateQueries('users')
        })

    const { setChoice } = useContext(ChoiceContext)

    const formik = useFormik<TformData>({
        initialValues: {
            username: '',
            email: '',
            password: '',
            dp: ''
        },
        validationSchema: Yup.object({
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
            formdata.append("username", values.username)
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
            setTimeout(() => {
                setChoice({ type: ChoiceActions.close })
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
                        new user created successfully
                    </Alert>
                ) : null
            }
            <Stack
                direction="column"
                gap={2}
            >
                <TextField
                    autoFocus
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

                <Button variant="contained" color="primary" type="submit"
                    disabled={Boolean(isLoading)}
                    fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Register"}
                </Button>
            </Stack>
        </form>
    )
}

export default NewUserForm
