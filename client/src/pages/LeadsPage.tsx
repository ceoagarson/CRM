import { Add, AddBoxOutlined, Block, CheckCircle, Edit, PlusOne, PlusOneRounded, Visibility } from "@mui/icons-material"
import { Alert, IconButton, LinearProgress, Stack, Tooltip, Typography } from "@mui/material"
import { AxiosResponse } from "axios"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "react-query"
import { Column } from "react-table"
import NewActivityDialog from "../components/dialogs/activities/NewActivityDialog"
import ToogleLeadStatusDialog from "../components/dialogs/leads/ToogleLeadStatusDialog"
import UpdateLeadDialog from "../components/dialogs/leads/UpdateLeadDialog"
import ViewLeadDialog from "../components/dialogs/leads/ViewLeadDialog"
import { LeadTable } from "../components/tables/lead/LeadTable"
import { ActivityChoiceActions, ChoiceContext, LeadChoiceActions } from "../contexts/dialogContext"
import { GetLeads } from "../services/LeadsServices"
import { BackendError } from "../types"
import { ILead } from "../types/lead.type"

export default function LeadsPage() {
  const { setChoice } = useContext(ChoiceContext)
  const [lead, setLead] = useState<ILead>()
  const { data, isSuccess, isLoading } = useQuery
    <AxiosResponse<ILead[]>, BackendError>("leads", GetLeads, {
      refetchOnMount: true
    })
  const [DATA, setDATA] = useState<ILead[]>([])
  const MemoData = React.useMemo(() => DATA, [DATA])

  const MemoColumns: Column<ILead>[] = React.useMemo(
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
        accessor: 'open',
        Cell: (props) => {
          let status = props.row.original.open?.status
          let username = props.row.original.open?.changedBy
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
          let open = props.row.original.open?.status
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
                      <CheckCircle />
                    </IconButton>
                  </Tooltip>
              }
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
    , [setChoice]
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
            <NewActivityDialog id={lead._id} />
          </>
          : null
      }
      {
        isLoading && <LinearProgress />
      }
    </>
  )
}
