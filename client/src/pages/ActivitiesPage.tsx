import { Block, CheckCircle, Delete, Edit, Visibility } from "@mui/icons-material"
import {  IconButton, LinearProgress, Stack, Tooltip, Typography } from "@mui/material"
import { AxiosResponse } from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import DeleteActivityDialog from "../components/dialogs/activities/DeleteActivityDialog"
import ToogleActivityStatusDialog from "../components/dialogs/activities/ToogleActivityStatusDialog"
import UpdateActivityDialog from "../components/dialogs/activities/UpdateActivityDialog"
import ViewActivityDialog from "../components/dialogs/activities/ViewActivityDialog"
import { ActivityTable } from "../components/tables/table/ActivityTable"
import { ActivityChoiceActions, ChoiceContext } from "../contexts/dialogContext"
import { GetActivities } from "../services/ActivityServices"
import { BackendError } from "../types"
import { IActivity } from "../types/activity.type"

export default function ActivitiesPage() {
  const { setChoice } = useContext(ChoiceContext)
  const [activity, setActivity] = useState<IActivity>()
  const { data, isSuccess, isLoading } = useQuery
    <AxiosResponse<IActivity[]>, BackendError>("activities", GetActivities, {
      refetchOnMount: true
    })
  const [DATA, setDATA] = useState<IActivity[]>([])
  const MemoData = React.useMemo(() => DATA, [DATA])

  const MemoColumns: Column<IActivity>[] = React.useMemo(
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
                    setChoice({ type: ActivityChoiceActions.update_activity })
                    setActivity(props.row.original)
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>

              <Tooltip title="view">
                <IconButton color="primary"
                  onClick={() => {
                    setChoice({ type: ActivityChoiceActions.view_activity })
                    setActivity(props.row.original)
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
                        setChoice({ type: ActivityChoiceActions.open_close_activity })
                        setActivity(props.row.original)
                      }}
                    ><Block />
                    </IconButton>
                  </Tooltip>
                  :
                  <Tooltip title="Open">
                    <IconButton
                      color="success"
                      onClick={() => {
                        setChoice({ type: ActivityChoiceActions.open_close_activity })
                        setActivity(props.row.original)
                      }}
                    >
                      <CheckCircle />
                    </IconButton>
                  </Tooltip>
              }
              <Tooltip title="New Activity">
                <IconButton
                  color="error"
                  onClick={() => {
                    setChoice({ type: ActivityChoiceActions.delete_activity })
                    setActivity(props.row.original)
                  }}
                >
                  <Delete />
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
      <ActivityTable data={MemoData} columns={MemoColumns} />
      {
        activity ?
          <>
            <UpdateActivityDialog activity={activity} />
            <ViewActivityDialog activity={activity} />
            <ToogleActivityStatusDialog activity={activity} />
            <DeleteActivityDialog activity={activity} />
          </>
          : null
      } 
      {
        isLoading && <LinearProgress />
      }
    </>
  )
}
