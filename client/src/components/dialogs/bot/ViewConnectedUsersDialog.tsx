import { useContext, useEffect, useState } from "react";
import { BotChoiceActions, ChoiceContext } from "../../../contexts/dialogContext";
import { IFlow } from "../../../types/bot/flow.types";
import { Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";


function ViewConnectedUsersDialog({ selectedFlow }: { selectedFlow: IFlow }) {
    const [flow, setFlow] = useState<IFlow | undefined>(selectedFlow)
    const { choice, setChoice } = useContext(ChoiceContext)

    useEffect(() => {
        setFlow(selectedFlow)
    }, [selectedFlow])

    return (

        <Dialog open={choice === BotChoiceActions.view_connected_users ? true : false}
            onClose={() => setChoice({ type: BotChoiceActions.close_bot })}
        >
            <DialogTitle>
                <Typography variant="h4">
                    {flow?.flow_name}
                </Typography>
                <Typography variant="caption">
                    Connected Users
                </Typography>
            </DialogTitle>
            <DialogContent>
                {
                    flow?.connected_users && flow.connected_users.map((user, index) => {
                        return (
                            <Stack gap={2} key={index}>
                                <Stack direction="row" justifyContent="left" gap={1} alignItems="center">
                                    {
                                        user.connected_number && <>
                                            <Typography>{user.username} : : </Typography>
                                            <p>{user.connected_number.replace("91", "").replace("@c.us", "")}</p>
                                        </>
                                    }

                                </Stack>
                            </Stack>
                        )
                    })
                }
            </DialogContent>
        </Dialog>
    )
}

export default ViewConnectedUsersDialog