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
                accessor: 'machine',
                Cell: (props) => {
                    return (
                        <Typography sx={{ textTransform: "uppercase" }}>{props.row.original.machine}</Typography>
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
