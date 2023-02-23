import { Block, CheckCircle, Delete, Edit, Visibility } from "@mui/icons-material"
import { IconButton, LinearProgress, Stack, Tooltip, Typography } from "@mui/material"
import { AxiosResponse } from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import DeleteActivityDialog from "../components/dialogs/activities/DeleteActivityDialog"
import ToogleActivityStatusDialog from "../components/dialogs/activities/ToogleActivityStatusDialog"
import UpdateActivityDialog from "../components/dialogs/activities/UpdateActivityDialog"
import ViewActivityDialog from "../components/dialogs/activities/ViewActivityDialog"
import { ActivityTable } from "../components/tables/activity/ActivityTable"
import { ActivityChoiceActions, ChoiceContext } from "../contexts/dialogContext"
import { UserContext } from "../contexts/userContext"
import { GetActivities } from "../services/ActivityServices"
import { BackendError } from "../types"
import { IActivity } from "../types/activity.type"

export default function ActivitiesPage() {
  const { setChoice } = useContext(ChoiceContext)
  const { user: loggedInUser } = useContext(UserContext)
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
      // activity_type
      {
        Header: 'Activity Type',
        accessor: 'activity_type',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{props.row.original.activity_type}</Typography>
              <Stack direction="row" spacing={2}>
                <Typography variant="caption" component="span">
                  <i>{props.row.original.resource_type}</i>
                </Typography>
                <Typography variant="caption" component="span">
                  {new Date(props.row.original.created_at).toLocaleDateString()}
                </Typography>
              </Stack>
            </Stack>
          )
        }
      },
      //description
      {
        Header: 'Description',
        accessor: 'description',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body2">{props.row.original.description.slice(0, 20)}...</Typography>
            </Stack>
          )
        }
      },
      //remarks
      {
        Header: 'Remarks',
        accessor: 'remarks',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body2">{props.row.original.remarks?.slice(0, 20)}...</Typography>
            </Stack>
          )
        }
      },
      // activity_owner
      {
        Header: 'Activity Owner',
        accessor: 'activity_owner',
        Cell: (props) => {
          return (
            <Stack>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>{props.row.original.activity_owner.username}</Typography>
              <Typography variant="caption">{props.row.original.activity_owner.roles.toString()}</Typography>
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
                loggedInUser?.roles.includes("admin") ?
                  <>
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
                    <Tooltip title="Delete Activity">
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
                  </> : null
              }


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
      <ActivityTable data={MemoData} columns={MemoColumns} />
      {
        activity ?
          <>
            <UpdateActivityDialog activity={activity} />
            <ViewActivityDialog activity={activity} />
            <ToogleActivityStatusDialog activity={activity} />
            <DeleteActivityDialog id={activity._id} />
          </>
          : null
      }
      {
        isLoading && <LinearProgress />
      }
    </>
  )
}
