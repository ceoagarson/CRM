import { useQuery } from "react-query"
import { GetFlows } from "../../services/BotServices"
import { AxiosResponse } from "axios"
import { BackendError } from "../../types"
import { useEffect, useContext, useState } from "react"
import { IFlow } from "../../types/bot/flow.types"
import { BotChoiceActions, ChoiceContext } from "../../contexts/dialogContext"
import { UserContext } from "../../contexts/userContext"
import { Button } from "@mui/material"
import UpdateFlowDialog from "../../components/dialogs/bot/UpdateFlowDialog"
import CreateFlowDialog from "../../components/dialogs/bot/CreateFlowDialog"
import DeleteFlowDialog from "../../components/dialogs/bot/DeleteFlowDialog"


export default function FlowsPage() {
  const [flows, setFlows] = useState<IFlow[]>()
  const [flow, setFlow] = useState<IFlow>()
  const { setChoice } = useContext(ChoiceContext)
  const { user } = useContext(UserContext)
  const { data } = useQuery<AxiosResponse<IFlow[]>, BackendError>("flows", GetFlows)

  useEffect(() => {
    if (data)
      setFlows(data.data)
  }, [data])


  return (
    <>

      <div className="d-flex-column gap-2 p-2 pt-4 overflow-auto">
        <div style={{ cursor: "pointer" }} className="border-danger btn m-2 rounded  fs-6 mt-1"
        >
          <div className="d-flex gap-1 align-items-center justify-content-center"
            onClick={() => setChoice({ type: BotChoiceActions.create_flow })}
          >
            <img width="30" height="30" src="https://img.icons8.com/plasticine/100/serial-tasks.png" alt="undo" />
            <span >New Flow</span>
          </div>
        </div>
        <table className="table">
          <thead >
            <tr>
              <th style={{ minWidth: '150px' }} scope="col">Index</th>
              <th style={{ minWidth: '150px' }} scope="col">Status</th>
              <th style={{ minWidth: '150px' }} scope="col">Connected Phone</th>
              <th style={{ minWidth: '150px' }} scope="col">Flow Name</th>
              <th style={{ minWidth: '150px' }} scope="col">Triggers</th>
              <th style={{ minWidth: '150px' }} scope="col">Last Updated</th>
              <th style={{ minWidth: '150px' }} scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              flows && flows.length > 0 ?
                <>
                  {flows.map((flow, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{user?.connected_number ? "active" : "disabled"}</td>
                        <td>{String(user?.connected_number).replace("@c.us", "")}</td>
                        <td>{flow.flow_name}</td>
                        <td>{flow.trigger_keywords}</td>
                        <td>{flow.updated_at && new Date(flow.updated_at).toLocaleString()}</td>
                        <td className="d-flex gap-1">
                          <Button size="small" variant="contained" onClick={() => {
                            setFlow(flow)
                            setChoice({ type: BotChoiceActions.update_flow })
                          }}>Edit</Button>
                          <Button
                            size="small"
                            variant="outlined" color="error"
                            onClick={() => {
                              setFlow(flow)
                              setChoice({ type: BotChoiceActions.delete_flow })
                            }}
                          >Delete</Button>
                        </td>
                      </tr>
                    )
                  })}
                </>
                : null
            }
          </tbody>
        </table>
        {flow ? <UpdateFlowDialog selectedFlow={flow} /> : null}
        <CreateFlowDialog />
        {flow ? <DeleteFlowDialog flow={flow} /> : null}
      </div>
    </>

  )
}
