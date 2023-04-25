import { useRef, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { BackendError } from '../../../types'
import { NewProduction } from '../../../services/ProductionServices'
import { Button, Stack, Table, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { IMachine } from '../../../types/production.type'


function NewProductionForm({ date, data }: { date: string, data: IMachine[] }) {
    const [machines, setMachines] = useState<IMachine[]>(data)
    const [displayCreateBtn, setDisplayCreateBtn] = useState(true)
    const [remount, setRemount] = useState(true)
    //new production 
    const { mutate, isError, error, isSuccess, isLoading } = useMutation<AxiosResponse<string>, BackendError, {
        machine_id: string, production: string, created_at: Date
    }>(NewProduction)
    const inputRef = useRef<HTMLInputElement | null>(null)

    function handleCreateTable() {
        if (date && machines && machines.length) {
            machines.forEach((machine) => {
                mutate({
                    machine_id: machine._id,
                    production: "0",
                    created_at: new Date(date)
                })
            })
        }
    }
    // setup machines
    useEffect(() => {
        setMachines(data)
    }, [data])

    // remount input
    useEffect(() => {
        setDisplayCreateBtn(true)
        setRemount(false)
        setTimeout(() => {
            setRemount(true)
        }, 100)
        inputRef.current?.focus()

    }, [date, inputRef])

    return (
        <>

            {isSuccess ? <Typography sx={{ color: "green" }}>Saved Production</Typography> : null}
            {isLoading ? <Typography sx={{ color: "green" }}>Saving Production</Typography> : null}
            {isError ? <Typography sx={{ color: "red" }}>Error while saving Production</Typography> : null}
            {error ? <Typography sx={{ color: "red" }}>Error: {error.response.data.message}</Typography> : null}

            {
                displayCreateBtn ?
                    <>
                        <Stack
                            direction="column" p={2} justifyContent="center" alignItems="center"
                        >
                            <Typography sx={{ color: "grey" }}>No Production Data found on this Date</Typography>
                            <Button
                                onClick={() => {
                                    handleCreateTable()
                                    setDisplayCreateBtn(false)
                                }}
                                color="primary" sx={{ fontWeight: "bold" }}>Create New Production Table</Button>
                        </Stack>
                    </>
                    :
                    // table
                    <Stack direction="column" gap={2}>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Selected Date</TableCell>
                                    <TableCell>Machine Name</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>
                                        Production
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                date && machines.length > 0 && machines.map((machine, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{new Date(date).toDateString()}</TableCell>
                                            <TableCell>{machine.name.toUpperCase()}</TableCell>
                                            <TableCell>{machine.category.category.toUpperCase()}</TableCell>
                                            <TableCell>
                                                {
                                                    remount ? <TextField variant="standard"
                                                        ref={inputRef}
                                                        type="number"
                                                        onChange={(e) => {
                                                            if (e.currentTarget.value)
                                                                mutate({
                                                                    machine_id: machine._id,
                                                                    production: String(e.currentTarget.value),
                                                                    created_at: new Date(date)
                                                                })
                                                        }} /> : null
                                                }

                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </Table >
                    </Stack>
            }
        </>
    )
}

export default NewProductionForm
