import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Column } from 'react-table'
import { UserTable } from '../components/tables/user/UserTable'
import { GetUsers } from '../services/UserServices'
import { IUser } from '../types/user.type'

export default function UsersPage() {
    const { data, isSuccess } = useQuery("users", GetUsers)
    const [DATA, setDATA] = useState<IUser[]>([])
    const MemoData = React.useMemo(() => DATA, [DATA])
    const MemoColumns: Column<IUser>[] = React.useMemo(
        () => [
            {
                Header: 'id',
                accessor: '_id'
            },
            {
                Header: 'User Name',
                accessor: 'username'
            },
            {
                Header: 'Email',
                accessor: 'email'

            },
            {
                Header: 'Pic',
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
                isSuccess ?
                    <>
                        < UserTable data={MemoData} columns={MemoColumns} />
                    </>
                    :
                    <h1>users fetchong error</h1>
            }
        </>

    )

}
