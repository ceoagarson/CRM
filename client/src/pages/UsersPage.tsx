import { AssuredWorkloadOutlined, AttributionOutlined, BlockOutlined, CancelOutlined, CheckCircleOutline, DeleteOutlined, EditOutlined, Visibility } from '@mui/icons-material'
import { Alert, Avatar, IconButton, LinearProgress, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { AxiosResponse } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Column } from 'react-table'
import BlockUserDialog from '../components/dialogs/users/BlockUserDialog'
import DeleteUserDialog from '../components/dialogs/users/DeleteUserDialog'
import MakeAdminDialog from '../components/dialogs/users/MakeAdminDialog'
import MakeOwnerDialog from '../components/dialogs/users/MakeOwnerDialog'
import ProfileDialog from '../components/dialogs/users/ProfileDialog'
import RevokePermissionsDialog from '../components/dialogs/users/RevokePermissionDialog'
import UnBlockUserDialog from '../components/dialogs/users/UnBlockUserDialog'
import UpdateUserDialog from '../components/dialogs/users/UpdateUserDialog'
import { UserTable } from '../components/tables/user/UserTable'
import { UserChoiceActions, ChoiceContext } from '../contexts/dialogContext'
import { IUser, UserContext } from '../contexts/userContext'
import { GetUsers } from '../services/UserServices'
import { BackendError } from '../types'

export default function UsersPage() {
    const { data, isSuccess, isLoading, isError, error } = useQuery<AxiosResponse<IUser[]>, BackendError>("users", GetUsers, {
        refetchOnMount: true
    })
    const { user: loggedInUser } = useContext(UserContext)
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
                width: 20,
                disableSortBy: true,
                Cell: (props) => {
                    return <Typography variant="body1" component="span" pr={2}>{props.row.index + 1}</Typography>
                }
            },

            // user name
            {

                Header: 'User Name',
                accessor: 'username',
                Cell: (props) => {
                    let roles = props.row.original.roles
                    return (
                        <Stack>
                            {
                                roles?.includes("admin") ?
                                    <Typography sx={{ fontWeight: "bold" }}>{props.row.original.username}</Typography>
                                    :
                                    <Typography >{props.row.original.username}</Typography>
                            }

                            <Typography variant="caption" component="span">
                                {roles?.toString()}
                            </Typography>
                        </Stack >
                    )
                }
            },
            // picture
            {
                Header: 'Picture',
                accessor: 'dp',
                disableSortBy: true,
                Cell: (props) => {
                    if (props.row.original.is_active)
                        return (
                            <Stack>
                                <Avatar
                                    alt="display picture" src={props.row.original.dp?.url} />
                                <Typography variant="caption" sx={{
                                    color: "green"
                                }}>active</Typography>
                            </Stack >
                        )
                    return (
                        <Stack>
                            <Avatar
                                alt="display picture" src={props.row.original.dp?.url} />
                            <Typography variant="caption" sx={{
                                color: "red"
                            }}>blocked</Typography >
                        </Stack>
                    )
                }

            },
            // email
            {
                Header: 'Email',
                accessor: 'email',
                Cell: (props) => {
                    if (props.row.original.email_verified)
                        return (
                            <Stack>
                                <Typography variant="body1">{props.row.original.email}</Typography>
                                <Typography variant="caption" sx={{
                                    color: "green"
                                }}>verified</Typography >
                            </Stack>
                        )
                    return (
                        <Stack>
                            <Typography variant="body1">{props.row.original.email}</Typography>
                            <Typography variant="caption" sx={{
                                color: "red"
                            }}>not verified</Typography >
                        </Stack>
                    )
                }

            },
            // created by
            {
                Header: 'Created By',
                accessor: 'createdBy',
                Cell: (props) => {
                    return (
                        <Typography sx={{ fontWeight: "bold" }}>{props.row.original.createdBy?.username}</Typography>
                    )
                }

            },
            // joined date
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
            // logindate
            {
                Header: 'Last Login',
                accessor: 'last_login',
                Cell: (props) => {
                    let date = null
                    if (props.row.original.last_login)
                        date = new Date(props.row.original.last_login).toLocaleString()
                    return (
                        <Typography variant="body1">{date}</Typography>
                    )
                }

            },
            // actions
            {
                Header: "Allowed Actions",
                accessor: "actions",//already used so use it for display actions
                disableSortBy: true,
                Cell: (props) => {
                    let CellUser = props.row.original
                    return (
                        <Stack direction="row">
                            {/* view icon */}
                            <Tooltip title="view">
                                <IconButton size="medium"
                                    onClick={() => {
                                        setChoice({ type: UserChoiceActions.view_profile })
                                        setUser(props.row.original)
                                    }}>
                                    <Visibility />
                                </IconButton>
                            </Tooltip>
                            {/* delete icon */}
                            {
                                (CellUser.createdBy?._id === loggedInUser?._id) ?
                                    <Tooltip title="delete">
                                        <IconButton size="medium"
                                            onClick={() => {
                                                setChoice({ type: UserChoiceActions.delete_user })
                                                setRowId(props.row.original._id)
                                            }} color="error">
                                            <DeleteOutlined />
                                        </IconButton>
                                    </Tooltip>
                                    : null
                            }
                            {loggedInUser?.roles?.includes("owner") ?
                                <>
                                    {/* edit icon */}
                                    <Tooltip title="edit">
                                        <IconButton size="medium"
                                            onClick={() => {
                                                setChoice({ type: UserChoiceActions.update_user })
                                                setUser(props.row.original)
                                            }}>
                                            <EditOutlined />
                                        </IconButton>
                                    </Tooltip>
                                    {/* revoke */}
                                    < Tooltip title="Revoke Permissions "><IconButton size="medium"
                                        onClick={() => {

                                            setChoice({ type: UserChoiceActions.revoke_permission })
                                            setRowId(props.row.original._id)
                                        }}>
                                        <CancelOutlined />
                                    </IconButton>
                                    </Tooltip>
                                    {/* make owner */}
                                    <Tooltip title="make owner">
                                        <IconButton size="medium"
                                            onClick={() => {

                                                setChoice({ type: UserChoiceActions.make_owner })
                                                setRowId(props.row.original._id)
                                            }}>
                                            <AssuredWorkloadOutlined />
                                        </IconButton>
                                    </Tooltip>
                                    {/* make admin */}
                                    <Tooltip title="make admin"><IconButton size="medium"
                                        onClick={() => {
                                            setChoice({ type: UserChoiceActions.make_admin })
                                            setRowId(props.row.original._id)
                                        }}>
                                        <AttributionOutlined />
                                    </IconButton>
                                    </Tooltip>

                                    {/* block */}
                                    {
                                        CellUser?.is_active ?
                                            <Tooltip title="block"><IconButton size="medium"
                                                onClick={() => {
                                                    setChoice({ type: UserChoiceActions.block_user })
                                                    setRowId(props.row.original._id)
                                                }}
                                            >
                                                <BlockOutlined />
                                            </IconButton>
                                            </Tooltip>
                                            :
                                            < Tooltip title="unblock">
                                                <IconButton size="medium"
                                                    onClick={() => {
                                                        setChoice({ type: UserChoiceActions.unblock_user })
                                                        setRowId(props.row.original._id)
                                                    }}>
                                                    <CheckCircleOutline />
                                                </IconButton>
                                            </Tooltip>
                                    }
                                </>
                                : null
                            }
                        </Stack >
                    )
                }
            }

        ]
        , [setChoice, loggedInUser]
    )
    useEffect(() => {
        if (isSuccess)
            setDATA(data.data)
    }, [isSuccess, data])
    return (
        <>
            < UserTable data={MemoData} columns={MemoColumns} />

            {isError ?
                <Alert color="error">{error?.response.data.message}</Alert>
                : null
            }


            {
                isLoading ?
                    <LinearProgress color="success" />
                    : null
            }
            {
                user ?
                    <>
                        <ProfileDialog profile={user} />
                        <UpdateUserDialog user={user} />
                    </>
                    : null
            }
            {
                rowid ?
                    <>
                        <DeleteUserDialog id={rowid} />
                        <BlockUserDialog id={rowid} />
                        <UnBlockUserDialog id={rowid} />
                        <MakeAdminDialog id={rowid} />
                        <MakeOwnerDialog id={rowid} />
                        <RevokePermissionsDialog id={rowid} />

                    </> : null
            }
        </>

    )

}
