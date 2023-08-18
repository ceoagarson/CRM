import { AxiosResponse } from 'axios'
import { queryClient } from '../../../main'
import { IFlow } from '../../../types/bot/flow.types'
import { AssignFlow, GetConnectedUsers } from '../../../services/BotServices'
import { useMutation, useQuery } from 'react-query'
import { BackendError } from '../../../types'
import { Alert, Button, CircularProgress, Stack, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { IUser } from '../../../types/users/user.type'
import { useEffect, useState } from 'react'

function UpdateConnectedUserForm({ flow }: { flow: IFlow }) {
    const { data } = useQuery<AxiosResponse<IUser[]>, BackendError>("connected_users", GetConnectedUsers)
    const [users, setUsers] = useState<IUser[]>()

    const { mutate, isLoading, isSuccess, isError, error } = useMutation
        <AxiosResponse<IFlow>, BackendError, { id: string, body: { user_ids: string[] } }>
        (AssignFlow, {
            onSuccess: () => {
                queryClient.invalidateQueries('flows')
                queryClient.invalidateQueries('connected_users')
            }
        })
    const formik = useFormik({
        initialValues: {
            connected_users: flow.connected_users && flow.connected_users.map((user) => { return user._id })
        },
        validationSchema: Yup.object({
            connected_users: Yup.array()
                .required('field')
        }),
        onSubmit: (values) => {
            if (flow && flow._id && values.connected_users)
                mutate({
                    id: flow._id,
                    body: { user_ids: values.connected_users }
                })
        }
    });

    useEffect(() => {
        if (data)
            setUsers(data.data)
    }, [data])
    return (
        <>


            <h1> {flow?.flow_name}</h1>

            <form onSubmit={formik.handleSubmit}>
                <Stack
                    gap={2}
                    py={2}>
                    < TextField
                        variant='standard'
                        select
                        SelectProps={{
                            native: true,
                            multiple: true
                        }}
                        focused

                        error={
                            formik.touched.connected_users && formik.errors.connected_users ? true : false
                        }
                        id="connected_users"
                        label="Connected Users"
                        fullWidth
                        required
                        helperText={
                            formik.touched.connected_users && formik.errors.connected_users ? formik.errors.connected_users : ""
                        }
                        {...formik.getFieldProps('connected_users')}
                    >
                        {
                            flow.connected_users && flow.connected_users.map(user => {
                                return (<option key={user._id} value={user._id}>

                                    {user.username + ": : " + String(user.connected_number).replace("91", "").replace("@c.us", "")}
                                </option>)
                            })
                        }

                        {
                            users && users.map((user, index) => {
                                let conn_users = flow.connected_users && flow.connected_users.map((user) => { return user._id })
                                if (!conn_users?.includes(user._id)) {
                                    return (<option key={index} value={user._id}>
                                        {user.username + ": : " + String(user.connected_number).replace("91", "").replace("@c.us", "")}
                                    </option>)
                                }
                                else return null
                            })
                        }
                    </TextField>
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
                                Successfully assigned the flow
                            </Alert>
                        ) : null
                    }
                    <Button variant="contained" color="primary" type="submit"
                        disabled={isLoading}
                        fullWidth>{Boolean(isLoading) ? <CircularProgress /> : "Assign flow"}
                    </Button>
                </Stack>
            </form>

        </>
    )
}

export default UpdateConnectedUserForm