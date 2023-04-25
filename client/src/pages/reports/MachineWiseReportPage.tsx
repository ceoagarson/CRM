import { useQuery } from "react-query"
import React, { useState, useEffect } from "react";
import { AxiosResponse } from "axios"
import { BackendError } from "../../types"
import { ReportsTable } from "../../components/tables/ReportTable";
import { Stack, Typography } from "@mui/material";
import { GetProductionByDateRange } from "../../services/ProductionServices";
import { IProduction } from "../../types/production.type";
import { Column } from "react-table";
import { IMachine } from "../../types/machine.types";


type Props = {
  startDate?: string,
  endDate?: string,
  machinesData: IMachine[]
}

type ICustomMachine = {
  name: string, category: string, production: string
}
export type IMachineWiseReport = {
  date: Date,
  machines: ICustomMachine[],
}


export default function IMachineWiseReportPage({ startDate, endDate, machinesData }: Props) {
  const [tableData, setTableData] = useState<IMachineWiseReport[]>([])
  const [machines, setMachines] = useState<IMachine[]>(machinesData)

  const { data, isSuccess, refetch } = useQuery
    <AxiosResponse<IProduction[]>, BackendError>(["productionsbydaterange", startDate, endDate], () => GetProductionByDateRange(startDate, endDate))

  const MemoData = React.useMemo(() => tableData, [tableData])

  const customColumns: Column<any>[] = machines.map((machine, index) => {
    return {
      Header: machine.name.toUpperCase(),
      accessor: machine.name,
      Cell: (props) => {
        console.log(props)
        return (
          <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[index] ? props.row.original.machines[index].production : "0"}</Typography>
        )
      },
      Footer: (props) => {
        let total = 0
        props.rows.map((row) => {
          if (row.original.machines[index])
            total += Number(row.original.machines[index].production)
          return null

        })
        return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{total}</Stack>
      }
    }
  })

  const MemoColumns: Column<any>[] = React.useMemo(
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
          return <Stack sx={{ pt: 2, fontWeight: 'bold', ml: 2 }} justifyContent={"center"} alignItems={"left"}>Total</Stack>
        }
      },
      ...customColumns
    ]
    , []
  )

  //setup machines
  useEffect(() => {
    setMachines(machinesData)
  }, [machinesData])

  //setup reports
  useEffect(() => {
    if (isSuccess) {
      let prevDate = data.data.length > 0 ? data.data[0].created_at : new Date()
      let machinesPrev: IMachineWiseReport['machines'] = []
      let reportIndex = 0
      let report: IMachineWiseReport[] = []
      data.data.map((item, index) => {
        if (String(item.created_at) === String(prevDate)) {
          machinesPrev.push({ name: item.machine.name, category: item.machine.category, production: item.production })
        }
        else {
          prevDate = item.created_at
          machinesPrev = []
          machinesPrev.push({ name: item.machine.name, category: item.machine.category, production: item.production })
          reportIndex++
        }
        report[reportIndex] = {
          date: prevDate,
          machines: machinesPrev
        }
        return null
      })
      let customData = report
      let customMachines: ICustomMachine[] = []
      customData = customData.map((item) => {
        machines.length > 0 && machines.forEach((machine) => {
          item.machines.forEach((mItem) => {
            if (mItem.name === machine.name)
              customMachines.push(mItem)
          })
        })
        let updatedMachines = customMachines
        customMachines = []
        return {
          ...item,
          machines: updatedMachines
        }
      })
      setTableData(customData)
    }
  }, [isSuccess, data, machines])

  useEffect(() => {
    refetch()
    // eslint-disable-next-line 
  }, [startDate, endDate])
  return (
    <>
      {data?.data.length === 0 ? <Typography>No Data Found</Typography> : null}
      {tableData.length > 0 ?
        <ReportsTable data={MemoData} columns={MemoColumns} /> : null}
    </>
  )
}
