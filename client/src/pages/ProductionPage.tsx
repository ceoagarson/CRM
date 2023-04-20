import { Stack, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import NewProductionForm from '../components/forms/production/NewProductionForm'
import { IMachine } from '../types/machine.types'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { BackendError } from '../types'
import { GetMachines } from '../services/MachineServices'
import { apiClient } from '../services/utils/AxiosInterceptor'
import { IProduction } from '../types/production.type'
import UpdateProductionForm from '../components/forms/production/UpdateProductionForm'

function ProductionPage() {
  const [date, setDate] = useState<string>()
  const [DATA, setDATA] = useState<IProduction[]>([])
  const [machines, setMachines] = useState<IMachine[]>()
  const { data, isSuccess, isLoading, refetch, isFetched } = useQuery
    <AxiosResponse<IProduction[]>, BackendError>("productionBydate", async () => {
      return await apiClient.get(`/bydate/productions/?date=${date}`)
    }, {
      enabled: false
    })

  const { data: machinesData, isSuccess: isSuccessMachines, refetch: RefetchMachines } = useQuery
    <AxiosResponse<IMachine[]>, BackendError>("machines", GetMachines, {
      enabled: false
    })

  useEffect(() => {
    if (isSuccess) {
      setDATA(data.data)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isSuccessMachines)
      setMachines(machinesData.data)
  }, [isSuccess, machinesData])

  useEffect(() => {
    if (date)
      refetch()
    // eslint-disable-next-line 
  }, [date])

  useEffect(() => {
    if (isFetched && date)
      if (!data?.data.length)
        RefetchMachines()
    // eslint-disable-next-line 
  }, [isFetched, date, data])
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

      {/* add production form */}
      {DATA && DATA.length ?
        <UpdateProductionForm productions={DATA} /> :
        null
      }
      {date && machines && machines.length ? <NewProductionForm machines={machines} date={new Date(date)} /> : null}
    </>
  )
}

export default ProductionPage