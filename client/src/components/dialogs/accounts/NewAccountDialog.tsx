import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography } from '@mui/material';
import { useContext } from 'react';
import { AccountChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import NewAccountForm from '../../forms/account/NewAccountForm';

function NewAccountDialog() {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog  open={choice === AccountChoiceActions.create_account ? true : false}
        onClose={() => setChoice({ type: AccountChoiceActions.close })}
        scroll="paper"
      >
        <DialogTitle textAlign={"center"}>New Account</DialogTitle>
        <DialogContent>
          <NewAccountForm />
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={() => setChoice({ type: AccountChoiceActions.close })}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewAccountDialog