import {AddBoxOutlined, Block, CheckCircle, Edit, Visibility } from "@mui/icons-material"
import { Alert, IconButton, LinearProgress, Stack, Tooltip, Typography } from "@mui/material"
import { AxiosResponse } from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import NewActivityDialog from "../components/dialogs/activities/NewActivityDialog"
import ToogleOpportunityStatusDialog from "../components/dialogs/opportunities/ToogleOpportunityStatusDialog"
import UpdateOpportunityDialog from "../components/dialogs/opportunities/UpdateOpportunityDialog"
import ViewOpportunityDialog from "../components/dialogs/opportunities/ViewOpportunityDialog"
import { OpportunityTable } from "../components/tables/opportunity/OpportunityTable"
import { ActivityChoiceActions, ChoiceContext, OpportunityChoiceActions } from "../contexts/dialogContext"
import { GetOpportunities } from "../services/OpportunityServices"
import { BackendError } from "../types"
import { IOpportunity } from "../types/opportunity.type"

export default function OpportunitiesPage() {
  const { setChoice } = useContext(ChoiceContext)
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
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: (props) => {
          let status = props.row.original.status
          let username = props.row.original.status_changed_by.username
          if (status)
            return (
              <Stack>
                <Typography variant="button" sx={{ color: "green", fontWeight: "bold" }}>Open</Typography>
                <Typography variant="caption">{username}</Typography>
              </Stack>
            )
          return (
            <Stack>
              <Typography variant="button" sx={{ color: "red" }}>Closed</Typography>
              <Typography variant="caption">{username}</Typography>
            </Stack>
          )
        }
      },
      // email
      {
        Header: 'Email',
        accessor: 'email'
      },
      //actions
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: (props) => {
          let open = props.row.original.status
          return (
            <Stack direction="row" spacing={1}>
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
                      <CheckCircle />
                    </IconButton>
                  </Tooltip>
              }
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
    , [setChoice]
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
            <NewActivityDialog id={opportunity._id} resource_type="opportunity"/>
          </>
          : null
      }
      {
        isLoading && <LinearProgress />
      }
    </>
  )
}
