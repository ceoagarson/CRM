import { useQuery } from "react-query"
import React, { useState, useEffect } from "react";
import { AxiosResponse } from "axios"
import { BackendError } from "../../types"
import { ReportsTable } from "../../components/tables/ReportTable";
import { Stack, Typography } from "@mui/material";
import { GetProductionByDateRange } from "../../services/ProductionServices";
import { IProduction } from "../../types/production.type";
import { Column } from "react-table";
import { IMachineWiseReport } from "./MachineWiseReportPage";


type Props = {
  startDate?: string,
  endDate?: string
}

type ICategoryWiseReport = {
  date: Date,
  categories: {
    category: string,
    production: string
  }[],
  // react table only
  a?: any,
  b?: any
}


export default function ICategoryWiseReportPage({ startDate, endDate }: Props) {
  const [tableData, setTableData] = useState<ICategoryWiseReport[]>([])
  const { data, isSuccess, refetch } = useQuery
    <AxiosResponse<IProduction[]>, BackendError>(["productionsbydaterange", startDate, endDate], () => GetProductionByDateRange(startDate, endDate))

  const MemoData = React.useMemo(() => tableData, [tableData])
  const MemoColumns: Column<ICategoryWiseReport>[] = React.useMemo(
    () => [

      //Date
      {
        Header: 'Date',
        accessor: 'date',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.date ? new Date(props.row.original.date).toLocaleDateString() : ""}</Typography>
          )
        }
        ,
        Footer: () => {
          return <Stack sx={{ pt: 2, ml: 2, fontWeight: "bold" }} justifyContent={"center"} alignItems={"left"}>Total</Stack>
        }
      },
      //Machine1
      {
        Header: "A",
        accessor: 'a',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.categories[0] ? props.row.original.categories[0].production : ""}</Typography>
          )
        }
        ,
        Footer: (props) => {
          let totalA = 0
          props.rows.map((row) => {
            totalA += Number(row.original.categories[0].production) || 0
            return null

          })
          return <Stack sx={{ pt: 2, ml: 2,fontWeight:"bold",borderBottom:1 }} justifyContent={"center"} alignItems={"left"}>{totalA}</Stack>
        }        
      },
      //Machine1
      {
        Header: "B",
        accessor: 'b',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.categories[1] ? props.row.original.categories[1].production : ""}</Typography>
          )
        }
        ,
        Footer: (props) => {
          let totalB = 0
          props.rows.map((row) => {
            totalB += Number(row.original.categories[1].production) || 0
            return null
          })
          return <Stack sx={{ pt: 2, ml: 2,fontWeight:"bold",borderBottom:1 }} justifyContent={"center"} alignItems={"left"}>{totalB}</Stack>
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
      data.data.map((item) => {
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
      let categoryReport: ICategoryWiseReport[] = []
      let productionA = 0
      let productionB = 0
      report.forEach((item) => {
        item.machines.map((machine) => {
          if (machine.category === "A")
            productionA += Number(machine.production)
          if (machine.category === "B")
            productionB += Number(machine.production)
          return null
        })
        categoryReport.push({ date: item.date, categories: [{ category: "A", production: String(productionA) }, { category: "B", production: String(productionB) }] })
        productionA = 0
        productionB = 0
      })
      setTableData(categoryReport)
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
