import { Stack, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { IMachine } from '../types/machine.types'
import { useMutation, useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { BackendError } from '../types'
import { GetMachines } from '../services/MachineServices'
import { NewProduction } from '../services/ProductionServices'

function ProductionPage() {
  const [date, setDate] = useState<string>()
  const [machines, setMachines] = useState<IMachine[]>([])

  // new production 
  const { mutate } = useMutation
    <AxiosResponse<string>, BackendError, {
      machine_id: string, production: string, created_at: Date
    }>
    (NewProduction)

  const { data: machinesData, isSuccess: isSuccessMachines, refetch: RefetechMachines } = useQuery
    <AxiosResponse<IMachine[]>, BackendError>("getmachines", GetMachines, { enabled: false })


  useEffect(() => {
    if (date) {
      RefetechMachines()
    }
  }, [date, RefetechMachines])

  useEffect(() => {
    if (isSuccessMachines) {
      setMachines(machinesData.data)
    }
    if (date && machines.length > 0) {
      machines.forEach((machine) => {
        mutate({
          machine_id: machine._id,
          production: "0",
          created_at: new Date(date)
        })
      })
    }
  }, [isSuccessMachines, machines, date, mutate, machinesData])

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
    </>
  )
}

export default ProductionPage