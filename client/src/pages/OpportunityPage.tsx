import { AddBoxOutlined, Block, ChangeCircle, Edit, Visibility } from "@mui/icons-material"
import { Avatar, IconButton, LinearProgress, Stack, Tooltip, Typography } from "@mui/material"
import { AxiosResponse } from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import NewActivityDialog from "../components/dialogs/activities/NewActivityDialog"
import ConvertResourceDialog from "../components/dialogs/conversion/ConvertResourceDialog"
import ToogleOpportunityStatusDialog from "../components/dialogs/opportunities/ToogleOpportunityStatusDialog"
import UpdateOpportunityDialog from "../components/dialogs/opportunities/UpdateOpportunityDialog"
import ViewOpportunityDialog from "../components/dialogs/opportunities/ViewOpportunityDialog"
import { OpportunityTable } from "../components/tables/opportunity/OpportunityTable"
import { ActivityChoiceActions, ChoiceContext, ConversionChoiceActions, OpportunityChoiceActions } from "../contexts/dialogContext"
import { UserContext } from "../contexts/userContext"
import { GetOpportunities } from "../services/OpportunityServices"
import { BackendError } from "../types"
import { IOpportunity } from "../types/opportunity.type"

export default function OpportunitiesPage() {
  const { setChoice } = useContext(ChoiceContext)
  const { user: loggedInUser } = useContext(UserContext)

  const [opportunity, setOpportunity] = useState<IOpportunity>()
  const { data, isSuccess, isLoading } = useQuery
    <AxiosResponse<IOpportunity[]>, BackendError>("opportunities", GetOpportunities, {
      refetchOnMount: true
    })
  const [DATA, setDATA] = useState<IOpportunity[]>([])
  const MemoData = React.useMemo(() => DATA, [DATA])

  const MemoColumns: Column<IOpportunity>[] = React.useMemo(
    () => [
      {
        Header: "Index",
        accessor: "_id",
        width: 20,
        disableSortBy: true,
        Cell: (props) => {
          return <Typography variant="body1" component="span" pr={2}>{props.row.index + 1}</Typography>
        }
      },
      // opportunity name
      {
        Header: 'Opportunity Name',
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
                    setChoice({ type: OpportunityChoiceActions.view_opportunity })
                    setOpportunity(props.row.original)
                  }}
                  alt="display picture" src={props.row.original.dp?.url} />
                {
                  props.row.original.status ?
                    <Typography variant="caption" sx={{
                      color: "green", fontWeight: "bold"
                    }}>open</Typography>
                    : <Typography variant="caption" sx={{
                      color: "red", fontWeight: "bold"
                    }}>closed</Typography>

                }
              </Stack >
              <Stack>
                <Typography sx={{ fontWeight: "bold" }}>{props.row.original.name}</Typography>
                <Typography variant="caption" component="span">
                  {props.row.original.customer_name}<b>({props.row.original.customer_designination})</b>
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
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{props.row.original.email}</Typography>
              <Typography variant="caption">{props.row.original.alternate_email}</Typography>
            </Stack>
          )
        }
      },
      {
        Header: 'Mobile',
        accessor: 'mobile',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "bold" }} >{props.row.original.mobile}</Typography>
              <Typography variant="caption">{props.row.original.alternate_mobile}</Typography>
            </Stack>
          )
        }
      },
      // opportunity_source
      {
        Header: 'Opportunity Source',
        accessor: 'opportunity_source',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{props.row.original.opportunity_source}</Typography>
            </Stack>
          )
        }
      },
      // opportunity_owner
      {
        Header: 'Opportunity Owner',
        accessor: 'opportunity_owner',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{props.row.original.opportunity_owner.username}</Typography>
              <Typography variant="caption">{props.row.original.opportunity_owner.roles.toString()}</Typography>
              <Typography variant="caption" component="span">
                {new Date(props.row.original.created_at).toLocaleDateString()}
              </Typography>
            </Stack>
          )
        }
      },
      // opportunity_owner
      {
        Header: 'Address',
        accessor: 'city',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{props.row.original.state}</Typography>
              <Typography variant="caption">{props.row.original.city}</Typography>
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
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{username}</Typography>
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
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{username}</Typography>
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
                          setChoice({ type: OpportunityChoiceActions.update_opportunity })
                          setOpportunity(props.row.original)
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
                              setChoice({ type: OpportunityChoiceActions.open_close_opportunity })
                              setOpportunity(props.row.original)
                            }}
                          ><Block />
                          </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Open">
                          <IconButton
                            color="success"
                            onClick={() => {
                              setChoice({ type: OpportunityChoiceActions.open_close_opportunity })
                              setOpportunity(props.row.original)
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
                          setOpportunity(props.row.original)
                        }}
                      >
                        <ChangeCircle />
                      </IconButton>
                    </Tooltip>
                  </>
                  : null
              }


              <Tooltip title="view">
                <IconButton color="primary"
                  onClick={() => {
                    setChoice({ type: OpportunityChoiceActions.view_opportunity })
                    setOpportunity(props.row.original)
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
                    setOpportunity(props.row.original)
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
    , [setChoice,loggedInUser]
  )
  useEffect(() => {
    if (isSuccess)
      setDATA(data.data)
  }, [isSuccess, data])
  return (
    <>
      <OpportunityTable data={MemoData} columns={MemoColumns} />
      {
        opportunity ?
          <>
            <UpdateOpportunityDialog opportunity={opportunity} />
            <ViewOpportunityDialog opportunity={opportunity} />
            <ToogleOpportunityStatusDialog opportunity={opportunity} />
            <NewActivityDialog id={opportunity._id} resource_type="opportunity" />
            <ConvertResourceDialog resource_id={opportunity._id} resource_type="opportunity" />
          </>
          : null
      }
      {
        isLoading && <LinearProgress />
      }
    </>
  )
}
