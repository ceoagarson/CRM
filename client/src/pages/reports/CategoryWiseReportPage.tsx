import {  LinearProgress, Typography } from "@mui/material"
import { AxiosResponse } from "axios"
import React, {  useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import { apiClient } from "../../services/utils/AxiosInterceptor"
import { BackendError } from "../../types"
import { ReportsTable } from "../../components/tables/ReportTable"

type Props = {
  startDate?: string,
  endDate?: string
}

type ICategoryWiseReport = {
  date: Date,
  categories: {
    category: string,
    production: number
  }[]
}

export default function CategoryWiseReportPage({ startDate, endDate }: Props) {
  const [DATA, setDATA] = useState<ICategoryWiseReport[]>([])
  const { data, isSuccess, isLoading,refetch } = useQuery
    <AxiosResponse<ICategoryWiseReport[]>, BackendError>("category_wise_reports", async () => {
      return await apiClient.get(`filter/category/reports?startDate=${startDate}&endDate=${endDate}`)
    }, {
      refetchOnMount: true
    })
 
  const MemoData = React.useMemo(() => DATA, [DATA])
  const MemoColumns: Column<ICategoryWiseReport>[] = React.useMemo(
    () => [
     

      //Date
      {
        Header: 'Date',
        accessor: 'date',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{new Date(props.row.original.date).toString()}</Typography>
          )
        }
      }
    ]
    , []
  )

  //setup reports
  useEffect(() => {
    if (isSuccess) {
      setDATA(data.data)
    }
  }, [isSuccess, data])

  {/* refetch data */ }
  useEffect(() => {
    refetch()
  }, [startDate, endDate])
  
  return (
    <>
      <ReportsTable data={MemoData} columns={MemoColumns} />
      {
        isLoading && <LinearProgress />
      }
    </>
  )
}
