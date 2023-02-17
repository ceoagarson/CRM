import { Button, CircularProgress,  Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import * as Yup from "yup"
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { UpdateUser } from '../../../services/UserServices';
import { Target } from '../../../types';
import { IUser } from '../../../types/user.type';


type TformData = {
  username: string,
  email: string,
  dp: string | Blob | File
}
type Props = {
  user: IUser
}
function UpdateUserForm({ user }: Props) {
  const { mutate, isLoading, isSuccess} = useMutation(UpdateUser)
  const { setChoice } = useContext(ChoiceContext)
  const formik = useFormik<TformData>({
    initialValues: {
      username: user.username || "",
      email: user?.email || "",
      dp: user.dp?.url || ""
    },
    validationSchema: Yup.object({

      username: Yup.string()
        .required('Required field')
        .min(4, 'Must be 4 characters or more')
        .max(30, 'Must be 30 characters or less'),
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
      formdata.append("username", values.username)
      formdata.append("email", values.email)
      formdata.append("dp", values.dp)
      if (user._id)
        mutate({ id: user._id, body: formdata })
    }
  });
  useEffect(() => {
    if (isSuccess) {
      setChoice({ type: ChoiceActions.close })
    }
  }, [isSuccess, setChoice])
  return (
    <>
      {
        isSuccess ? alert("success") : null
      }
      <form onSubmit={formik.handleSubmit}>
        <Stack
          direction="column"
          gap={2}

        >
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
    </>
  )
}

export default UpdateUserForm