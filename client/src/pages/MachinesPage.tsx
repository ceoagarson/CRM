import { Edit, Search } from "@mui/icons-material"
import { IconButton, InputAdornment, LinearProgress, Stack, TextField, Tooltip, Typography } from "@mui/material"
import FuzzySearch from 'fuzzy-search';
import { AxiosResponse } from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import { ChoiceContext, MachineChoiceActions } from "../contexts/dialogContext"
import { IMachine } from '../types/production.type'
import { BackendError } from "../types"
import { GetMachines } from "../services/MachineServices"
import { MachineTable } from "../components/tables/MachineTable"
import UpdateMachineDialog from "../components/dialogs/machines/UpdateMachineDialog"
import { SelectionContext } from "../contexts/selectionContext"
import MachineTableMenu from "../components/menu/MachineTableMenu"
import { headColor } from "../utils/colors"
import { FilterContext } from "../contexts/filterContext"


export default function MachinesPage() {
    const { selectedRows } = useContext(SelectionContext)
    const { filter, setFilter } = useContext(FilterContext)
    const { setChoice } = useContext(ChoiceContext)
    const [preFilteredData, setPreFilteredData] = useState<IMachine[]>([])
    const [DATA, setDATA] = useState<IMachine[]>([])
    const [machine, setMachine] = useState<IMachine>()
    const { data: machines, isSuccess, isLoading } = useQuery
        <AxiosResponse<IMachine[]>, BackendError>("machines", GetMachines)
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
                        <Typography sx={{ textTransform: "uppercase" }}>{props.row.original.category.category}</Typography>
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
            setPreFilteredData(machines.data)
        }
    }, [isSuccess, machines])

    //set filter
    useEffect(() => {
        if (filter) {
            const searcher = new FuzzySearch(DATA, ["name", "category", "created_at", "created_by.username", "updated_at", "updated_by.username"], {
                caseSensitive: false,
            });
            const result = searcher.search(filter);
            setDATA(result)
        }
        if (!filter)
            setDATA(preFilteredData)
    }, [filter, preFilteredData,DATA])
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
                    Machines
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
                    <MachineTableMenu
                        selectedFlatRows={selectedRows}
                    />
                </Stack>
            </Stack>
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
