import { AxiosResponse } from 'axios';
import { useState } from "react";
import { useMutation } from 'react-query';
import { queryClient } from '../../..';
import { BackendError } from '../../../types';
import { NewProduction } from '../../../services/ProductionServices';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { IProduction } from '../../../types/production.type';

type Props = {
    productions: IProduction[]
}
function UpdateProductionForm({ productions }: Props) {
    const [displayInput, setDisplayInput] = useState(false)
    const { mutate, isSuccess, isLoading, isError, error } = useMutation
        <AxiosResponse<string>, BackendError, {
            machine_id: string, production: number, created_at: Date
        }>
        (NewProduction, {
            onSuccess: () => queryClient.invalidateQueries('machines')
        })
    return (
        <>
            <h1>update production</h1>
            {isSuccess ? <Typography sx={{ color: "green" }}>{"saved"}</Typography> : null}
            {isLoading ? <Typography>{"saving"}</Typography> : null}
            {isError ? <Typography sx={{ color: "red" }}>{"error while saving"}</Typography> : null}
            {error ? <Typography sx={{ color: "red" }}>error:{error.response.data.message}</Typography> : null}
            {productions && productions.length ?
                <Box
                    sx={{
                        overflow: "scroll",
                        height: '70vh'
                    }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Machine</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Production</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                productions.map((production, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{new Date(production.created_at).toDateString()}</TableCell>
                                            <TableCell>{production.machine.machine.toUpperCase()}</TableCell>
                                            <TableCell>{production.machine.category}</TableCell>

                                            <TableCell>
                                                <input type="number"
                                                    defaultValue={String(production.production)}
                                                    onChange={(e) => {
                                                        if (e.currentTarget.value)
                                                            mutate({
                                                                machine_id: production.machine._id,
                                                                production: Number(e.currentTarget.value),
                                                                created_at: production.created_at
                                                            })
                                                    }} />
                                            </TableCell>
                                            <TableCell onClick={() => setDisplayInput(true)}>{production.production}</TableCell>

                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Box>
                :
                null
            }
        </>
    )
}

export default UpdateProductionForm
