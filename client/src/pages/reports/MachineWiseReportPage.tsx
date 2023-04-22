import { useQuery } from "react-query"
import React, { useState, useEffect } from "react";
import { AxiosResponse } from "axios"
import { BackendError } from "../../types"
import { ReportsTable } from "../../components/tables/ReportTable";
import {  Typography } from "@mui/material";
import { GetProductionByDateRange } from "../../services/ProductionServices";
import { IProduction } from "../../types/production.type";
import { Column } from "react-table";


type Props = {
  startDate?: string,
  endDate?: string
}

type IMachineWiseReport = {
  date: Date,
  machines: {
    name: string,
    production: string
  }[],
  m1?: any,
  m2?: any
}


export default function IMachineWiseReportPage({ startDate, endDate }: Props) {
  const [tableData, setTableData] = useState<IMachineWiseReport[]>([])
  const { data, isSuccess, refetch } = useQuery
    <AxiosResponse<IProduction[]>, BackendError>(["category_wise_reports", startDate, endDate], () => GetProductionByDateRange(startDate, endDate), {
      refetchOnMount: true
    })

  const MemoData = React.useMemo(() => tableData, [tableData])
  const MemoColumns: Column<IMachineWiseReport>[] = React.useMemo(
    () => [

      //Date
      {
        Header: 'Date',
        accessor: 'date',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.date?new Date(props.row.original.date).toLocaleString():""}</Typography>
          )
        }
      },
      //Machine1
      {
        Header: "m1",
        accessor: 'm1',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[0]?props.row.original.machines[0].production:""}</Typography>
          )
        }
      },
      //Machine1
      {
        Header: "m2",
        accessor: 'm2',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[1] ? props.row.original.machines[1].production : ""}</Typography>
          )
        }
      },
    ]
    , []
  )


  //setup reports
  useEffect(() => {
    if (isSuccess) {
      let prevDate = data.data[0].created_at
      let machines: IMachineWiseReport['machines'] = []
      let reportIndex = 0
      let report: IMachineWiseReport[] = []
      data.data.map((item, index) => {
        if (String(prevDate) === String(item.created_at)) {
          machines.push({ name: item.machine.name, production: item.production })
        }
        else {
          report[reportIndex] = {
            date: prevDate,
            machines: machines
          }
          reportIndex++
          prevDate = item.created_at
          machines = []
        }
        return null
      })
      setTableData(report)
    }
  }, [isSuccess, data])

  useEffect(() => {
    refetch()
    // eslint-disable-next-line 
  }, [startDate, endDate])
console.log(tableData)
  return (
    <>
      {tableData.length > 0 ?
        <ReportsTable data={MemoData} columns={MemoColumns} /> : null}
     
    </>
  )
}
