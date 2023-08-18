import { useContext } from "react"
import { ChoiceContext, UserChoiceActions } from "../../../contexts/dialogContext"
import { Avatar, Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import LeadControlAccessForm from "../../forms/user/LeadControlAccessForm"
import { IUser } from "../../../types/users/user.type"
import BotControlAccessForm from "../../forms/user/BotControlAccessForm"

function ManageAccessControlDialog({ user }: { user: IUser }) {
  const { choice, setChoice } = useContext(ChoiceContext)

  return (
    <>
      <Dialog fullScreen open={choice === UserChoiceActions.control_access ? true : false}
        onClose={() => setChoice({ type: UserChoiceActions.close_user })}
      >

        <DialogTitle textAlign="center">
          <Stack direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Stack gap={1} alignItems="center" direction="row">

              <Avatar
                alt="display picture" src={user.dp?.url} />
              <Typography variant="button">
                Access Control Page <u><b>{user.username}</b></u>
              </Typography>
              <Button size="small" variant="outlined" color="warning"
                onClick={() => setChoice({ type: UserChoiceActions.close_user })}>Close</Button>
            </Stack >

          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack direction="row" gap={2}>
            {
              user ?
                <>
                  <LeadControlAccessForm user={user} />
                </>
                : null
            }
            {
              user ?
                <>
                  <BotControlAccessForm user={user} />
                </>
                : null
            }
          </Stack>
        </DialogContent>

      </Dialog >
    </>
  )
}

export default ManageAccessControlDialog
