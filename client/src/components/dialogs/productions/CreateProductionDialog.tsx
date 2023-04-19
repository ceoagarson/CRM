import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack } from '@mui/material'
import { useContext } from 'react'
import { ChoiceContext, ProductionChoiceActions } from '../../../contexts/dialogContext'
import {useState} from "react";

type Props={
    setDate: React.Dispatch<React.SetStateAction<{
        year: number;
        month: string;
        day: number;
    } | undefined>>
}

function CreateProductionDialog({ setDate }:Props) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === ProductionChoiceActions.new_production ? true : false}
            onClose={() => setChoice({ type: ProductionChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
               Select Date Of Production
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" color="error">
                    <input type="date" onChange={(e)=>{
                        let selected_date = new Date(e.currentTarget.value).toString()
                        let arr=selected_date.split(" ")
                        setDate({ year: Number(arr[3]), month: String(arr[1]), day: Number(arr[2])})
                    }} />
                </Typography>
            </DialogContent>
            <Stack
                direction="column"
                gap={2}
                padding={2}
                width="100%"
            >
                <Button fullWidth variant="outlined"
                    onClick={() => setChoice({ type: ProductionChoiceActions.close })}>Cancel</Button>
            </Stack >
        </Dialog >
    )
}

export default CreateProductionDialog
