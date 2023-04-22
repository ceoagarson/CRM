import { useQuery } from "react-query"
import React, { useState, useEffect } from "react";
import { AxiosResponse } from "axios"
import { BackendError } from "../../types"
import { ReportsTable } from "../../components/tables/ReportTable";
import { Stack, Typography } from "@mui/material";
import { GetProductionByDateRange } from "../../services/ProductionServices";
import { IProduction } from "../../types/production.type";
import { Column } from "react-table";


type Props = {
  startDate?: string,
  endDate?: string
}

export type IMachineWiseReport = {
  date: Date,
  machines: {
    name: string,
    production: string,
    category: string
  }[],
  // react table only
  m1?: any,
  m2?: any,
  m3?: any,
  m4?: any
}


export default function IMachineWiseReportPage({ startDate, endDate }: Props) {
  const [tableData, setTableData] = useState<IMachineWiseReport[]>([])
  const { data, isSuccess, refetch } = useQuery
    <AxiosResponse<IProduction[]>, BackendError>(["productionsbydaterange", startDate, endDate], () => GetProductionByDateRange(startDate, endDate))

  const MemoData = React.useMemo(() => tableData, [tableData])
  const MemoColumns: Column<IMachineWiseReport>[] = React.useMemo(
    () => [

      //Date
      {
        Header: 'Date',
        accessor: 'date',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.date ? new Date(props.row.original.date).toLocaleDateString() : ""}</Typography>
          )
        },
         Footer: () => {
          return <Stack sx={{ pt:2,ml:2}} justifyContent={"center"} alignItems={"left"}>Total</Stack>
        }
      },
      //Machine1
      {
        Header: "m1",
        accessor: 'm1',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[0] ? props.row.original.machines[0].production : ""}</Typography>
          )
        },
         Footer: (props)=>{
          let totalm1=0
          props.rows.map((row)=>{
            totalm1 += Number(row.original.machines[0].production)||0
            return null

          })
           return <Stack sx={{ pt: 2, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm1}</Stack>
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
        ,
        Footer: (props) => {
          let totalm2 = 0
          props.rows.map((row) => {
            totalm2 += Number(row.original.machines[1].production) || 0
            return null

          })
          return <Stack sx={{ pt:2,ml:2}} justifyContent={"center"} alignItems={"left"}>{totalm2}</Stack>
        }
      },
      {
        Header: "m3",
        accessor: 'm3',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[1] ? props.row.original.machines[2].production : ""}</Typography>
          )
        }
        ,
        Footer: (props) => {
          let totalm2 = 0
          props.rows.map((row) => {
            totalm2 += Number(row.original.machines[2].production) || 0
            return null

          })
          return <Stack sx={{ pt:2,ml:2}} justifyContent={"center"} alignItems={"left"}>{totalm2}</Stack>
        }
      },
      {
        Header: "m4",
        accessor: 'm4',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[1] ? props.row.original.machines[3].production : ""}</Typography>
          )
        },
        Footer: (props) => {
          let totalm4 = 0
          props.rows.map((row) => {
            totalm4 += Number(row.original.machines[3].production) || 0
            return null
          })
          return <Stack sx={{ pt:2,ml:2}} justifyContent={"center"} alignItems={"left"}>{totalm4}</Stack>
        }
      },
    ]
    , []
  )


  //setup reports
  useEffect(() => {
    if (isSuccess) {
      let prevDate = data.data.length > 0 ? data.data[0].created_at : new Date()
      let machines: IMachineWiseReport['machines'] = []
      let reportIndex = 0
      let report: IMachineWiseReport[] = []
      data.data.map((item, index) => {
        if (String(item.created_at) === String(prevDate)) {
          machines.push({ name: item.machine.name, production: item.production, category: item.machine.category })
        }
        else {
          prevDate = item.created_at
          machines = []
          machines.push({ name: item.machine.name, production: item.production, category: item.machine.category })
          reportIndex++
        }
        report[reportIndex] = {
          date: prevDate,
          machines: machines
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
  return (
    <>
      {tableData.length > 0 ?
        <ReportsTable data={MemoData} columns={MemoColumns} /> : null}

    </>
  )
}
