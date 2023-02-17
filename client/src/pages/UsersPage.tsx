import { DeleteOutlined, EditOutlined } from '@mui/icons-material'
import { Avatar, IconButton, LinearProgress, Typography } from '@mui/material'
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
    const { data, isSuccess, isLoading } = useQuery("users", GetUsers, {
        refetchOnMount: true
    })
    const [rowid, setRowId] = useState<string | undefined>()
    const [user, setUser] = useState<IUser>()
    const { setChoice } = useContext(ChoiceContext)
    const [DATA, setDATA] = useState<IUser[]>([])
    const MemoData = React.useMemo(() => DATA, [DATA])

    const MemoColumns: Column<IUser>[] = React.useMemo(
        () => [
            {
                Header: "Index",
                accessor: "_id",
                Cell: (props) => {
                    return <Typography variant="body1" component="span" pr={2}>{props.row.index + 1}</Typography>
                }
            },
            {
                Header: "Actions",
                accessor: "email_verified",
                Cell: (props) => {
                    return (
                        <Stack direction="row">
                            <IconButton color="inherit"
                                onClick={() => {
                                    setChoice({ type: ChoiceActions.update_user })
                                    setUser(props.row.original)
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
                            <Typography variant="caption" >blocked</Typography >
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
                            <Stack>
                                <Avatar
                                    alt="display picture" src={props.row.original.dp?.url} />
                                <Typography variant="caption" component="span">
                                    {props.row.original.roles?.toString()}
                                </Typography>
                            </Stack>
                        </IconButton>
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
                Header: 'Joined Date',
                accessor: 'createdAt',
                Cell: (props) => {
                    let date = null
                    if (props.row.original.createdAt)
                        date = new Date(props.row.original.createdAt).toLocaleDateString()
                    return (
                        <Typography variant="body1">{date}</Typography>
                    )
                }

            },
            {
                Header: 'Last Login',
                accessor: 'last_login',
                Cell: (props) => {
                    let date = null
                    if (props.row.original.last_login)
                        date = new Date(props.row.original.last_login).toLocaleDateString()
                    return (
                        <Typography variant="body1">{date}</Typography>
                    )
                }

            },

        ]
        , [setChoice]
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
                    : null
            }
            {
                isLoading ?
                    <LinearProgress color="success" />
                    : null
            }
            {
                user ?
                    < UpdateUserDialog user={user} />
                    : null
            }

            {
                rowid ?

                    <DeleteUserDialog id={rowid} />
                    : null
            }
        </>

    )

}
