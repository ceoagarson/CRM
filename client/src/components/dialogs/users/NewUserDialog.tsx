import { Dialog, DialogContent, DialogTitle,  DialogActions, Typography } from '@mui/material';
import { useContext} from 'react';
import { UserChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import NewUserForm from '../../forms/user/NewUserForm';

function NewUserDialog() {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <Dialog open={choice === UserChoiceActions.new_user ? true : false} onClose={() => setChoice({ type: UserChoiceActions.close_user })}
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
        </Typography >
      </DialogActions>
    </Dialog>
  )
}

export default NewUserDialog