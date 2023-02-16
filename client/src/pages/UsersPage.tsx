import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Avatar, IconButton, Snackbar, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Column } from 'react-table'
import DeleteUserDialog from '../components/dialogs/users/DeleteUserDialog'
import UpdateUserDialog from '../components/dialogs/users/UpdateUserDialog'
import { UserTable } from '../components/tables/user/UserTable'
import { ChoiceActions, ChoiceContext } from '../contexts/dialogContext'
import { GetUsers } from '../services/UserServices'
import { IUser } from '../types/user.type'

export default function UsersPage() {
    const { data, isSuccess, isError } = useQuery("users", GetUsers)
    const [rowid, setRowId] = useState<string | undefined>()
    const { setChoice } = useContext(ChoiceContext)
    const [DATA, setDATA] = useState<IUser[]>([])
    const MemoData = React.useMemo(() => DATA, [DATA])

    const MemoColumns: Column<IUser>[] = React.useMemo(
        () => [
            {
                Header: "Allowed Actions",
                accessor: "_id",
                Cell: (props) => {
                    return (
                        <Stack direction="row">
                            <IconButton color="inherit"
                                onClick={() => {
                                    setChoice({ type: ChoiceActions.update_user })
                                    setRowId(props.row.original._id)
                                }}>
                                <EditOutlined />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    setChoice({ type: ChoiceActions.delete_user })
                                    setRowId(props.row.original._id)
                                }} color="error">
                                <DeleteOutlined />
                            </IconButton>
                        </Stack>
                    )
                }
            },
            {
                Header: 'User Name',
                accessor: 'username',
                Cell: (props) => {
                    if (props.row.original.is_active)
                        return (
                            <Stack>
                                <Typography variant="body1">{props.row.original.username}</Typography>
                                <Typography variant="caption">active</Typography >
                            </Stack>
                        )
                    return (
                        <Stack>
                            <Typography variant="body1">{props.row.original.username}</Typography>
                            <Typography variant="caption">blocked</Typography >
                        </Stack>
                    )
                }
            },
            {
                Header: 'Email',
                accessor: 'email',
                Cell: (props) => {
                    if (props.row.original.email_verified)
                        return (
                            <Stack>
                                <Typography variant="body1">{props.row.original.email}</Typography>
                                <Typography variant="caption">verified</Typography >
                            </Stack>
                        )
                    return (
                        <Stack>
                            <Typography variant="body1">{props.row.original.email}</Typography>
                            <Typography variant="caption">not verified</Typography >
                        </Stack>
                    )
                }

            },
            {
                Header: 'Organization',
                accessor: 'organization',
                Cell: (props) => {
                    if (props.row.original.organization?.email_verified)
                        return (
                            <Stack>
                                <Typography variant="body1">{props.row.original.organization?.organization_name}</Typography>
                                <Typography variant="caption">verified</Typography >
                            </Stack>
                        )
                    return (
                        <Stack>
                            <Typography variant="body1">{props.row.original.organization?.organization_name}</Typography>
                            <Typography variant="caption">not verified</Typography >
                        </Stack>
                    )
                }

            },
            {
                Header: 'Picture',
                accessor: 'dp',
                Cell: (props) => {
                    return (
                        <IconButton
                        >
                            <Avatar
                                alt="display picture" src={props.row.original.dp?.url} />
                        </IconButton>
                    )
                }

            }

        ]
        , []
    )
    useEffect(() => {
        if (isSuccess)
            setDATA(data.data)
    }, [isSuccess, data])

    return (
        <>
            {
                data && data.data.length > 0 ?
                    < UserTable data={MemoData} columns={MemoColumns} />
                    : <h1>No data exists in the table</h1>
            }
            {
                isError ?
                    <Snackbar message="Error while fetching data" />
                    : null
            }
            {
                rowid ? <>
                    <UpdateUserDialog id={rowid} />
                    <DeleteUserDialog id={rowid} />
                </> : null
            }
        </>

    )

}
