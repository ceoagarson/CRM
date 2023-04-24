import { useContext,useEffect, useState } from "react"
import { ProductionChoiceActions } from "../contexts/dialogContext"
import { ChoiceContext } from "../contexts/dialogContext"
import { Stack, TextField, Typography } from "@mui/material"
import CategoryWiseReportPage from "./reports/CategoryWiseReportPage"
import MachineWiseReportPage from "./reports/MachineWiseReportPage"
import { IMachine } from "../types/machine.types"
import { AxiosResponse } from "axios"
import { BackendError } from "../types"
import { GetMachines } from "../services/MachineServices"
import { useQuery } from "react-query"


function ReportsPage() {
    const [startDate, setStartDate] = useState<string>()
    const [endDate, setEndDate] = useState<string>()
    const [machines, setMachines] = useState<IMachine[]>([])
    const { choice, setChoice } = useContext(ChoiceContext)
    //fetch machines available
    const { data: machinesData, isSuccess: isSuccessMachines } = useQuery
        <AxiosResponse<IMachine[]>, BackendError>("getmachines", GetMachines)

    //setup machines
    useEffect(() => {
        if (isSuccessMachines) {
            setMachines(machinesData.data)
        }
    }, [isSuccessMachines, machinesData])


    return (
        <>
            {/* select date range */}
            <Stack
                sx={{ p: 2 }}
                direction={"row"}
                alignItems="center"
                justifyContent={"center"}
            >
                <input type="date" onChange={(e) => {
                    setStartDate(e.currentTarget.value)
                }} />
                <Typography sx={{ m: 2 }}>To</Typography>
                <input type="date" onChange={(e) => {
                    setEndDate(e.currentTarget.value)
                }} />
            </Stack>
            {/* select category */}
            <Stack direction="column" justifyContent={"center"} alignItems={"center"} sx={{ p: 2, width: '100%' }}>
                <TextField
                    sx={{ minWidth: "50vw" }}
                    variant='standard'
                    select
                    SelectProps={{
                        native: true
                    }}
                    required
                    disabled={startDate && endDate ? false : true}
                    id="reports"
                    onChange={(e) => {
                        if (e.currentTarget.value) {
                            if (e.currentTarget.value === "machine_wise")
                                setChoice({ type: ProductionChoiceActions.report_machine_wise })
                            if (e.currentTarget.value === "category_wise")
                                setChoice({ type: ProductionChoiceActions.report_category_wise })
                        }
                    }}
                >
                    <option value="">Select Category</option>
                    <option value="machine_wise">Machine Wise Production</option>
                    <option value="category_wise">Category Wise Production</option>
                </TextField>
            </Stack>
            <Stack sx={{ width: "100%" }}>
                {/* category wise report */}
                {
                    choice === ProductionChoiceActions.report_category_wise ?
                        <CategoryWiseReportPage startDate={startDate} endDate={endDate} />
                        : null
                }
                {/* machine wise report */}
                {
                    choice === ProductionChoiceActions.report_machine_wise ?
                        <MachineWiseReportPage startDate={startDate} endDate={endDate} machinesData={machines} />
                        : null
                }
            </Stack>

        </>
    )
}

export default ReportsPage