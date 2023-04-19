import { Button, Stack, TextField, Typography } from '@mui/material'
import { ChoiceContext, ProductionChoiceActions } from '../contexts/dialogContext'
import { useContext, useState, useEffect } from 'react'
import NewProductionForm from '../components/forms/production/NewProductionForm'
import { IMachine } from '../types/machine.types'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { BackendError } from '../types'
import { GetMachines } from '../services/MachineServices'
import { Visibility } from '@mui/icons-material'
import CategoryWiseReport from './reports/CategoryWiseReport'
import MachineWiseReport from './reports/MachineWiseReport'

function ProductionPage() {
  const { choice, setChoice } = useContext(ChoiceContext)
  const [date, setDate] = useState<Date>()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [machines, setMachines] = useState<IMachine[]>()
  const { data, isSuccess } = useQuery
    <AxiosResponse<IMachine[]>, BackendError>("machines", GetMachines, {
      refetchOnMount: true
    })

  useEffect(() => {
    if (isSuccess)
      setMachines(data.data)
  }, [isSuccess, data])

  return (
    <>
      <Stack
        direction="row"
        gap={2}
        padding={2}
        width="100%"
        sx={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
        alignItems={"space-between"}
        justifyContent={"space-between"}
      >
        <Typography variant='h6' sx={{ color: "white" }}>Productions</Typography>
        <Stack
          direction="row"
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Button variant="outlined" color="warning"
            onClick={() => {
              setChoice({ type: ProductionChoiceActions.select_production_date })
              setStartDate(undefined)
              setEndDate(undefined)
            }}
          >
            New Production
          </Button>
          <Button variant="outlined" color="error"
            onClick={() => {
              setChoice({ type: ProductionChoiceActions.select_date_range })
              setStartDate(undefined)
              setEndDate(undefined)
            }}
          >
            <Visibility sx={{ mr: 1 }} /> Reports
          </Button>
        </Stack>
      </Stack >
      {
        choice === ProductionChoiceActions.select_production_date ?
          <> <Stack
            sx={{ p: 2 }}
            alignItems="center"
            justifyContent={"center"}
          >
            <Typography variant="h6">Select Date Of Production</Typography>
            <input type="date" onChange={(e) => {
              setDate(new Date(e.currentTarget.value))
              setChoice({ type: ProductionChoiceActions.new_production })
            }} />
          </Stack>
          </>
          : null
      }
      {
        choice === ProductionChoiceActions.select_date_range ?
          <> <Stack
            sx={{ p: 2 }}
            alignItems="center"
            justifyContent={"center"}
          >
            <Typography variant="h6">Start Date</Typography>
            <input type="date" onChange={(e) => {
              setStartDate(new Date(e.currentTarget.value))
            }} />
            <Typography variant="h6">End Date</Typography>
            <input type="date" onChange={(e) => {
              setEndDate(new Date(e.currentTarget.value))
            }} />
          </Stack>
          </>
          : null
      }
      {
        startDate && endDate ?
          <>
            <TextField
              variant='standard'
              select
              SelectProps={{
                native: true
              }}
              focused
              required
              id="reports"
              label="Select Report Type"
              fullWidth
              onChange={(e) => {
                if (e.currentTarget.value) {
                  if (e.currentTarget.value === "machine_wise")
                    setChoice({ type: ProductionChoiceActions.report_machine_wise })
                  if (e.currentTarget.value === "category_wise")
                    setChoice({ type: ProductionChoiceActions.report_category_wise })
                }
              }}
            >
              <option value="">Select One</option>
              <option value="machine_wise">Machine Wise</option>
              <option value="category_wise">Category Wise</option>
            </TextField>
            {/* category wise report */}
            {
              choice === ProductionChoiceActions.report_category_wise ?
                <>
                  <Stack direction="row">
                    <Typography variant="h6">{startDate?.toLocaleDateString()} - </Typography>
                    <Typography variant="h6">{endDate?.toLocaleDateString()}</Typography>
                  </Stack>
                  <CategoryWiseReport startDate={startDate} endDate={endDate} />
                </>
                : null
            }
            {/* machine wise report */}
            {
              choice === ProductionChoiceActions.report_machine_wise ?
                <>
                  <Stack direction="row">
                    <Typography variant="h6">{startDate?.toLocaleDateString()} - </Typography>
                    <Typography variant="h6">{endDate?.toLocaleDateString()}</Typography>
                  </Stack>
                  <MachineWiseReport startDate={startDate} endDate={endDate} />
                </>
                : null
            }
          </>
          : null
      }
      {
        choice === ProductionChoiceActions.new_production ?
          <>
            {machines && date ?
              <NewProductionForm machines={machines} date={date} /> : null
            }
          </>
          : null
      }
     
    </>
  )
}

export default ProductionPage