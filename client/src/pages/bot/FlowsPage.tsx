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
import { AddOutlined, Assignment, Delete, Edit, PanoramaFishEye } from "@mui/icons-material"
import ViewConnectedUsersDialog from "../../components/dialogs/bot/ViewConnectedUsersDialog"
import UpdateConnectedUsersDialog from "../../components/dialogs/bot/UpdateConnectedUsersDialog"


export default function FlowsPage() {
  const [flows, setFlows] = useState<IFlow[]>()
  const [flow, setFlow] = useState<IFlow>()
  const { setChoice } = useContext(ChoiceContext)
  const { user } = useContext(UserContext)
  const { data, isLoading } = useQuery<AxiosResponse<IFlow[]>, BackendError>("flows", GetFlows)
  

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
        <Button sx={{ m: 1 }} variant="outlined" color="warning"
          onClick={() => setChoice({ type: BotChoiceActions.create_flow })}
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <AddOutlined />
            <span> New Flow</span>
          </Stack>
        </Button>
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
              </TableCell>
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
              </TableCell>
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
              </TableCell>

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
              </TableCell>
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
              </TableCell>
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
              </TableCell>

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
                            <Tooltip title="Edit">
                              <IconButton color="error"
                                onClick={() => {
                                  setFlow(flow)
                                  setChoice({ type: BotChoiceActions.update_flow })
                                }}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton color="warning"
                                onClick={() => {
                                  setFlow(flow)
                                  setChoice({ type: BotChoiceActions.delete_flow })
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="View Connected Numbers">
                              <IconButton color="warning"
                                onClick={() => {
                                  setChoice({ type: BotChoiceActions.view_connected_users })
                                  setFlow(flow)
                                }}
                              >
                                <PanoramaFishEye />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Manage Connected Numbers">
                              <IconButton color="warning"
                                onClick={() => {
                                  setChoice({ type: BotChoiceActions.update_connected_users })
                                  setFlow(flow)
                                }}
                              >
                                <Assignment />
                              </IconButton>
                            </Tooltip>
                          </>
                          :
                          null
                      }
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{index + 1}</Typography>
                    </TableCell>
                    {
                      isLoading ? <TableCell>
                        <Typography sx={{ textTransform: "capitalize" }}>Loading..</Typography>
                      </TableCell> :
                        <TableCell>
                          <Typography sx={{ textTransform: "capitalize" }}>{flow && flow.connected_users && flow.connected_users.length > 0 ? "active" : "disabled"}</Typography>
                        </TableCell>

                    }

                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{flow.trigger_keywords.slice(0, 50)}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{flow.flow_name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{flow.updated_by?.username}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{flow.created_by?.username}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ textTransform: "capitalize" }}>{flow.updated_at && new Date(flow.updated_at).toLocaleString()}</Typography>
                    </TableCell>

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
    </>

  )
}
