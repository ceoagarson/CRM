import { Comment, Edit, Visibility } from "@mui/icons-material"
import { IconButton, LinearProgress, Snackbar, Stack, Tooltip, Typography } from "@mui/material"
import { AxiosResponse } from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import UpdateLeadDialog from "../components/dialogs/leads/UpdateLeadDialog"
import ViewLeadDialog from "../components/dialogs/leads/ViewLeadDialog"
import { LeadTable } from "../components/tables/lead/LeadTable"
import { ChoiceContext, LeadChoiceActions } from "../contexts/dialogContext"
import { GetLeads } from "../services/LeadsServices"
import { BackendError } from "../types"
import { ILead } from "../types/lead.type"
import NewRemarkDialog from "../components/dialogs/leads/NewRemarkDialog"

export type Filter = {
  key: string,
  value: string
}[]

export default function LeadsPage() {
  const { setChoice } = useContext(ChoiceContext)
  const [lead, setLead] = useState<ILead>()
  const [display, setDisplay] = useState(false)
  const [remoteBackUpData, setRemoteBackUpData] = useState<ILead[]>([])
  const [DATA, setDATA] = useState<ILead[]>([])
  const [filter, setFilter] = useState<Filter>([])
  const { data, isSuccess, isLoading } = useQuery
    <AxiosResponse<ILead[]>, BackendError>("leads", GetLeads, {
      refetchOnMount: true
    })

  const MemoData = React.useMemo(() => DATA, [DATA])
  const MemoColumns: Column<ILead>[] = React.useMemo(
    () => [
      //actions
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (props) => {
          return (
            <Stack direction="row" spacing={1}>
              <Tooltip title="edit">
                <IconButton color="secondary"
                  onClick={() => {
                    setChoice({ type: LeadChoiceActions.update_lead })
                    setLead(props.row.original)
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="view">
                <IconButton color="primary"
                  onClick={() => {
                    setChoice({ type: LeadChoiceActions.view_lead })
                    setLead(props.row.original)
                  }}
                >
                  <Visibility />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add Remark">
                <IconButton
                  color="success"
                  onClick={() => {
                    setChoice({ type: LeadChoiceActions.update_remark })
                    setLead(props.row.original)
                  }}
                >
                  <Comment />
                </IconButton>
              </Tooltip>           
            </Stack>
          )
        }
      },
      // lead name
      {
        Header: 'Lead Name',
        accessor: 'name',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.name}</Typography>
          )
        }
      },
      // stage
      {
        Header: 'Stage',
        accessor: 'stage',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.stage}</Typography>
          )
        }
      },
      // city
      {
        Header: 'City',
        accessor: 'city',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.city}</Typography>
          )
        }
      },
      // state name
      {
        Header: 'State',
        accessor: 'state',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.state}</Typography>
          )
        }
      },
      //lead_type
      {
        Header: 'Lead Type',
        accessor: 'lead_type',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.lead_type}</Typography>
          )
        }
      },
      //customer name
      {
        Header: 'Customer Name',
        accessor: 'customer_name',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.customer_name}</Typography>
          )
        }
      },
      //remark
      {
        Header: 'Last Remark',
        accessor: 'remarks',
        Cell: (props) => {
          return (
           <>
              {props.row.original.remarks.length ?
                <Typography sx={{ textTransform: "capitalize" }}> {props.row.original.remarks[props.row.original.remarks.length - 1].remark.slice(0, 50)}...
                </Typography> : null
              }
           </>
          )
        }
      },
      //mobile
      {
        Header: 'Mobile',
        accessor: 'mobile',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1"  >{props.row.original.mobile}</Typography>
            </Stack>
          )
        }
      }
      ,
      //Email 
      {
        Header: 'Lead Emails',
        accessor: 'email',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }} variant="body1">{props.row.original.email}</Typography>
          )
        }
      },
      //Address
      {
        Header: 'Address',
        accessor: 'address',
        Cell: (props) => {
          return (
            <Stack>
              <Typography sx={{ textTransform: "capitalize" }} variant="body1">{ props.row.original.address ? props.row.original.address.slice(0, 50) :"..."}</Typography>
            </Stack>
          )
        }
      },
      // lead_source
      {
        Header: 'Lead Source',
        accessor: 'lead_source',
        Cell: (props) => {
          return (
            <Typography sx={{ textTransform: "capitalize" }} variant="body1">{props.row.original.lead_source}</Typography>
          )
        }
      }
    ]
    , [setChoice]
  )

  useEffect(() => {
    if (isSuccess) {
      setRemoteBackUpData(data.data)
      setDATA(data.data)
    }
  }, [isSuccess, data])

  useEffect(() => {
    function handleFilter() {
      let filteredData = DATA.filter((item) => {
        return item.customer_name === filter[0].value
      })
      if (filteredData.length === 0)
        setDisplay(true)
      setDATA(filteredData)
    }
    if (filter.length > 0)
      handleFilter()
    if (filter.length === 0)
      setDATA(remoteBackUpData)
  }, [filter, DATA, remoteBackUpData])
  return (
    <>
      <LeadTable data={MemoData} columns={MemoColumns} setFilter={setFilter} />
      <Snackbar
        open={display}
        autoHideDuration={6000}
        onClose={() => setDisplay(false)}
        sx={{ marginTop: "100px" }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message="No Leads found"
      />
      {
        lead ?
          <>
            <UpdateLeadDialog lead={lead} />
            <ViewLeadDialog lead={lead} />
            <NewRemarkDialog lead={lead} />
          </>
          : null
      }
      {
        isLoading && <LinearProgress />
      }
    </>
  )
}
