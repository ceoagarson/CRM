import { Search } from '@mui/icons-material'
import { InputAdornment, LinearProgress, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { GetUsers } from '../services/UserServices'
import { BackendError } from '../types'
import { IUser } from '../types/users/user.type'
import { headColor } from '../utils/colors'
import UserTableMenu from '../components/menu/UserTableMenu'
import FuzzySearch from "fuzzy-search";
import UsersTable from '../components/tables/UsersTable'


export default function UsersPage() {
    const { data, isSuccess, isLoading } = useQuery<AxiosResponse<IUser[]>, BackendError>("users", GetUsers, {
        refetchOnMount: true
    })
    const [user, setUser] = useState<IUser>()
    const [users, setUsers] = useState<IUser[]>([])
    const [selectAll, setSelectAll] = useState(false)
    const MemoData = React.useMemo(() => users, [users])
    const [preFilteredData, setPreFilteredData] = useState<IUser[]>([])
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([])
    const [filter, setFilter] = useState<string | undefined>()
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
                    {/* menu */}
                    <UserTableMenu
                        selectedFlatRows={selectedUsers}
                    />

                </Stack>
            </Stack>
            {/*  table */}
            <UsersTable
                user={user}
                selectAll={selectAll}
                selectedUsers={selectedUsers}
                setSelectedUsers={setSelectedUsers}
                setSelectAll={setSelectAll}
                users={MemoData}
                setUser={setUser}
            />
        </>

    )

}

