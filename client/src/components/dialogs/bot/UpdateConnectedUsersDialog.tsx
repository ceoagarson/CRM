import { useContext, useEffect, useState } from "react";
import { BotChoiceActions, ChoiceContext } from "../../../contexts/dialogContext";
import { IFlow } from "../../../types/bot/flow.types";
import { Dialog, DialogContent } from "@mui/material";
import UpdateConnectedUserForm from "../../forms/bot/UpdateConnectedUserForm";



function UpdateConnectedUsersDialog({ selectedFlow }: { selectedFlow: IFlow }) {
    const [flow, setFlow] = useState<IFlow | undefined>(selectedFlow)
    const { choice, setChoice } = useContext(ChoiceContext)
   
    useEffect(() => {
        setFlow(selectedFlow)
    }, [selectedFlow])
    return (

        <Dialog open={choice === BotChoiceActions.update_connected_users ? true : false}
            onClose={() => setChoice({ type: BotChoiceActions.close_bot })}
        >
            <DialogContent>
                {flow && <UpdateConnectedUserForm flow={flow} />}
            </DialogContent>
        </Dialog>
    )
}

export default UpdateConnectedUsersDialog