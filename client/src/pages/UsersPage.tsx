import { Block, Edit, GroupAdd, GroupRemove, Key, RemoveCircle, Search } from '@mui/icons-material'
import {  Avatar, IconButton, InputAdornment,  TextField, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { AxiosResponse } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Column } from 'react-table'
import BlockUserDialog from '../components/dialogs/users/BlockUserDialog'
import MakeAdminDialog from '../components/dialogs/users/MakeAdminDialog'
import RemoveAdminDialog from '../components/dialogs/users/RemoveAdminDialog'
import UnBlockUserDialog from '../components/dialogs/users/UnBlockUserDialog'
import UpdateUserDialog from '../components/dialogs/users/UpdateUserDialog'
import { UserTable } from '../components/tables/UserTable'
import { UserChoiceActions, ChoiceContext } from '../contexts/dialogContext'
import { GetUsers } from '../services/UserServices'
import ManageAccessControlDialog from '../components/dialogs/users/ManageAccessControlDialog'
import { UserContext } from '../contexts/userContext'
import { BackendError } from '../types'
import { IUser } from '../types/users/user.type'
import { SelectionContext } from '../contexts/selectionContext'
import { FilterContext } from '../contexts/filterContext'
import FuzzySearch from 'fuzzy-search'
import { headColor } from '../utils/colors'
import UserTableMenu from '../components/menu/UserTableMenu'

export default function UsersPage() {
    const { data: users, isSuccess } = useQuery<AxiosResponse<IUser[]>, BackendError>("users", GetUsers, {
        refetchOnMount: true
    })
    const { user: LoggedInUser } = useContext(UserContext)
    const [rowid, setRowId] = useState<string | undefined>()
    const [user, setUser] = useState<IUser>()
    const { setChoice } = useContext(ChoiceContext)
    const { selectedRows } = useContext(SelectionContext)
    const { filter, setFilter } = useContext(FilterContext)
    const [preFilteredData, setPreFilteredData] = useState<IUser[]>([])
    const [DATA, setDATA] = useState<IUser[]>([])
    const MemoData = React.useMemo(() => DATA, [DATA])
    const MemoColumns: Column<IUser>[] = React.useMemo(
        () => [

            // user name
            {

                Header: 'User Name',
                accessor: 'username',
                Cell: (props) => {
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
                                        setChoice({ type: UserChoiceActions.control_access })
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
                                    props.row.original.is_admin ?
                                        <>
                                            <Typography sx={{
                                                textTransform: "capitalize", fontWeight: '600'
                                            }}>{props.row.original.username}</Typography>
                                            <Typography variant="caption" component="span" sx={{ fontWeight: '500' }}>
                                                {CellUser.created_by._id === CellUser._id ?
                                                    "owner" : "admin"}
                                            </Typography>
                                        </>
                                        :
                                        <>
                                            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.username}</Typography>
                                            <Typography variant="caption" component="span">
                                                user
                                            </Typography>
                                        </>
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
                Header: 'Last Updated By',
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

                            {/* edit icon */}
                            <Tooltip title="edit">
                                <IconButton
                                    color="success"
                                    size="medium"
                                    onClick={() => {
                                        setChoice({ type: UserChoiceActions.update_user })
                                        setUser(props.row.original)
                                    }}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            {
                                props.row.original.is_admin ?
                                    <>
                                        {LoggedInUser?.created_by._id === props.row.original._id ?
                                            null
                                            :
                                            < Tooltip title="Remove admin"><IconButton size="medium"
                                                color="error"
                                                onClick={() => {

                                                    setChoice({ type: UserChoiceActions.remove_admin })
                                                    setRowId(props.row.original._id)
                                                }}>
                                                <GroupRemove />
                                            </IconButton>
                                            </Tooltip>
                                        }
                                    </>
                                    :
                                    <Tooltip title="make admin"><IconButton size="medium"
                                        onClick={() => {
                                            setChoice({ type: UserChoiceActions.make_admin })
                                            setRowId(props.row.original._id)
                                        }}>
                                        <GroupAdd />
                                    </IconButton>
                                    </Tooltip>
                            }
                            {

                            }
                            {
                                CellUser?.is_active ?
                                    <>
                                        {LoggedInUser?.created_by._id === props.row.original._id ?
                                            null
                                            :
                                            <Tooltip title="block"><IconButton
                                                size="medium"
                                                onClick={() => {
                                                    setChoice({ type: UserChoiceActions.block_user })
                                                    setRowId(props.row.original._id)
                                                }}
                                            >
                                                <Block />
                                            </IconButton>
                                            </Tooltip>
                                        }

                                    </>
                                    :
                                    < Tooltip title="unblock">
                                        <IconButton
                                            color="warning"
                                            size="medium"
                                            onClick={() => {
                                                setChoice({ type: UserChoiceActions.unblock_user })
                                                setRowId(props.row.original._id)
                                            }}>
                                            <RemoveCircle />
                                        </IconButton>
                                    </Tooltip>
                            }
                            {
                                LoggedInUser?.is_admin ?
                                    <>
                                        {LoggedInUser?.created_by._id === props.row.original._id ?
                                            null
                                            :
                                            <Tooltip title="Change user Access Control">
                                                <IconButton
                                                    color="warning" size="medium"
                                                    onClick={() => {
                                                        setChoice({ type: UserChoiceActions.control_access })
                                                        setUser(props.row.original)
                                                    }}>
                                                    <Key />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    </>
                                    :
                                    null
                            }
                        </Stack>
                    )
                }
            },
        ]
        , [setChoice, LoggedInUser]
    )
    // setup users
    //setup leads
    useEffect(() => {
        if (isSuccess) {
            setDATA(users.data)
            setPreFilteredData(users.data)
        }
    }, [isSuccess, users])

    //set filter
    useEffect(() => {
        if (filter) {
            const searcher = new FuzzySearch(DATA, ["name", "customer_name", "customer_designation", "mobile", "email", "city", "state", "country", "address", "remarks", "work_description", "turnover", "lead_type", "stage", "alternate_mobile1", "alternate_mobile2", "alternate_email", "organization.organization_name", "lead_source", "created_at", "created_by.username", "updated_at", "updated_by.username", "preserved"], {
                caseSensitive: false,
            });
            const result = searcher.search(filter);
            setDATA(result)
        }
        if (!filter)
            setDATA(preFilteredData)
    }, [filter, preFilteredData, DATA])
    return (
        <>
            {/*heading, search bar and table menu */}
            <Stack
                spacing={2}
                padding={1}
                direction="row"
                justifyContent="space-between"
                width="100vw"
            >
                <Typography
                    variant={'h6'}
                    component={'h1'}
                >
                    Users
                </Typography>

                <Stack
                    direction="row"
                >
                    {/* search bar */}
                    < Stack direction="row" spacing={2} sx={{ bgcolor: headColor }
                    }>
                        <TextField
                            fullWidth
                            size="small"
                            onChange={(e) => setFilter(e.currentTarget.value)}
                            autoFocus
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>,
                            }}
                            placeholder={`${DATA.length} records...`}
                            style={{
                                fontSize: '1.1rem',
                                border: '0',
                            }}
                        />
                    </Stack >
                    {/* menu  */}
                    <UserTableMenu
                        selectedFlatRows={selectedRows}
                    />
                </Stack>
            </Stack>

            <UserTable data={MemoData} columns={MemoColumns} />
            {
                user ?
                    <>
                        <UpdateUserDialog user={user} />
                        <ManageAccessControlDialog user={user} />

                    </>
                    : null
            }
            {
                rowid ?
                    <>
                        <BlockUserDialog id={rowid} />
                        <UnBlockUserDialog id={rowid} />
                        <MakeAdminDialog id={rowid} />
                        <RemoveAdminDialog id={rowid} />
                    </> : null
            }
        </>

    )

}
