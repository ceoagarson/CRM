import {Edit } from "@mui/icons-material"
import { IconButton, LinearProgress, Stack, Tooltip, Typography } from "@mui/material"
import { AxiosResponse } from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import { ChoiceContext, MachineChoiceActions } from "../contexts/dialogContext"
import { IMachine } from "../types/machine.types"
import { BackendError } from "../types"
import { GetMachines } from "../services/MachineServices"
import { MachineTable } from "../components/tables/MachineTable"
import UpdateMachineDialog from "../components/dialogs/machines/UpdateMachineDialog"


export default function MachinesPage() {
    const { setChoice } = useContext(ChoiceContext)
    const [DATA, setDATA] = useState<IMachine[]>([])
    const [machine, setMachine] = useState<IMachine>()
    const { data: machines, isSuccess, isLoading } = useQuery
        <AxiosResponse<IMachine[]>, BackendError>("machines", GetMachines, {
            refetchOnMount: true
        })
    const MemoData = React.useMemo(() => DATA, [DATA])
    const MemoColumns: Column<IMachine>[] = React.useMemo(
        () => [
            //actions
            {
                Header: 'Actions',
                accessor: 'actions',
                disableSortBy: true,
                Cell: (props) => {
                    return (
                        <Stack direction="row" spacing={1}>
                            <Tooltip title="edit">
                                <IconButton color="secondary"
                                    onClick={() => {
                                        setChoice({ type: MachineChoiceActions.update_machine })
                                        setMachine(props.row.original)
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    )
                }
            },
            // machine
            {
                Header: 'Machine Name',
                accessor: 'name',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "uppercase" }}>{props.row.original.name}</Typography>
                    )
                }
            },
            // machine category
            {
                Header: 'Category',
                accessor: 'category',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "uppercase" }}>{props.row.original.category}</Typography>
                    )
                }
            },
            // machine category
            {
                Header: 'Created At',
                accessor: 'created_at',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "uppercase" }}>{new Date(props.row.original.created_at).toLocaleString()}</Typography>
                    )
                }
            },
            // machine category
            {
                Header: 'Created By',
                accessor: 'created_by',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.created_by.username}</Typography>
                    )
                }
            },
            // machine category
            {
                Header: 'Last Updated At',
                accessor: 'updated_at',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "uppercase" }}>{new Date(props.row.original.updated_at).toLocaleString()}</Typography>
                    )
                }
            },
            // machine category
            {
                Header: 'Last Updated By',
                accessor: 'updated_by',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.updated_by.username}</Typography>
                    )
                }
            },
    ]
    , [setChoice]
  )
           
    //setup machines
    useEffect(() => {
        if (isSuccess) {
            setDATA(machines.data)
        }
    }, [isSuccess, machines])

    return (
        <>
            <MachineTable data={MemoData} columns={MemoColumns} />
            {
                machine ?
                    <>
                        <UpdateMachineDialog machine={machine} />
                    </>
                    : null
            }
            {
                isLoading && <LinearProgress />
            }
        </>
    )
}
