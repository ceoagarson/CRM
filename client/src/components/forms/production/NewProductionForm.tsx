import { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { queryClient } from '../../..';
import { BackendError } from '../../../types';
import { NewProduction } from '../../../services/ProductionServices';
import { IMachine } from '../../../types/machine.types';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

type Props = {
    machines: IMachine[],
    date: Date
}
function NewProductionForm({ machines, date }: Props) {
    const { mutate, isSuccess, isLoading, isError, error } = useMutation
        <AxiosResponse<string>, BackendError, {
            machine_id: string, production: number,created_at:Date
        }>
        (NewProduction, {
            onSuccess: () => queryClient.invalidateQueries('machines')
        })
    return (
        <>
            {isSuccess ? <Typography sx={{ color: "green" }}>{"saved"}</Typography> : null}
            {isLoading ? <Typography>{"saving"}</Typography> : null}
            {isError ? <Typography sx={{ color: "red" }}>{"error while saving"}</Typography> : null}
            {error ? <Typography sx={{ color: "red" }}>error:{error.response.data.message}</Typography> : null}
            {date ?
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
                                <TableCell>Production</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                machines.map((machine, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{date.toDateString()}</TableCell>
                                            <TableCell>{machine.machine.toUpperCase()}</TableCell>
                                            <TableCell>{machine.category}</TableCell>
                                            <TableCell>
                                                <input type="number" onChange={(e) => {
                                                    if (e.currentTarget.value)
                                                        mutate({
                                                            machine_id: machine._id, production: Number(e.currentTarget.value), 
                                                            created_at:date
                                                        })
                                                }} />
                                            </TableCell>
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

export default NewProductionForm
