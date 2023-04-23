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
  // react table only
  m1?: any,
  m2?: any,
  m3?: any,
  m4?: any,
  m5?: any,
  m6?: any,
  m7?: any,
  m8?: any,
  m9?: any,
  m10?: any,
  m11?: any,
  m12?: any,
  m13?: any,
  m14?: any,
  m15?: any,
  m16?: any,
  m17?: any,
  m18?: any,
  m19?: any,
  m20?: any
}


export default function IMachineWiseReportPage({ startDate, endDate, machinesData }: Props) {
  const [tableData, setTableData] = useState<IMachineWiseReport[]>([])
  const [machines, setMachines] = useState<IMachine[]>(machinesData)

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
          return <Stack sx={{ pt: 2, fontWeight: 'bold', ml: 2 }} justifyContent={"center"} alignItems={"left"}>Total</Stack>
        }
      },
      //Machine1
      {
        Header: "VER-1 (GF)",
        accessor: 'm1',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[0].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm1 = 0
          props.rows.map((row) => {
            totalm1 += Number(row.original.machines[0].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm1}</Stack>
        }
      },
      //Machine2
      {
        Header: "VER-2 (GF)",
        accessor: 'm2',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[1].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm2 = 0
          props.rows.map((row) => {
            totalm2 += Number(row.original.machines[1].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm2}</Stack>
        }
      },
      //Machine3
      {
        Header: "VER-3 (GF)",
        accessor: 'm3',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[2].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm3 = 0
          props.rows.map((row) => {
            totalm3 += Number(row.original.machines[2].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm3}</Stack>
        }
      },
      //Machine4
      {
        Header: "VER-4 (GF)",
        accessor: 'm4',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[3].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm4 = 0
          props.rows.map((row) => {
            totalm4 += Number(row.original.machines[3].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm4}</Stack>
        }
      },
      //Machine5
      {
        Header: "VER-5 (GF)",
        accessor: 'm5',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[4].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm5 = 0
          props.rows.map((row) => {
            totalm5 += Number(row.original.machines[4].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm5}</Stack>
        }
      },
      //Machine6
      {
        Header: "VER-6 (GF)",
        accessor: 'm6',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[5].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm6 = 0
          props.rows.map((row) => {
            totalm6 += Number(row.original.machines[5].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm6}</Stack>
        }
      },
      //Machine7
      {
        Header: "LYM-7",
        accessor: 'm7',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[6].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm7 = 0
          props.rows.map((row) => {
            totalm7 += Number(row.original.machines[6].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm7}</Stack>
        }
      },
      //Machine8
      {
        Header: "LYM-8",
        accessor: 'm8',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[7].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm8 = 0
          props.rows.map((row) => {
            totalm8 += Number(row.original.machines[7].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm8}</Stack>
        }
      },
      //Machine9
      {
        Header: "LYM-9",
        accessor: 'm9',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[8].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm9 = 0
          props.rows.map((row) => {
            totalm9 += Number(row.original.machines[8].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm9}</Stack>
        }
      },
      //Machine10
      {
        Header: "VER-10 (GF)",
        accessor: 'm10',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[9].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm10 = 0
          props.rows.map((row) => {
            totalm10 += Number(row.original.machines[9].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm10}</Stack>
        }
      },
      //Machine11
      {
        Header: "VER-11 (GF)",
        accessor: 'm11',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[10].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm11 = 0
          props.rows.map((row) => {
            totalm11 += Number(row.original.machines[10].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm11}</Stack>
        }
      },
      //Machine12
      {
        Header: "VER-12 (SF)",
        accessor: 'm12',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[11].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm12 = 0
          props.rows.map((row) => {
            totalm12 += Number(row.original.machines[11].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm12}</Stack>
        }
      },
      //Machine13
      {
        Header: "VER-13 (SF)",
        accessor: 'm13',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[12].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm13 = 0
          props.rows.map((row) => {
            totalm13 += Number(row.original.machines[12].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm13}</Stack>
        }
      },
      //Machine14
      {
        Header: "VER-14 (SF)",
        accessor: 'm14',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[13].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm14 = 0
          props.rows.map((row) => {
            totalm14 += Number(row.original.machines[13].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm14}</Stack>
        }
      },
      //Machine15
      {
        Header: "VER-15 (SF)",
        accessor: 'm15',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[14].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm15 = 0
          props.rows.map((row) => {
            totalm15 += Number(row.original.machines[14].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm15}</Stack>
        }
      },
      //Machine16
      {
        Header: "VER-16 (SF)",
        accessor: 'm16',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[15].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm16 = 0
          props.rows.map((row) => {
            totalm16 += Number(row.original.machines[15].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm16}</Stack>
        }
      },
      //Machine17
      {
        Header: "VER-17 (SF)",
        accessor: 'm17',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[16].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm17 = 0
          props.rows.map((row) => {
            totalm17 += Number(row.original.machines[16].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm17}</Stack>
        }
      },
      //Machine18
      {
        Header: "GBOOT-18",
        accessor: 'm18',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[17].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm18 = 0
          props.rows.map((row) => {
            totalm18 += Number(row.original.machines[17].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm18}</Stack>
        }
      },
      //Machine19
      {
        Header: "GBOOT-19",
        accessor: 'm19',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[18].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm19 = 0
          props.rows.map((row) => {
            totalm19 += Number(row.original.machines[18].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm19}</Stack>
        }
      },
      //Machine20
      {
        Header: "PU MACHINE-20",
        accessor: 'm20',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.machines[19].production}</Typography>
          )
        },
        Footer: (props) => {
          let totalm20 = 0
          props.rows.map((row) => {
            totalm20 += Number(row.original.machines[19].production)
            return null

          })
          return <Stack sx={{ pt: 2, fontWeight: 'bold', borderBottom: 1, ml: 2 }} justifyContent={"center"} alignItems={"left"}>{totalm20}</Stack>
        }
      },

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
      {tableData.length > 0 ?
        <ReportsTable data={MemoData} columns={MemoColumns} /> : null}

    </>
  )
}
