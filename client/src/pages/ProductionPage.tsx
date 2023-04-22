import { Stack, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { IMachine } from '../types/machine.types'
import { useMutation, useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { BackendError } from '../types'
import { GetMachines } from '../services/MachineServices'
import { NewProduction, GetProductionByDate } from '../services/ProductionServices'
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { IProduction } from '../types/production.type'
import NewProductionForm from '../components/forms/production/NewProductionForm'
import UpdateProductionPage from './production/UpdateProductionPage'

function ProductionPage() {
  const [date, setDate] = useState<string>()
  const [newProduction, setNewProduction] = useState(false)
  const [productions, setProductions] = useState<IProduction[]>([])
  //fetch production by date selected
  const { data, isSuccess, isLoading, refetch } = useQuery
    <AxiosResponse<IProduction[]>, BackendError>(["productionbydate", date], () => GetProductionByDate(date), {
      enabled: false
    })

  //fetch production
  useEffect(() => {
    if (isSuccess && data.data.length > 0) {
      setNewProduction(false)
      setProductions(data.data)
    }
    if (isSuccess && data.data.length === 0) {
      setNewProduction(true)
    }
  }, [isSuccess, data, productions])

  useEffect(() => {
    if (date) {
      refetch()
    }
  }, [date])

  return (
    <>
      {/* date of production */}
      <Stack
        sx={{ p: 2 }}
        gap={2}
        alignItems="center"
        justifyContent={"center"}
      >
        <Typography variant="h6">Select Date Of Production</Typography>
        <input type="date" onChange={(e) => {
          setDate(e.currentTarget.value)
        }} />
      </Stack>
      {newProduction && date ? <NewProductionForm date={date} createProduction={newProduction} /> : null}

      {date && productions && productions.length > 0 && !newProduction ? <UpdateProductionPage date={date} data={productions} /> : null}
    </>
  )
}

export default ProductionPage