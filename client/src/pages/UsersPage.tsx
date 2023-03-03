import { AssuredWorkloadOutlined, AttributionOutlined, Block, BlockOutlined, CancelOutlined, EditOutlined, Visibility } from '@mui/icons-material'
import { Alert, Avatar, IconButton, LinearProgress, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { AxiosResponse } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Column } from 'react-table'
import BlockUserDialog from '../components/dialogs/users/BlockUserDialog'
import MakeAdminDialog from '../components/dialogs/users/MakeAdminDialog'
import MakeOwnerDialog from '../components/dialogs/users/MakeOwnerDialog'
import ProfileDialog from '../components/dialogs/users/ProfileDialog'
import RevokePermissionsDialog from '../components/dialogs/users/RevokePermissionDialog'
import UnBlockUserDialog from '../components/dialogs/users/UnBlockUserDialog'
import UpdateUserDialog from '../components/dialogs/users/UpdateUserDialog'
import { UserTable } from '../components/tables/user/UserTable'
import { UserChoiceActions, ChoiceContext } from '../contexts/dialogContext'
import { UserContext } from '../contexts/userContext'
import { GetUsers } from '../services/UserServices'
import { BackendError } from '../types'
import { IUser } from '../types/user.type'

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
                    let CellUser = props.row.original
                    return (
                        <Stack direction="row"
                            spacing={2}
                            justifyContent="left"
                            alignItems="center"
                        >
                            <Stack>
                                <Avatar 
                                sx={{ width: 30, height: 30 }}
                                    onClick={() => {
                                        setChoice({ type: UserChoiceActions.view_profile })
                                        setUser(props.row.original)
                                    }}
                                    alt="display picture" src={props.row.original.dp?.url} />
                                {
                                    props.row.original.is_active ?
                                        <Typography variant="caption" sx={{
                                            color: "green",
                                        }}>active</Typography>
                                        : <Typography variant="caption" sx={{
                                            color: "red",
                                        }}>blocked</Typography>

                                }
                            </Stack >
                            <Stack>
                                {
                                    roles?.includes("admin") ?
                                        <Typography sx={{ textTransform: "capitalize", color: "green" }}>{props.row.original.username}</Typography>
                                        :
                                        <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.username}</Typography>
                                }
                                {
                                    CellUser.created_by._id === CellUser._id ?
                                        <Typography variant="caption" component="span">
                                            {"primary owner"}
                                        </Typography> :
                                        <Typography variant="caption" component="span">
                                            {roles?.toString()}
                                        </Typography>

                                }

                            </Stack >
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
                                <Typography variant="body1" sx={{}}>{props.row.original.email}</Typography>
                                <Typography variant="caption" sx={{
                                    color: "green"
                                }}>verified</Typography >
                            </Stack>
                        )
                    return (
                        <Stack>
                            <Typography variant="body1" sx={{}}>{props.row.original.email}</Typography>
                            <Typography variant="caption" sx={{
                                color: "red"
                            }}>not verified</Typography >
                        </Stack>
                    )
                }

            },
            // mobile
            {
                Header: 'Mobile',
                accessor: 'mobile',
                Cell: (props) => {
                    if (props.row.original.email_verified)
                        return (
                            <Stack>
                                <Typography variant="body1" sx={{}}>{props.row.original.mobile}</Typography>
                                <Typography variant="caption">{"verified"}</Typography>
                            </Stack>
                        )
                    return (
                        <Stack>
                            <Typography variant="body1" sx={{}}>{props.row.original.mobile}</Typography>
                            <Typography sx={{ color: "red" }} variant="caption">{"not verified"}</Typography>
                        </Stack>
                    )
                }
            },
            // created by
            {
                Header: 'Created By',
                accessor: 'created_by',
                Cell: (props) => {
                    let date = null
                    if (props.row.original.created_at)
                        date = new Date(props.row.original.created_at).toLocaleDateString()
                    return (
                        <Stack>
                            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.created_by.username}</Typography>
                            <Typography variant="caption" component="span">
                                {date}
                            </Typography>
                        </Stack >
                    )
                }
            },
            // updated by
            {
                Header: 'Last Updated',
                accessor: 'updated_by',
                Cell: (props) => {
                    let date = null
                    date = new Date(props.row.original.updated_at).toLocaleDateString()
                    return (
                        <Stack>
                            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.updated_by.username}</Typography>
                            <Typography variant="caption" component="span">
                                {date}
                            </Typography>
                        </Stack >
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
                                <IconButton
                                    color="info" size="medium"
                                    onClick={() => {
                                        setChoice({ type: UserChoiceActions.view_profile })
                                        setUser(props.row.original)
                                    }}>
                                    <Visibility />
                                </IconButton>
                            </Tooltip>
                            {
                                loggedInUser?.roles?.includes("owner") ?
                                    <>
                                        {/* edit icon */}
                                        <Tooltip title="edit">
                                            <IconButton
                                                color="success" size="medium"
                                                onClick={() => {
                                                    setChoice({ type: UserChoiceActions.update_user })
                                                    setUser(props.row.original)
                                                }}>
                                                <EditOutlined />
                                            </IconButton>
                                        </Tooltip>
                                        {/* revoke */}
                                        {
                                            CellUser.created_by._id === CellUser._id ? null :
                                                <>
                                                    < Tooltip title="Revoke Permissions "><IconButton size="medium"
                                                        color="error"
                                                        onClick={() => {

                                                            setChoice({ type: UserChoiceActions.revoke_permission })
                                                            setRowId(props.row.original._id)
                                                        }}>
                                                        <CancelOutlined />
                                                    </IconButton>
                                                    </Tooltip>
                                                </>
                                        }

                                        {/* make owner */}
                                        {
                                            CellUser.created_by._id === CellUser._id ? null :
                                                <Tooltip title="make owner">
                                                    <IconButton size="medium"
                                                        color="success"
                                                        onClick={() => {

                                                            setChoice({ type: UserChoiceActions.make_owner })
                                                            setRowId(props.row.original._id)
                                                        }}>
                                                        <AssuredWorkloadOutlined />
                                                    </IconButton>
                                                </Tooltip>
                                        }

                                        {/* make admin */}
                                        {
                                            CellUser.created_by._id === CellUser._id ? null :

                                                <Tooltip title="make admin"><IconButton size="medium"
                                                    color="info"
                                                    onClick={() => {
                                                        setChoice({ type: UserChoiceActions.make_admin })
                                                        setRowId(props.row.original._id)
                                                    }}>
                                                    <AttributionOutlined />
                                                </IconButton>
                                                </Tooltip>
                                        }

                                        {/* block */}
                                        {

                                            CellUser.created_by._id === CellUser._id ?
                                                null :
                                                <>
                                                    {
                                                        CellUser?.is_active ?
                                                            <Tooltip title="block"><IconButton
                                                                color="error" size="medium"
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
                                                                <IconButton
                                                                    color="warning"
                                                                    size="medium"
                                                                    onClick={() => {
                                                                        setChoice({ type: UserChoiceActions.unblock_user })
                                                                        setRowId(props.row.original._id)
                                                                    }}>
                                                                    <Block />
                                                                </IconButton>
                                                            </Tooltip>
                                                    }

                                                </>
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
