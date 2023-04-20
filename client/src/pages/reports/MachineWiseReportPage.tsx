import { useQuery } from "react-query"
import React, { useState, useEffect } from "react";
import { AxiosResponse } from "axios"
import { BackendError } from "../../types"
import { apiClient } from "../../services/utils/AxiosInterceptor";
import { ReportsTable } from "../../components/tables/ReportTable";
import { LinearProgress, Typography } from "@mui/material";
import { Column } from "react-table";

type Props = {
  startDate?: string,
  endDate?: string
}

type IMachineWiseReport = {
  date: Date,
  machines: {
    machine: string,
    production: number
  }[],
  m1?:any,
  m2?:any
}

export default function IMachineWiseReportPage({ startDate, endDate }: Props) {
  const [DATA, setDATA] = useState<IMachineWiseReport[]>([])
  const { data, isSuccess, isLoading, refetch } = useQuery
    <AxiosResponse<IMachineWiseReport[]>, BackendError>("category_wise_reports", async () => {
      return await apiClient.get(`filter/machine/reports?startDate=${startDate}&endDate=${endDate}`)
    }, {
      refetchOnMount: true
    })

  const generateMachineColumns =()=> {
  DATA.forEach((data)=>{
    data.machines.map((machine,index)=>{
      return (
        {
          Header:machine.machine,
          accessor:machine.machine
        }
      )
    })
  })
  }
  const MemoData = React.useMemo(() => DATA, [DATA])
  const MemoColumns: Column<IMachineWiseReport>[] = React.useMemo(
    () => [

      //Date
      {
        Header: 'Date',
        accessor: 'date',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{new Date(props.row.original.date).toDateString()}</Typography>
          )
        }
      },
      //Date
      {
        Header: String("ver-1 (gf)").toUpperCase(),
        accessor: 'm1',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[0].production}</Typography>
          )
        }
      },
      {
        Header: String("ver-2 (gf)").toUpperCase(),
        accessor: 'm2',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[1].production}</Typography>
          )
        }
      },
    ]
    , []
  )

  //setup reports
  useEffect(() => {
    if (isSuccess) {
      setDATA(data.data)
    }
  }, [isSuccess, data])

  useEffect(() => {
    refetch()
    // eslint-disable-next-line 
  }, [startDate, endDate])
  console.log(generateMachineColumns())
  return (
    <>
      <ReportsTable data={MemoData} columns={MemoColumns} />
      {
        isLoading && <LinearProgress />
      }
    </>
  )
}
