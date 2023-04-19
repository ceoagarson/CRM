import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack, TextField } from '@mui/material'
import { useContext, useState } from 'react'
import { ChoiceContext, ProductionChoiceActions } from '../../../contexts/dialogContext'

function SelectReportDateRangeDialog() {
    const { choice, setChoice } = useContext(ChoiceContext)
    const [startDate, setStartDate] = useState<{ month: string, day: number, year: number }>()
    const [endDate, setEndDate] = useState<{ month: string, day: number, year: number }>()

    return (
        <Dialog open={choice === ProductionChoiceActions.select_date_range ? true : false}
            onClose={() => setChoice({ type: ProductionChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
                Select Start Date and End Date
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" color="error">
                    Start Date :<input type="date" name="start_date"
                        onChange={(e) => console.log(e.currentTarget.value)}
                        required />
                    End Date :<input type="date" name="end_date" required
                    />
                </Typography>

                {
                    startDate && endDate ?
                        < TextField
                            variant='standard'
                            select
                            SelectProps={{
                                native: true
                            }}
                            focused
                            required
                            id="report"
                            label="Select Report Type"
                            fullWidth
                        >
                            <option value={"machine_wise"}>
                                Machine Wise
                            </option>
                            <option value={"category_wise"}>
                                Category Wise
                            </option>
                        </TextField>
                        : null

                }
            </DialogContent>
            <Stack
                direction="column"
                gap={2}
                padding={2}
                width="100%"
            >
                <Button fullWidth variant="contained"
                    onClick={() => setChoice({ type: ProductionChoiceActions.close })}>Cancel</Button>
            </Stack >
        </Dialog >
    )
}

export default SelectReportDateRangeDialog
