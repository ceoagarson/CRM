import { useQuery } from "react-query"
import  React, { useState, useEffect } from "react";
import { AxiosResponse } from "axios"
import { BackendError } from "../../types"
import { ReportsTable } from "../../components/tables/ReportTable";
import { LinearProgress, Typography} from "@mui/material";
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
  }[]
}


export default function IMachineWiseReportPage({ startDate, endDate }: Props) {
  const [tableData, setTableData] = useState<IMachineWiseReport[]>([])
  const { data, isSuccess, isLoading, refetch } = useQuery
    <AxiosResponse<IProduction[]>, BackendError>(["category_wise_reports", startDate, endDate], () => GetProductionByDateRange(startDate, endDate), {
      refetchOnMount: true
    })
  
  const MemoData = React.useMemo(() => data, [data])
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
        accessor: 'machines',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[0].production}</Typography>
          )
        }
      }
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

  useEffect(()=>{
    if(tableData.length>0)
      console.log(Object.keys(tableData[0].machines))
  },[tableData])
  console.log(tableData)
  return (
    <>
      {/* <ReportsTable data={tableData[0].machines} columns={columns} /> */}
      {
        isLoading && <LinearProgress />
      }
    </>
  )
}
