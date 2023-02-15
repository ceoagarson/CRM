import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography } from '@mui/material';
import { useContext} from 'react';
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import NewUserForm from '../../forms/user/NewUserForm';


function NewUserDialog() {
  const { choice, setChoice } = useContext(ChoiceContext)

  return (
    <Dialog open={choice === ChoiceActions.new_user ? true : false} onClose={() => setChoice({ type: ChoiceActions.close })}
      scroll="paper"
    >
      <DialogTitle textAlign={"center"}>New User Form</DialogTitle>
      <DialogContent>
        <NewUserForm />
      </DialogContent>
      <DialogActions>
        <Typography
          variant="button"
          component="p"
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button onClick={() => setChoice({ type: ChoiceActions.login })}>Login</Button>{" or "}
          <Button onClick={() => setChoice({ type: ChoiceActions.reset_password_mail })}> Forgot Password</Button>
        </Typography >
      </DialogActions>
    </Dialog>
  )
}

export default NewUserDialog