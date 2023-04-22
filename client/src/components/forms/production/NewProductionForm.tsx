import React, { useRef, useEffect, useState } from 'react'
import { IMachine } from '../../../types/machine.types'
import { AxiosResponse } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { BackendError } from '../../../types'
import { GetMachines } from '../../../services/MachineServices'
import { NewProduction } from '../../../services/ProductionServices'
import { Stack, Table, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'


function NewProductionForm({ date, createProduction }: { date: string, createProduction: Boolean }) {
    const [machines, setMachines] = useState<IMachine[]>([])
    const [remount, setRemount] = useState(true)
    const { data, isSuccess, isError, error } = useQuery
        <AxiosResponse<IMachine[]>, BackendError>("getmachines", GetMachines)
    const { mutate } = useMutation<AxiosResponse<string>, BackendError, {
        machine_id: string, production: string, created_at: Date
    }>(NewProduction)
    const inputRef = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        if (isSuccess) {
            setMachines(data.data)
        }
    }, [isSuccess, machines, date, data])

    useEffect(() => {
        if (date && createProduction && machines.length > 0) {
            machines.forEach((machine) => {
                mutate({
                    machine_id: machine._id,
                    production: "0",
                    created_at: new Date(date)
                })
            })
        }
    }, [date, createProduction, machines, mutate])

    useEffect(() => {
        setRemount(false)
        setTimeout(()=>{
            setRemount(true)
        },200)
        inputRef.current?.focus()
        
    }, [date, inputRef])

    return (
        <Stack direction="column" gap={2}>
            {isSuccess ? <Typography sx={{ color: "green" }}>Saved Production</Typography> : null}
            {isError ? <Typography sx={{ color: "green" }}>Error while saving Production</Typography> : null}
            {error ? <Typography sx={{ color: "green" }}>Error: {error.response.data.message}</Typography> : null}
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
                    date && createProduction && machines.length > 0 && machines.map((machine, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell>{new Date(date).toDateString()}</TableCell>
                                <TableCell>{machine.name.toUpperCase()}</TableCell>
                                <TableCell>{machine.category}</TableCell>
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
                                            }} />:null
                                    }
                                  
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </Table >
        </Stack>
    )
}

export default NewProductionForm
