import { useQuery } from "react-query"
import { GetFlows } from "../../services/BotServices"
import { AxiosResponse } from "axios"
import { BackendError } from "../../types"
import { useEffect, useContext, useState } from "react"
import { IFlow } from "../../types/bot/flow.types"
import { BotChoiceActions, ChoiceContext } from "../../contexts/dialogContext"
import { UserContext } from "../../contexts/userContext"
import { Box, Button, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import UpdateFlowDialog from "../../components/dialogs/bot/UpdateFlowDialog"
import CreateFlowDialog from "../../components/dialogs/bot/CreateFlowDialog"
import DeleteFlowDialog from "../../components/dialogs/bot/DeleteFlowDialog"
import { color1, color2, headColor } from "../../utils/colors"
import { AddOutlined, Assignment, Delete, Edit, LocalActivity, PanoramaFishEye } from "@mui/icons-material"
import ViewConnectedUsersDialog from "../../components/dialogs/bot/ViewConnectedUsersDialog"
import UpdateConnectedUsersDialog from "../../components/dialogs/bot/UpdateConnectedUsersDialog"
import ToogleFlowStatusDialog from "../../components/dialogs/bot/ToogleFlowStatusDialog"
import { useBotFields } from "../../components/hooks/BotFieldsHook"


export default function FlowsPage() {
  const [flows, setFlows] = useState<IFlow[]>()
  const [flow, setFlow] = useState<IFlow>()
  const { setChoice } = useContext(ChoiceContext)
  const { user } = useContext(UserContext)
  const { data, isLoading } = useQuery<AxiosResponse<IFlow[]>, BackendError>("flows", GetFlows)
  const { hiddenFields, readonlyFields } = useBotFields()

  useEffect(() => {
    if (data)
      setFlows(data.data)
  }, [data])


  return (
    <>
      <Box sx={{
        overflow: "scroll",
        minHeight: '73.5vh'
      }}>
        {!hiddenFields?.includes('allow_create_flow') &&
          <Button sx={{ m: 1 }} variant="outlined" color="warning"
            onClick={() => setChoice({ type: BotChoiceActions.create_flow })}
            disabled={!readonlyFields?.includes('allow_create_flow')}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <AddOutlined />
              <span> New Flow</span>
            </Stack>
          </Button>}
        <Table
          stickyHeader
          sx={{ minWidth: "1400px" }}
          size="small">
          <TableHead
          >
            <TableRow>
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Actions
                </Stack>
              </TableCell>
              <TableCell
                sx={{ bgcolor: headColor }}                         >
                <Stack
                  direction="row"
                  justifyContent="left"
                  alignItems="left"
                  spacing={2}
                >
                  Index
                </Stack>
              </TableCell>
              {!hiddenFields?.includes('flow_status') &&
                <TableCell
                  sx={{ bgcolor: headColor }}                         >
                  <Stack
                    direction="row"
                    justifyContent="left"
                    alignItems="left"
                    spacing={2}
                  >
                    Status
                  </Stack>
                </TableCell>}
              {!hiddenFields?.includes('allow_view_trackers') &&
                <TableCell
                  sx={{ bgcolor: headColor }}                         >
                  <Stack
                    direction="row"
                    justifyContent="left"
                    alignItems="left"
                    spacing={2}
                  >
                    Triggers
                  </Stack>
                </TableCell>}
              {!hiddenFields?.includes('flow_name') &&
                <TableCell
                  sx={{ bgcolor: headColor }}                         >
                  <Stack
                    direction="row"
                    justifyContent="left"
                    alignItems="left"
                    spacing={2}
                  >
                    Flow Name
                  </Stack>
                </TableCell>}
              {!hiddenFields?.includes('last_edit_by') &&
                <TableCell
                  sx={{ bgcolor: headColor }}                         >
                  <Stack
                    direction="row"
                    justifyContent="left"
                    alignItems="left"
                    spacing={2}
                  >
                    Updated By
                  </Stack>
                </TableCell>}
              {!hiddenFields?.includes('created_by') &&
                <TableCell
                  sx={{ bgcolor: headColor }}                         >
                  <Stack
                    direction="row"
                    justifyContent="left"
                    alignItems="left"
                    spacing={2}
                  >
                    Created By
                  </Stack>
                </TableCell>}
              {!hiddenFields?.includes('last_edit_date') &&
                <TableCell
                  sx={{ bgcolor: headColor }}                         >
                  <Stack
                    direction="row"
                    justifyContent="left"
                    alignItems="left"
                    spacing={2}
                  >
                    Last Updated
                  </Stack>
                </TableCell>}

            </TableRow>
          </TableHead>
          <TableBody >
            {
              flows && flows.length > 0 && flows.map((flow, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': { bgcolor: color1 },
                      '&:nth-of-type(even)': { bgcolor: color2 },
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.1)', cursor: 'pointer' }
                    }}>

                    {/* actions */}
                    <TableCell>
                      {
                        user?.is_admin ?
                          <>
                            {!hiddenFields?.includes('activate_flow') &&
                              <Tooltip title="Change Status">
                                <IconButton color="error"
                                  onClick={() => {
                                    setFlow(flow)
                                    setChoice({ type: BotChoiceActions.toogle_flow_status })
                                  }}
                                  disabled={readonlyFields?.includes('activate_flow')}
                                >
                                  <LocalActivity />
                                </IconButton>
                              </Tooltip>}

                            {!hiddenFields?.includes('allow_edit_flow') &&
                              <Tooltip title="Edit">
                                <IconButton color="error"
                                  onClick={() => {
                                    setFlow(flow)
                                    setChoice({ type: BotChoiceActions.update_flow })
                                  }}
                                  disabled={readonlyFields?.includes('allow_edit_flow')}
                                >
                                  <Edit />
                                </IconButton>
                              </Tooltip>}

                            {!hiddenFields?.includes('allow_delete_flow') &&
                              <Tooltip title="Delete">
                                <IconButton color="warning"
                                  onClick={() => {
                                    setFlow(flow)
                                    setChoice({ type: BotChoiceActions.delete_flow })
                                  }}
                                  disabled={readonlyFields?.includes('allow_delete_flow')}
                                >
                                  <Delete />
                                </IconButton>
                              </Tooltip>}

                            {!hiddenFields?.includes('view_connected_users') &&
                              <Tooltip title="View Connected Users">
                                <IconButton color="warning"
                                  onClick={() => {
                                    setChoice({ type: BotChoiceActions.view_connected_users })
                                    setFlow(flow)
                                  }}
                                  disabled={readonlyFields?.includes('view_connected_users')}

                                >
                                  <PanoramaFishEye />
                                </IconButton>
                              </Tooltip>}
                            {!hiddenFields?.includes('allow_flow_assignment') &&
                              <Tooltip title="Manage Connected Numbers">
                                <IconButton color="warning"
                                  onClick={() => {
                                    setChoice({ type: BotChoiceActions.update_connected_users })
                                    setFlow(flow)
                                  }}
                                  disabled={readonlyFields?.includes('allow_flow_assignment')}

                                >
                                  <Assignment />
                                </IconButton>
                              </Tooltip>}
                          </>
                          :
                          null
                      }
                    </TableCell>

                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{index + 1}</Typography>
                    </TableCell>
                    {!hiddenFields?.includes('flow_status') &&
                      <>

                        {
                          isLoading ? <TableCell>
                            <Typography sx={{ textTransform: "capitalize" }}>Loading..</Typography>
                          </TableCell> :
                            <TableCell>
                              <Typography sx={{ textTransform: "capitalize" }}>{flow.is_active ? "active" : "disabled"}</Typography>
                            </TableCell>

                        }
                      </>
                    }
                    {!hiddenFields?.includes('triggers') &&
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{flow.trigger_keywords.slice(0, 50)}</Typography>
                      </TableCell>
                    }
                    {!hiddenFields?.includes('flow_name') &&
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{flow.flow_name}</Typography>
                      </TableCell>}
                    {!hiddenFields?.includes('last_edit_by') &&
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{flow.updated_by?.username}</Typography>
                      </TableCell>
                    }
                    {!hiddenFields?.includes('created_by') &&
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{flow.created_by?.username}</Typography>
                      </TableCell>
                    }
                    {!hiddenFields?.includes('last_edit_date') &&
                      <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>{flow.updated_at && new Date(flow.updated_at).toLocaleString()}</Typography>
                      </TableCell>
                    }
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </Box>
      {flow ? <UpdateFlowDialog selectedFlow={flow} /> : null}
      <CreateFlowDialog />
      {flow ? <DeleteFlowDialog flow={flow} /> : null}
      {flow ? <ViewConnectedUsersDialog selectedFlow={flow} /> : null}
      {flow ? <UpdateConnectedUsersDialog selectedFlow={flow} /> : null}
      {flow ? <ToogleFlowStatusDialog flow={flow} /> : null}
    </>
  )
}
