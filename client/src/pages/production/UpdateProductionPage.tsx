import { useContext } from "react"
import { useEffect, useState } from "react";
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { IProduction } from '../../types/production.type';
import { ChoiceContext, ProductionChoiceActions } from '../../contexts/dialogContext';
import UpdateProductionDialog from '../../components/dialogs/production/UpdateProductionDialog';

type Props = {
    data: IProduction[]
}
function UpdateProductionPage({ data }: Props) {
    const { setChoice } = useContext(ChoiceContext)
    const [productions, setProductions] = useState(data)


    useEffect(() => {
        setProductions(data)
    }, [data])

    return (
        <>
            <h1>update production</h1>
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
                                            <TableCell>{production.machine.name.toUpperCase()}</TableCell>
                                            <TableCell>{production.machine.category}</TableCell>
                                            <TableCell onClick={() => { setChoice({ type: ProductionChoiceActions.update_production }) }}>
                                                <span>{production.production}</span>
                                            </TableCell>
                                            <UpdateProductionDialog
                                                machine_id={production.machine._id}
                                                production={production.production}
                                                created_at={production.created_at}
                                            />
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

export default UpdateProductionPage
