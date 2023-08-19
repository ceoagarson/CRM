import { AccountCircle, RestartAlt, Stop } from '@mui/icons-material'
import { Box, Checkbox, FormControlLabel, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import { color1, color2, headColor } from '../../utils/colors'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/userContext'
import { BasicPOPUP } from '../popup/BasicPOPUP'
import { ITracker } from '../../types/bot/flow.types'
import { BotChoiceActions, ChoiceContext } from '../../contexts/dialogContext'
import { useBotFields } from '../hooks/BotFieldsHook'
import UpdateTrackerDialog from '../dialogs/bot/UpdateTrackerDialog'
import ToogleBotDialog from '../dialogs/bot/ToogleBotDialog'




type Props = {
    tracker: ITracker | undefined
    setTracker: React.Dispatch<React.SetStateAction<ITracker | undefined>>,
    trackers: ITracker[],
    selectAll: boolean,
    setSelectAll: React.Dispatch<React.SetStateAction<boolean>>,
    selectedTrackers: ITracker[]
    setSelectedTrackers: React.Dispatch<React.SetStateAction<ITracker[]>>,
    selectableTrackers: ITracker[]
}

function TrackersTable({ tracker, trackers, selectableTrackers, setTracker, selectAll, setSelectAll, selectedTrackers, setSelectedTrackers }: Props) {
    const { setChoice } = useContext(ChoiceContext)
    const { user } = useContext(UserContext)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [data, setData] = useState<ITracker[]>(trackers)
    const { hiddenFields, readonlyFields } = useBotFields
        ()

    useEffect(() => {
        setData(trackers)
    }, [trackers])

    useEffect(() => {
        setAnchorEl(anchorEl)
    }, [anchorEl])
    return (
        <>
            <Box sx={{
                overflow: "scroll",
                height: '73.5vh'
            }}>
                <Table
                    sx={{ width: "1500px" }}
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
                                    <FormControlLabel sx={{ fontSize: 12 }} control={
                                        <Checkbox
                                            indeterminate={selectAll ? true : false}
                                            size="small" onChange={(e) => {
                                                if (e.currentTarget.checked) {
                                                    setSelectedTrackers(selectableTrackers)
                                                    setSelectAll(true)
                                                }
                                                if (!e.currentTarget.checked) {
                                                    setSelectedTrackers([])
                                                    setSelectAll(false)
                                                }
                                            }} />}
                                        label=""
                                    />
                                </Stack>
                            </TableCell>

                            {/* actions popup */}

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


                            {/* tracker name */}

                            {!hiddenFields?.includes('view_cutsomer_name') ?
                                <TableCell
                                    sx={{ bgcolor: headColor }}                         >
                                    <Stack
                                        direction="row"
                                        justifyContent="left"
                                        alignItems="left"
                                        spacing={2}
                                    >
                                        Tracker Name
                                    </Stack>
                                </TableCell>
                                :
                                null}

                            {!hiddenFields?.includes('connected_phone') ?
                                <TableCell
                                    sx={{ bgcolor: headColor }}                         >
                                    <Stack
                                        direction="row"
                                        justifyContent="left"
                                        alignItems="left"
                                        spacing={2}
                                    >
                                        Bot Number
                                    </Stack>
                                </TableCell>
                                :
                                null}

                            {/* stage */}
                            {!hiddenFields?.includes('view_customer_phone') ?
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
                                :
                                null}

                            {/* city */}
                            {!hiddenFields?.includes('view_tracker_flow') ?
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
                                :
                                null}
                            {/* state */}
                            {!hiddenFields?.includes('view_last_interaction') ?
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
                                :
                                null}

                            {/* actions */}
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
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {

                            data && data.map((tracker, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '&:nth-of-type(odd)': { bgcolor: color1 },
                                            '&:nth-of-type(even)': { bgcolor: color2 },
                                            '&:hover': { bgcolor: 'rgba(0,0,0,0.1)', cursor: 'pointer' }
                                        }}>
                                        {selectAll ?

                                            <TableCell>
                                                <Stack direction="row"
                                                    spacing={2}
                                                    justifyContent="left"
                                                    alignItems="center"
                                                >

                                                    <Checkbox size="small"
                                                        checked={Boolean(selectAll)}
                                                    />

                                                </Stack>
                                            </TableCell>
                                            :
                                            null
                                        }
                                        {!selectAll ?

                                            <TableCell>
                                                <Stack direction="row"
                                                    spacing={2}
                                                    justifyContent="left"
                                                    alignItems="center"
                                                >
                                                    <Checkbox size="small"
                                                        onChange={(e) => {
                                                            setTracker(tracker)
                                                            if (e.target.checked) {
                                                                setSelectedTrackers([...selectedTrackers, tracker])
                                                            }
                                                            if (!e.target.checked) {
                                                                setSelectedTrackers((trackers) => trackers.filter((item) => {
                                                                    return item._id !== tracker._id
                                                                }))
                                                            }
                                                        }}
                                                    />
                                                </Stack>
                                            </TableCell>

                                            :
                                            null
                                        }
                                        {/* actions popup */}

                                        <TableCell>
                                            <BasicPOPUP
                                                element={
                                                    <Stack direction="row" spacing={1}>
                                                        {
                                                            user?.is_admin ?
                                                                <>
                                                                    {!hiddenFields?.includes('edit_customer_name') &&
                                                                        <Tooltip title="Change Customer Name">
                                                                            <IconButton color="error"
                                                                                onClick={() => {
                                                                                    setTracker(tracker)
                                                                                    setChoice({ type: BotChoiceActions.update_tracker })
                                                                                }}
                                                                                disabled={readonlyFields?.includes('edit_customer_name')}
                                                                            >
                                                                                <AccountCircle />
                                                                            </IconButton>
                                                                        </Tooltip>}

                                                                    {
                                                                        !hiddenFields?.includes('allow_start_and_stop_bot_for_a_person') && <>

                                                                            {
                                                                                tracker.is_active ?

                                                                                    <Tooltip title="Stop bot for this person">
                                                                                        <IconButton color="warning"
                                                                                            onClick={() => {
                                                                                                setTracker(tracker)
                                                                                                setChoice({ type: BotChoiceActions.toogle_bot_status })
                                                                                            }}
                                                                                            disabled={readonlyFields?.includes('allow_start_and_stop_bot_for_a_person')}
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
                                                                                            disabled={readonlyFields?.includes('allow_start_and_stop_bot_for_a_person')}
                                                                                        >
                                                                                            <RestartAlt />
                                                                                        </IconButton>
                                                                                    </Tooltip>

                                                                            }
                                                                        </>}



                                                                </>
                                                                :
                                                                null
                                                        }
                                                    </Stack>}
                                                anchor={anchorEl}
                                            />
                                        </TableCell>

                                        {/* tracker name */}
                                        {!hiddenFields?.includes('view_cutsomer_name') ?
                                            <TableCell>
                                                <Typography sx={{ textTransform: "capitalize" }}>{tracker.customer_name}</Typography>
                                            </TableCell>
                                            :
                                            null}
                                        {!hiddenFields?.includes('connected_phone') ?
                                            <TableCell>
                                                <Typography sx={{ textTransform: "capitalize" }}>{tracker.bot_number}</Typography>
                                            </TableCell>
                                            :
                                            null}

                                        {/* stage */}
                                        {!hiddenFields?.includes('view_customer_phone') ?
                                            <TableCell>
                                                <Typography sx={{ textTransform: "capitalize" }}>{tracker.phone_number}</Typography>
                                            </TableCell>
                                            :
                                            null}
                                        {/* city */}
                                        {!hiddenFields?.includes('view_tracker_flow') ?
                                            <TableCell>
                                                <Typography sx={{ textTransform: "capitalize" }}>{tracker.flow.flow_name}</Typography>
                                            </TableCell>
                                            :
                                            null}

                                        {/* tracker type */}
                                        {!hiddenFields?.includes('view_last_interaction') ?
                                            <TableCell>
                                                <Typography sx={{ textTransform: "capitalize" }}>{tracker.updated_at && new Date(tracker.updated_at).toLocaleString()}</Typography>
                                            </TableCell>
                                            :
                                            null}
                                        {/* actions */}
                                        <TableCell>
                                            {
                                                <Stack direction="row" spacing={1}>
                                                    {
                                                        user?.is_admin ?
                                                            <>
                                                                {!hiddenFields?.includes('edit_customer_name') &&
                                                                    <Tooltip title="Change Customer Name">
                                                                        <IconButton color="error"
                                                                            onClick={() => {
                                                                                setTracker(tracker)
                                                                                setChoice({ type: BotChoiceActions.update_tracker })
                                                                            }}
                                                                            disabled={readonlyFields?.includes('edit_customer_name')}
                                                                        >
                                                                            <AccountCircle />
                                                                        </IconButton>
                                                                    </Tooltip>}

                                                                {
                                                                    !hiddenFields?.includes('allow_start_and_stop_bot_for_a_person') && <>

                                                                        {
                                                                            tracker.is_active ?

                                                                                <Tooltip title="Stop bot for this person">
                                                                                    <IconButton color="warning"
                                                                                        onClick={() => {
                                                                                            setTracker(tracker)
                                                                                            setChoice({ type: BotChoiceActions.toogle_bot_status })
                                                                                        }}
                                                                                        disabled={readonlyFields?.includes('allow_start_and_stop_bot_for_a_person')}
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
                                                                                        disabled={readonlyFields?.includes('allow_start_and_stop_bot_for_a_person')}
                                                                                    >
                                                                                        <RestartAlt />
                                                                                    </IconButton>
                                                                                </Tooltip>

                                                                        }
                                                                    </>}



                                                            </>
                                                            :
                                                            null
                                                    }
                                                </Stack>

                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })

                        }
                    </TableBody>
                </Table>
            </Box>
            {
                tracker ?
                    <>
                        <UpdateTrackerDialog tracker={tracker} />
                        <ToogleBotDialog tracker={tracker} />
                    </>
                    : null
            }
        </>
    )
}

export default TrackersTable