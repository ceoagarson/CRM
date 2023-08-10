import { Block, Edit, GroupAdd, GroupRemove, Key, RemoveCircle, Search } from '@mui/icons-material'
import { Avatar, Box, Checkbox, FormControlLabel, IconButton, InputAdornment, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { AxiosResponse } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import BlockUserDialog from '../components/dialogs/users/BlockUserDialog'
import MakeAdminDialog from '../components/dialogs/users/MakeAdminDialog'
import RemoveAdminDialog from '../components/dialogs/users/RemoveAdminDialog'
import UnBlockUserDialog from '../components/dialogs/users/UnBlockUserDialog'
import UpdateUserDialog from '../components/dialogs/users/UpdateUserDialog'
import { UserChoiceActions, ChoiceContext } from '../contexts/dialogContext'
import { GetUsers } from '../services/UserServices'
import ManageAccessControlDialog from '../components/dialogs/users/ManageAccessControlDialog'
import { UserContext } from '../contexts/userContext'
import { BackendError } from '../types'
import { IUser } from '../types/users/user.type'
import { color1, color2, headColor } from '../utils/colors'
import UserTableMenu from '../components/menu/UserTableMenu'
import FuzzySearch from 'fuzzy-search'

export default function UsersPage() {
    const { data, isSuccess, isLoading } = useQuery<AxiosResponse<IUser[]>, BackendError>("users", GetUsers, {
        refetchOnMount: true
    })
    const { user: LoggedInUser } = useContext(UserContext)
    const [user, setUser] = useState<IUser>()
    const [users, setUsers] = useState<IUser[]>([])
    const [selectAll, setSelectAll] = useState(false)
    const MemoData = React.useMemo(() => users, [users])
    const [preFilteredData, setPreFilteredData] = useState<IUser[]>([])


    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([])
    const [filter, setFilter] = useState<string | undefined>()
    const { setChoice } = useContext(ChoiceContext)


    useEffect(() => {
        if (isSuccess) {
            setUsers(data.data)
            setPreFilteredData(data.data)
        }
    }, [isSuccess, users])

    useEffect(() => {
        if (filter) {
            if (users) {
                const searcher = new FuzzySearch(users, ["username", "email", "mobile", "is_active", "is_admin", "is_email_verified", "last_login", "created_at", "updated_at"], {
                    caseSensitive: false,
                });
                const result = searcher.search(filter);
                setUsers(result)
            }
        }
        if (!filter)
            setUsers(preFilteredData)

    }, [filter, users])

    return (
        <>
            {
                isLoading && <LinearProgress />
            }
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
                    sx={{ pl: 1 }}
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
                            placeholder={`${MemoData?.length} records...`}
                            style={{
                                fontSize: '1.1rem',
                                border: '0',
                            }}
                        />
                    </Stack >
                    <UserTableMenu
                        selectedFlatRows={selectedUsers}
                    />
                </Stack>
            </Stack>
            {/* table */}
            <Box sx={{
                overflow: "scroll",
                height: '73.5vh'
            }}>
                <Table
                    stickyHeader
                    sx={{ minWidth: "1800px" }}
                    size="small">
                    <TableHead
                    >
                        <TableRow>
                            <TableCell
                                sx={{ bgcolor: headColor }}                         >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    <FormControlLabel sx={{ fontSize: 12 }} control={
                                        <Checkbox

                                            size="small" onChange={(e) => {
                                                if (e.currentTarget.checked) {
                                                    setSelectedUsers(users)
                                                    setSelectAll(true)
                                                }
                                                if (!e.currentTarget.checked) {
                                                    setSelectedUsers([])
                                                    setSelectAll(false)
                                                }
                                            }} />}
                                        label="Select"
                                    />
                                </Stack>
                            </TableCell>

                            <TableCell
                                sx={{ bgcolor: headColor }}                         >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    User Name
                                </Stack>
                            </TableCell>
                            <TableCell
                                sx={{ bgcolor: headColor }}                         >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    Email
                                </Stack>
                            </TableCell>
                            <TableCell
                                sx={{ bgcolor: headColor }}                         >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    Mobile
                                </Stack>
                            </TableCell>
                            <TableCell
                                sx={{ bgcolor: headColor }}                         >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    Created By
                                </Stack>
                            </TableCell>
                            <TableCell
                                sx={{ bgcolor: headColor }}                         >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    Last Updated By
                                </Stack>
                            </TableCell>
                            <TableCell
                                sx={{ bgcolor: headColor }}                         >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    Last Login
                                </Stack>
                            </TableCell>
                            <TableCell
                                sx={{ bgcolor: headColor }}                         >
                                <Stack
                                    direction="row"
                                    justifyContent="left"
                                    alignItems="left"
                                    spacing={2}
                                >
                                    Allowed Actions
                                </Stack>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {
                            MemoData && MemoData.map((user, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '&:nth-of-type(odd)': { bgcolor: color1 },
                                            '&:nth-of-type(even)': { bgcolor: color2 },
                                            '&:hover': { bgcolor: 'rgba(0,0,0,0.1)', cursor: 'pointer' }
                                        }}>
                                        {selectAll ?
                                            <TableCell>
                                                <Stack direction="row"
                                                    spacing={2}
                                                    justifyContent="left"
                                                    alignItems="center"
                                                >

                                                    <Checkbox size="small"
                                                        checked={Boolean(selectAll)}
                                                    />

                                                </Stack>
                                            </TableCell>
                                            :
                                            null
                                        }
                                        {!selectAll ?
                                            <TableCell>
                                                <Stack direction="row"
                                                    spacing={2}
                                                    justifyContent="left"
                                                    alignItems="center"
                                                >
                                                    <Checkbox size="small"
                                                        onChange={(e) => {
                                                            setUser(user)
                                                            if (e.target.checked) {
                                                                setSelectedUsers([...selectedUsers, user])
                                                            }
                                                            if (!e.target.checked) {
                                                                setSelectedUsers((users) => users.filter((item) => {
                                                                    return item._id !== user._id
                                                                }))
                                                            }
                                                        }}
                                                    />
                                                </Stack>
                                            </TableCell>
                                            :
                                            null
                                        }

                                        {/* profiles picture */}
                                        <TableCell>
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
                                                            setUser(user)
                                                        }}
                                                        alt="display picture" src={user.dp?.url} />
                                                    {
                                                        user.is_active ?
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
                                                        user.is_admin ?
                                                            <>
                                                                <Typography sx={{
                                                                    textTransform: "capitalize", fontWeight: '600'
                                                                }}>{user.username}</Typography>
                                                                <Typography variant="caption" component="span" sx={{ fontWeight: '500' }}>
                                                                    {user.created_by._id === user?._id ?
                                                                        "owner" : "admin"}
                                                                </Typography>
                                                            </>
                                                            :
                                                            <>
                                                                <Typography sx={{ textTransform: "capitalize" }}>{user.username}</Typography>
                                                                <Typography variant="caption" component="span">
                                                                    user
                                                                </Typography>
                                                            </>
                                                    }
                                                </Stack >
                                            </Stack>
                                        </TableCell>
                                        {/* email */}
                                        <TableCell>
                                            <Stack>
                                                <Typography variant="body1" sx={{}}>{user.email}</Typography>
                                                {
                                                    user.email_verified ? <Typography variant="caption" sx={{
                                                        color: "green"
                                                    }}>verified</Typography >

                                                        :
                                                        <Typography variant="caption" sx={{
                                                            color: "red"
                                                        }}>not verified</Typography >
                                                }

                                            </Stack>
                                        </TableCell>
                                        {/* mobiles */}
                                        <TableCell>
                                            <Stack>
                                                <Typography variant="body1" sx={{}}>{user.mobile}</Typography>                                                {
                                                    user.email_verified ? <Typography variant="caption">{"verified"}</Typography>

                                                        :
                                                        <Typography sx={{ color: "red" }} variant="caption">{"not verified"}</Typography>
                                                }

                                            </Stack>
                                        </TableCell>
                                        {/* created by */}
                                        <TableCell>
                                            <Stack>
                                                <Typography sx={{ textTransform: "capitalize" }}>{user.created_by.username}</Typography>
                                                <Typography variant="caption" component="span">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </Typography>
                                            </Stack >
                                        </TableCell>
                                        {/* updated by */}
                                        <TableCell>
                                            <Stack>
                                                <Typography sx={{ textTransform: "capitalize" }}>{user.updated_by.username}</Typography>
                                                <Typography variant="caption" component="span">
                                                    {new Date(user.updated_at).toLocaleDateString()}
                                                </Typography>
                                            </Stack >
                                        </TableCell>
                                        {/* login date */}
                                        <TableCell>
                                            <Typography variant="body1">{new Date(user.last_login).toLocaleString()}</Typography>
                                        </TableCell>
                                        {/* actions */}

                                        <TableCell>
                                            <Stack direction="row">

                                                {/* edit icon */}
                                                <Tooltip title="edit">
                                                    <IconButton
                                                        color="success"
                                                        size="medium"
                                                        onClick={() => {
                                                            setChoice({ type: UserChoiceActions.update_user })
                                                            setUser(user)
                                                        }}>
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                {
                                                    user.is_admin ?
                                                        <>
                                                            {LoggedInUser?.created_by._id === user._id ?
                                                                null
                                                                :
                                                                < Tooltip title="Remove admin"><IconButton size="medium"
                                                                    color="error"
                                                                    onClick={() => {

                                                                        setChoice({ type: UserChoiceActions.remove_admin })
                                                                        setUser(user)
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
                                                                setUser(user)
                                                            }}>
                                                            <GroupAdd />
                                                        </IconButton>
                                                        </Tooltip>
                                                }
                                                {

                                                }
                                                {
                                                    user?.is_active ?
                                                        <>
                                                            {LoggedInUser?.created_by._id === user._id ?
                                                                null
                                                                :
                                                                <Tooltip title="block"><IconButton
                                                                    size="medium"
                                                                    onClick={() => {
                                                                        setChoice({ type: UserChoiceActions.block_user })
                                                                        setUser(user)
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
                                                                    setUser(user)
                                                                }}>
                                                                <RemoveCircle />
                                                            </IconButton>
                                                        </Tooltip>
                                                }
                                                {
                                                    LoggedInUser?.is_admin ?
                                                        <>
                                                            {LoggedInUser?.created_by._id === user._id ?
                                                                null
                                                                :
                                                                <Tooltip title="Change user Access Control">
                                                                    <IconButton
                                                                        color="warning" size="medium"
                                                                        onClick={() => {
                                                                            setChoice({ type: UserChoiceActions.control_access })
                                                                            setUser(user)
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
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </Box>
            {
                user ?
                    <>
                        <UpdateUserDialog user={user} />
                        <ManageAccessControlDialog user={user} />
                        <BlockUserDialog id={user._id} />
                        <UnBlockUserDialog id={user._id} />
                        <MakeAdminDialog id={user._id} />
                        <RemoveAdminDialog id={user._id} />
                    </>
                    : null
            }
        </>

    )

}

