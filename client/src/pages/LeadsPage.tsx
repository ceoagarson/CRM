import { Comment, Edit, Visibility } from "@mui/icons-material"
import { IconButton, LinearProgress, Stack, Tooltip, Typography } from "@mui/material"
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

export default function LeadsPage() {
  const { setChoice } = useContext(ChoiceContext)
  const [lead, setLead] = useState<ILead>()
  const { user: loggedInUser } = useContext(UserContext)
  const { data, isSuccess, isLoading } = useQuery
    <AxiosResponse<ILead[]>, BackendError>("leads", GetLeads, {
      refetchOnMount: true
    })
  const [DATA, setDATA] = useState<ILead[]>([])
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
                  {props.row.original.stage}
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
                <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.lead_type}-<strong>{props.row.original.turnover}</strong></Typography>
                <Typography sx={{ textTransform: "capitalize", color: 'grey' }} variant="caption" component="span">
                  {props.row.original.work_description}
                </Typography>
              </Stack >
            </Stack>
          )
        }
      },
      //customer
      {
        Header: 'Customer',
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
                  {props.row.original.customer_designation}
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
                      <Typography sx={{ textTransform: "capitalize" }}>{props.row.original.remarks[props.row.original.remarks.length - 1].remark}</Typography>
                      <Typography sx={{ textTransform: "capitalize", color: 'grey' }} variant="caption" component="span">
                        {new Date(props.row.original.remarks[props.row.original.remarks.length-1].created_at).toLocaleString()}
                      </Typography>
                      <Typography sx={{ textTransform: "capitalize", color: 'grey' }} variant="caption" component="span">
                        {props.row.original.remarks[props.row.original.remarks.length - 1].created_by.username}
                      </Typography>
                    </>
                    : null
                }
              </Stack >
            </Stack >
          )
        }
      },
      // email
      {
        Header: 'Email',
        accessor: 'email',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1" sx={{}}>{props.row.original.email}</Typography>
              <Typography variant="caption">{props.row.original.alternate_email}</Typography>
            </Stack>
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
              <Typography variant="body1" sx={{}} >{props.row.original.mobile}</Typography>
              <Typography variant="caption">{props.row.original.alternate_mobile1}</Typography>
              <Typography variant="caption">{props.row.original.alternate_mobile2}</Typography>
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
              <Typography variant="caption" component="span">
                {new Date(props.row.original.created_at).toLocaleDateString()}
              </Typography>
            </Stack>
          )
        }
      },

    ]
    , [setChoice, loggedInUser]
  )

  useEffect(() => {
    if (isSuccess)
      setDATA(data.data)
  }, [isSuccess, data])

  return (
    <>
      <LeadTable data={MemoData} columns={MemoColumns} />
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
