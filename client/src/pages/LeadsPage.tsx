import { AddBoxOutlined, Block, ChangeCircle, Edit, Visibility } from "@mui/icons-material"
import { Avatar, IconButton, LinearProgress, Stack, Tooltip, Typography } from "@mui/material"
import { AxiosResponse } from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import NewActivityDialog from "../components/dialogs/activities/NewActivityDialog"
import ConvertResourceDialog from "../components/dialogs/conversion/ConvertResourceDialog"
import ToogleLeadStatusDialog from "../components/dialogs/leads/ToogleLeadStatusDialog copy"
import UpdateLeadDialog from "../components/dialogs/leads/UpdateLeadDialog"
import ViewLeadDialog from "../components/dialogs/leads/ViewLeadDialog"
import { LeadTable } from "../components/tables/lead/LeadTable"
import { ActivityChoiceActions, ChoiceContext, ConversionChoiceActions, LeadChoiceActions } from "../contexts/dialogContext"
import { UserContext } from "../contexts/userContext"
import { GetLeads } from "../services/LeadsServices"
import { BackendError } from "../types"
import { ILead } from "../types/lead.type"

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
      // index 
      {
        Header: "Index",
        accessor: "_id",
        width: 20,
        disableSortBy: true,
        Cell: (props) => {
          return <Typography variant="body1" component="span" pr={2}>{props.row.index + 1}</Typography>
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
              <Stack
                justifyContent="center"
                alignItems="center"
              >
                <Avatar
                  onClick={() => {
                    setChoice({ type: LeadChoiceActions.view_lead })
                    setLead(props.row.original)
                  }}
                  alt="display picture" src={props.row.original.dp?.url} />
                {
                  props.row.original.status ?
                    <Typography variant="caption" sx={{
                      color: "green",
                    }}>open</Typography>
                    : <Typography variant="caption" sx={{
                      color: "red",
                    }}>closed</Typography>

                }
              </Stack >
              <Stack>
                <Typography sx={{textTransform:"capitalize"}}>{props.row.original.name}</Typography>
                <Typography sx={{textTransform:"capitalize"}} variant="caption" component="span">
                  {props.row.original.customer_name}<i>({props.row.original.customer_designination})</i>
                </Typography>
              </Stack >
            </Stack>
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
              <Typography variant="caption">{props.row.original.alternate_mobile}</Typography>
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
              <Typography  sx={{ textTransform:"capitalize" }} variant="body1">{props.row.original.lead_source}</Typography>
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
              <Typography variant="body1" sx={{textTransform:"capitalize"}}>{props.row.original.lead_owner.username}</Typography>
              <Typography variant="caption">{props.row.original.lead_owner.roles.toString()}</Typography>
              <Typography variant="caption" component="span">
                {new Date(props.row.original.created_at).toLocaleDateString()}
              </Typography>
            </Stack>
          )
        }
      },
      // lead_owner
      {
        Header: 'Address',
        accessor: 'city',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1" sx={{textTransform:"capitalize"}}>{props.row.original.state}</Typography>
              <Typography variant="caption" sx={{textTransform:"capitalize"}}>{props.row.original.city}</Typography>
            </Stack>
          )
        }
      },
      // status updated
      {
        Header: 'Status UpdatedBy',
        accessor: 'status',
        Cell: (props) => {
          let username = props.row.original.status_changed_by.username
          return (
            <Stack>
              <Typography variant="body1" sx={{textTransform:"capitalize"}}>{username}</Typography>
              <Typography variant="caption">{props.row.original.status_changed_by.roles.toString()}</Typography>
              <Typography variant="caption">{new Date(props.row.original.updated_at).toLocaleString()}</Typography>
            </Stack>
          )
        }
      },
      // last  updated
      {
        Header: 'Last Updated',
        accessor: 'updated_at',
        Cell: (props) => {
          let username = props.row.original.updated_by.username
          return (
            <Stack>
              <Typography variant="body1" sx={{textTransform:"capitalize"}}>{username}</Typography>
              <Typography variant="caption">{props.row.original.updated_by.roles.toString()}</Typography>
              <Typography variant="caption">{new Date(props.row.original.updated_at).toLocaleString()}</Typography>
            </Stack>
          )
        }
      },
      //actions
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (props) => {
          let open = props.row.original.status
          return (
            <Stack direction="row" spacing={1}>
              {
                loggedInUser?.roles.includes("admin") ?
                  <>
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
                    {
                      open ?
                        <Tooltip title="Close">
                          <IconButton
                            color="error"
                            onClick={() => {
                              setChoice({ type: LeadChoiceActions.open_close_lead })
                              setLead(props.row.original)
                            }}
                          ><Block />
                          </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Open">
                          <IconButton
                            color="success"
                            onClick={() => {
                              setChoice({ type: LeadChoiceActions.open_close_lead })
                              setLead(props.row.original)
                            }}
                          >
                            <Block />
                          </IconButton>
                        </Tooltip>
                    }
                    <Tooltip title="Convert">
                      <IconButton
                        color="warning"
                        onClick={() => {
                          setChoice({ type: ConversionChoiceActions.convert_resource })
                          setLead(props.row.original)
                        }}
                      >
                        <ChangeCircle />
                      </IconButton>
                    </Tooltip>
                  </>
                  :
                  null

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

              <Tooltip title="New Activity">
                <IconButton
                  color="success"
                  onClick={() => {
                    setChoice({ type: ActivityChoiceActions.create_activity })
                    setLead(props.row.original)
                  }}
                >
                  <AddBoxOutlined />
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
    if (isSuccess)
      setDATA(data.data)
  }, [isSuccess, data])
  return (
    <>
      < LeadTable data={MemoData} columns={MemoColumns} />
      {
        lead ?
          <>
            <UpdateLeadDialog lead={lead} />
            <ViewLeadDialog lead={lead} />
            <ToogleLeadStatusDialog lead={lead} />
            <NewActivityDialog id={lead._id} resource_type="lead" />
            <ConvertResourceDialog resource_id={lead._id} resource_type="lead" />
          </>
          : null
      }
      {
        isLoading && <LinearProgress />
      }
    </>
  )
}
