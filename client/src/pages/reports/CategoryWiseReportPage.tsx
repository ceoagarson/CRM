import { useQuery } from "react-query"
import React, { useState, useEffect } from "react";
import { AxiosResponse } from "axios"
import { BackendError } from "../../types"
import { ReportsTable } from "../../components/tables/ReportTable";
import { Typography } from "@mui/material";
import { GetProductionByDateRange } from "../../services/ProductionServices";
import { IProduction } from "../../types/production.type";
import { Column } from "react-table";


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
  a?: any,
  b?: any
}


export default function ICategoryWiseReportPage({ startDate, endDate }: Props) {
  const [tableData, setTableData] = useState<ICategoryWiseReport[]>([])
  const { data, isSuccess, refetch } = useQuery
    <AxiosResponse<IProduction[]>, BackendError>(["category_wise_reports", startDate, endDate], () => GetProductionByDateRange(startDate, endDate), {
      refetchOnMount: true
    })

  const MemoData = React.useMemo(() => tableData, [tableData])
  const MemoColumns: Column<ICategoryWiseReport>[] = React.useMemo(
    () => [

      //Date
      {
        Header: 'Date',
        accessor: 'date',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.date ? new Date(props.row.original.date).toLocaleString() : ""}</Typography>
          )
        }
      },
      //Machine1
      {
        Header: "a",
        accessor: 'a',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.categories[0] ? props.row.original.categories[0].production : ""}</Typography>
          )
        }
      },
      //Machine1
      {
        Header: "b",
        accessor: 'b',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.categories[1] ? props.row.original.categories[1].production : ""}</Typography>
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
      let categories: ICategoryWiseReport['categories'] = []
      let reportIndex = 0
      let report: ICategoryWiseReport[] = []
      data.data.map((item, index) => {
        if (String(prevDate) === String(item.created_at)) {
          categories.push({ category: item.machine.category, production: "0" })
        }
        else {
          report[reportIndex] = {
            date: prevDate,
            categories: categories
          }
          reportIndex++
          prevDate = item.created_at
          categories = []
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
