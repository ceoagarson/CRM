import React, { useEffect, useState } from 'react'
import { IMachine } from '../../../types/machine.types'
import { AxiosResponse } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { BackendError } from '../../../types'
import { GetMachines } from '../../../services/MachineServices'
import { NewProduction } from '../../../services/ProductionServices'


function NewProductionForm({ date, createProduction }: { date: string, createProduction :Boolean}) {
    const [machines,setMachines]=useState<IMachine[]>([])
    const { data, isSuccess } = useQuery
    <AxiosResponse<IMachine[]>, BackendError>("getmachines", GetMachines)
    const { mutate } = useMutation<AxiosResponse<string>, BackendError, {
        machine_id: string, production: string, created_at: Date
    }>(NewProduction)

    useEffect(() => {
        if (isSuccess) {
            setMachines(data.data)
        }
    }, [isSuccess, machines, date, data])

    useEffect(()=>{
        if (date && createProduction&&machines.length > 0) {
            machines.forEach((machine) => {
                mutate({
                    machine_id: machine._id,
                    production: "0",
                    created_at: new Date(date)
                })
            })
        }
    }, [date, createProduction,machines,mutate])
  return (
    <div>NewProductionForm</div>
  )
}

export default NewProductionForm
