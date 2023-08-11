import { Block, Edit, GroupAdd, GroupRemove, Key, RemoveCircle } from '@mui/icons-material'
import { Avatar, Box, Checkbox, FormControlLabel, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { IUser } from '../../types/models/user.type'
import { color1, color2, headColor } from '../../utils/colors'
import { useContext, useEffect, useState } from 'react'
import { ChoiceContext, UserChoiceActions } from '../../contexts/dialogContext'
import { UserContext } from '../../contexts/userContext'
import UpdateUserDialog from '../dialogs/users/UpdateUserDialog'
import ManageAccessControlDialog from '../dialogs/users/ManageAccessControlDialog'
import BlockUserDialog from '../dialogs/users/BlockUserDialog'
import UnBlockUserDialog from '../dialogs/users/UnBlockUserDialog'
import MakeAdminDialog from '../dialogs/users/MakeAdminDialog'
import RemoveAdminDialog from '../dialogs/users/RemoveAdminDialog'

type Props = {
    user: IUser | undefined,
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>,
    selectAll: boolean,
    setSelectAll: React.Dispatch<React.SetStateAction<boolean>>,
    users: IUser[],
    selectedUsers: IUser[]
    setSelectedUsers: React.Dispatch<React.SetStateAction<IUser[]>>,
}
function UsersTable({ user, selectAll, users,  setSelectAll, setUser, selectedUsers, setSelectedUsers }: Props) {
    const [data, setData] = useState<IUser[]>(users)
    const { setChoice } = useContext(ChoiceContext)
    const { user: LoggedInUser } = useContext(UserContext)

    useEffect(() => {
        setData(users)
    }, [users])
    return (
        <>
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
                                        label=""
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
                            data && data.map((user, index) => {
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

export default UsersTable