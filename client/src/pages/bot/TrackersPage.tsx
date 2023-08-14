import { useContext, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { BackendError } from '../../types'
import { GetTrackers } from '../../services/BotServices'
import { ITracker } from '../../types/bot/flow.types'
import { BotChoiceActions, ChoiceContext } from '../../contexts/dialogContext'
import UpdateTrackerDialog from '../../components/dialogs/bot/UpdateTrackerDialog'
import ToogleBotDialog from '../../components/dialogs/bot/ToogleBotDialog'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { Box, Button, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import { color1, color2, headColor } from '../../utils/colors'
import { AccountCircle,  Start, Stop } from '@mui/icons-material'
import { UserContext } from '../../contexts/userContext'


function TrackersPage() {
    const [trackers, setTrackers] = useState<ITracker[]>()
    const [tracker, setTracker] = useState<ITracker>()
    const { setChoice } = useContext(ChoiceContext)
    const { data } = useQuery<AxiosResponse<ITracker[]>, BackendError>("trackers", GetTrackers)
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (data)
            setTrackers(data.data)
    }, [data])
    return (
        <>
            <Box sx={{
                overflow: "scroll",
                minHeight: '73.5vh'
            }}>
                <Button size="small" sx={{ m: 1, gap: 1 }} variant="text" color="primary"
                >
                    <AcUnitIcon />
                    <span >Trackers</span>
                </Button>
                <Table
                    stickyHeader
                    sx={{ minWidth: "1200px" }}
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
                                    Customer Name
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
                                    Customer Phone
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
                                    Last Interaction
                                </Stack>
                            </TableCell>



                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {
                            trackers && trackers.map((tracker, index) => {
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
                                                        <Tooltip title="Change Customer Name">
                                                            <IconButton color="error"
                                                                onClick={() => {
                                                                    setTracker(tracker)
                                                                    setChoice({ type: BotChoiceActions.update_tracker })
                                                                }}
                                                            >
                                                                <AccountCircle />
                                                            </IconButton>
                                                        </Tooltip>
                                                        {
                                                            tracker.is_active ?
                                                                <Tooltip title="Stop bot for this person">
                                                                    <IconButton color="warning"
                                                                        onClick={() => {
                                                                            setTracker(tracker)
                                                                            setChoice({ type: BotChoiceActions.toogle_bot_status })
                                                                        }}
                                                                    >
                                                                        <Stop />
                                                                    </IconButton>
                                                                </Tooltip> :
                                                                <Tooltip title="Start bot for this person">
                                                                    <IconButton color="warning"
                                                                        onClick={() => {
                                                                            setTracker(tracker)
                                                                            setChoice({ type: BotChoiceActions.toogle_bot_status })
                                                                        }}
                                                                    >
                                                                        <Start />
                                                                    </IconButton>
                                                                </Tooltip>

                                                        }
                                                    </>
                                                    :
                                                    null
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ textTransform: "capitalize" }}>{index + 1}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ textTransform: "capitalize" }}>{tracker.customer_name ? tracker.customer_name : "unknown"}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ textTransform: "capitalize" }}>{String(tracker.phone_number).replace("@c.us", "")}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ textTransform: "capitalize" }}>{tracker.flow && tracker.flow.flow_name}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography sx={{ textTransform: "capitalize" }}>{tracker.updated_at && new Date(tracker.updated_at).toLocaleString()}</Typography>
                                        </TableCell>

                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </Box>
            {tracker ? <UpdateTrackerDialog tracker={tracker} /> : null}
            {tracker ? <ToogleBotDialog tracker={tracker} /> : null}
        </>
    )
}

export default TrackersPage


