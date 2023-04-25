import { Stack, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { BackendError } from '../types'
import { GetProductionByDate } from '../services/ProductionServices'
import { IMachine, IProduction } from '../types/production.type'
import NewProductionForm from '../components/forms/production/NewProductionForm'
import UpdateProductionPage from './production/UpdateProductionPage'
import { GetMachines } from '../services/MachineServices'

function ProductionPage() {
  const [date, setDate] = useState<string>()
  const [display, setDisplay] = useState(false)
  const [machines, setMachines] = useState<IMachine[]>([])
  const [productions, setProductions] = useState<IProduction[]>([])

  //fetch production by date selected
  const { data, isSuccess, refetch } = useQuery
    <AxiosResponse<IProduction[]>, BackendError>(["productionBydate", date], () => GetProductionByDate(date))

  //fetch machines available
  const { data: machinesData, isSuccess: isSuccessMachines } = useQuery
    <AxiosResponse<IMachine[]>, BackendError>("getmachines", GetMachines)

  //setup machines
  useEffect(() => {
    if (isSuccessMachines) {
      setMachines(machinesData.data)
    }
  }, [isSuccessMachines, machinesData])

  //setup production
  useEffect(() => {
    if (isSuccess && data.data.length > 0) {
      let customData: IProduction[] = []
      machines.length > 0 && machines.forEach((machine) => {
        data.data.map((item) => {
          if (item.machine.name === machine.name)
            customData.push(item)
          return null
        })
      })
      setDisplay(false)
      setProductions(customData)
    }

    if (isSuccess && data.data.length === 0) {
      setProductions([])
      setDisplay(true)
    }
  }, [isSuccess, data, machines])


  useEffect(() => {
    if (date) {
      refetch()
    }
    else {
      let today = new Date();
      let dt = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
      setDate(dt)
    }
  }, [date, refetch])

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
        <input type="date" defaultValue={date} onChange={(e) => {
          setDate(e.currentTarget.value)
        }} />
      </Stack>

      {/* new production page */}
      {date && display && productions.length === 0 ? <NewProductionForm date={date} data={machines} /> : null}
      {/* update production page */}
      {date && !display && productions.length > 0 ? <UpdateProductionPage data={productions} /> : null}
    </>
  )
}

export default ProductionPage