import { useContext, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { BackendError } from '../../types'
import { GetTrackers } from '../../services/BotServices'
import { ITracker } from '../../types/bot/flow.types'
import { BotChoiceActions, ChoiceContext } from '../../contexts/dialogContext'
import { Button } from '@mui/material'
import UpdateTrackerDialog from '../../components/dialogs/bot/UpdateTrackerDialog'
import ToogleBotDialog from '../../components/dialogs/bot/ToogleBotDialog'


function TrackersPage() {
    const [trackers, setTrackers] = useState<ITracker[]>()
    const [tracker, setTracker] = useState<ITracker>()
    const { setChoice } = useContext(ChoiceContext)
    const { data } = useQuery<AxiosResponse<ITracker[]>, BackendError>("trackers", GetTrackers)

    useEffect(() => {
        if (data)
            setTrackers(data.data)
    }, [data])
    return (
        <div className="d-flex-column gap-2  p-2 pt-4 pt-4 overflow-auto">
            <div style={{ cursor: "pointer" }} className=" border-danger btn m-2 rounded  fs-6 mt-1"
            >
                <div className="d-flex gap-1 align-items-center justify-content-center"

                >
                    <img width="30" height="30" src="https://img.icons8.com/color/48/apple-phone.png" alt="undo" />
                    <span >Trackers</span>
                </div>
            </div>
            <table className="table">
                <thead >
                    <tr>
                        <th style={{ minWidth: '200px' }} scope="col">Index</th>
                        <th style={{ minWidth: '200px' }} scope="col">Customer Name</th>
                        <th style={{ minWidth: '200px' }} scope="col">Customer Phone</th>
                        <th style={{ minWidth: '200px' }} scope="col">Flow Name</th>
                        <th style={{ minWidth: '200px' }} scope="col">Last Active</th>
                        <th style={{ minWidth: '200px' }} scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        trackers && trackers.length > 0 ?
                            <>
                                {trackers.map((tracker, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{tracker.customer_name ? tracker.customer_name : "unknown"}</td>
                                            <td>{String(tracker.phone_number).replace("@c.us", "")}</td>
                                            <td>{tracker.flow.flow_name}</td>
                                            <td>{tracker.updated_at && new Date(tracker.updated_at).toLocaleString()}</td>
                                            <td className="d-flex gap-1">
                                                <Button size="small" variant="contained"
                                                    onClick={() => {
                                                        setTracker(tracker)
                                                        setChoice({ type: BotChoiceActions.update_tracker })
                                                    }}
                                                >Edit</Button>
                                                {tracker.is_active ?
                                                    < Button size="small" variant="outlined" color="error"
                                                        onClick={() => {
                                                            setTracker(tracker)
                                                            setChoice({ type: BotChoiceActions.toogle_bot_status })
                                                        }}
                                                    >Stop</Button> :
                                                    <Button size="small" variant="outlined" color="success"
                                                        onClick={() => {
                                                            setTracker(tracker)
                                                            setChoice({ type: BotChoiceActions.toogle_bot_status })
                                                        }}
                                                    >Start</Button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                            : null
                    }
                </tbody>
            </table>
            {tracker ? <UpdateTrackerDialog tracker={tracker} /> : null}
            {tracker ? <ToogleBotDialog tracker={tracker} /> : null}

        </div>
    )
}

export default TrackersPage