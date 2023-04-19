import { AxiosResponse } from "axios"
import { BackendError } from "../../types"
import { useQuery } from "react-query"
import { apiClient } from "../../services/utils/AxiosInterceptor"
import { useEffect, useState } from "react"
import { IProduction } from "../../types/production.type"

type Props={
  startDate:Date,
  endDate:Date
}
function MachineWiseReport({startDate,endDate}:Props) {
  const [productions,setProductions]=useState<IProduction[]>()
  const { data, isSuccess } = useQuery
    <AxiosResponse<IProduction[]>, BackendError>("machines",async()=>{
      return await apiClient.get(`filter/productions?startDate=${startDate}&endDate=${endDate}`)
    })

  useEffect(() => {
    if (isSuccess)
      setProductions(data.data)
  }, [isSuccess, data])
  console.log(productions)

  return (
    <div>MachineWiseReport</div>
  )
}

export default MachineWiseReport