import { useContext } from "react"
import { ChoiceContext, UserChoiceActions } from "../../../contexts/dialogContext"
import { Avatar, Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import LeadControlAccessForm from "../../forms/user/LeadControlAccessForm"
import { IUser } from "../../../types/users/user.type"

function ManageAccessControlDialog({ user}: { user:IUser }) {
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
            <Stack>
              <Avatar
                alt="display picture" src={user.dp?.url} />
              {
                user.is_active ?
                  <Typography variant="caption" sx={{
                    color: "green",
                  }}>active</Typography>
                  : <Typography variant="caption" sx={{
                    color: "red",
                  }}>blocked</Typography>

              }
            </Stack >
            <Stack>
              {
                user.is_admin ?
                  <>
                    <Typography sx={{ textTransform: "capitalize", color: "green" }}>{user.username}</Typography>
                    <Typography variant="caption" component="span">
                        admin
                    </Typography>
                  </>
                  :
                  <>
                    <Typography sx={{ textTransform: "capitalize" }}>{user.username}</Typography>
                    <Typography variant="caption" component="span">
                      user
                    </Typography>
                  </>
              }
            </Stack >
          </Stack>
        </DialogTitle>
        <DialogContent>
          {
          user?
          <>
              <LeadControlAccessForm user={user} />
          </>
          :null
        }
        </DialogContent>
          <Button fullWidth variant="contained"
            onClick={() => setChoice({ type: UserChoiceActions.close_user })}>Close</Button>
      </Dialog >
    </>
  )
}

export default ManageAccessControlDialog
