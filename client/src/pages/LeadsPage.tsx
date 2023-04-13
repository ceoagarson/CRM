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
import { UserContext } from "../contexts/userContext"
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
  const { user: loggedInUser } = useContext(UserContext)
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

      // lead name
      {
        Header: 'Lead Name',
        accessor: 'name',
        Cell: (props) => {
          return (
            <Stack direction="row"
              spacing={2}
              justifyContent="left"
              alignItems="center"
            >
              <Stack direction="column">
                <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.name}</Typography>
                <Typography sx={{ textTransform: "capitalize", color: 'grey' }} variant="caption" component="span">
                  Stage : {props.row.original.stage}
                </Typography>
              </Stack >
            </Stack>
          )
        }
      },
      //lead_type
      {
        Header: 'Lead Type',
        accessor: 'lead_type',
        Cell: (props) => {
          return (
            <Stack direction="row"
              spacing={2}
              justifyContent="left"
              alignItems="center"
            >
              <Stack direction="column">
                <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.lead_type}</Typography>
                <Typography sx={{ textTransform: "capitalize", color: 'grey' }} variant="caption" component="span">
                  TurnOver : {props.row.original.turnover}
                </Typography>
                <Typography sx={{ textTransform: "capitalize", color: 'grey' }} variant="caption" component="span">
                  Work : {props.row.original.work_description}
                </Typography>
              </Stack >
            </Stack>
          )
        }
      },
      //customer
      {
        Header: 'Customer Name',
        accessor: 'customer_name',
        Cell: (props) => {
          return (
            <Stack direction="row"
              spacing={2}
              justifyContent="left"
              alignItems="center"
            >
              <Stack direction="column">
                <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.customer_name}</Typography>
                <Typography sx={{ textTransform: "capitalize", color: 'grey' }} variant="caption" component="span">
                  Designation : {props.row.original.customer_designation}
                </Typography>
              </Stack >
            </Stack>
          )
        }
      },
      //remark
      {
        Header: 'Last Remark',
        accessor: 'remarks',
        Cell: (props) => {
          return (
            <Stack direction="row"
              spacing={2}
              justifyContent="left"
              alignItems="center"
            >
              <Stack direction="column">
                {
                  props.row.original.remarks.length > 0 ?
                    <>
                      <Typography sx={{ textTransform: "capitalize" }}> {props.row.original.remarks[props.row.original.remarks.length - 1].remark.slice(0, 50)}...</Typography>
                      <Typography sx={{ textTransform: "capitalize", color: 'grey' }} variant="caption" component="span">
                        {new Date(props.row.original.remarks[props.row.original.remarks.length - 1].created_at).toLocaleString()}
                      </Typography>
                      <Typography sx={{ textTransform: "capitalize", color: 'grey' }} variant="caption" component="span">
                        Remark By : {props.row.original.remarks[props.row.original.remarks.length - 1].created_by.username}
                      </Typography>
                    </>
                    : null
                }
              </Stack >
            </Stack >
          )
        }
      },
      //mobile
      {
        Header: 'Lead Mobiles',
        accessor: 'mobile',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1"  >{props.row.original.mobile}</Typography>
              <Typography variant="caption" sx={{ color: 'grey' }} >{props.row.original.alternate_mobile1}</Typography>
              <Typography variant="caption" sx={{ color: 'grey' }}>{props.row.original.alternate_mobile2}</Typography>
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
            <Stack>
              <Typography sx={{ textTransform: "capitalize" }} variant="body1">{props.row.original.lead_source}</Typography>
              <Typography sx={{ textTransform: "capitalize", color: 'grey' }} variant="caption">Last Updated :  {new Date(props.row.original.updated_at).toLocaleDateString()}</Typography>
            </Stack>
          )
        }
      },
      // lead_owner
      {
        Header: 'Lead Owner',
        accessor: 'lead_owner',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1" sx={{ textTransform: "capitalize" }}>{props.row.original.lead_owner.username}</Typography>
              <Typography variant="caption" sx={{ color: 'grey' }} component="span">
                {new Date(props.row.original.created_at).toLocaleDateString()}
              </Typography>
            </Stack>
          )
        }
      },
      //actions
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (props) => {
          return (
            <Stack direction="row" spacing={1}>
              {
                loggedInUser?.roles.includes("admin") ?
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
                  : null
              }
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
    ]
    , [setChoice, loggedInUser]
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
  console.log(filter)
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
