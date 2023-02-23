import { Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';
import { useContext } from 'react';
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import NewLeadForm from '../../forms/lead/NewLeadForm';

function NewLeadDialog() {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog  open={choice === LeadChoiceActions.create_lead ? true : false}
        onClose={() => setChoice({ type: LeadChoiceActions.close })}
        scroll="paper"
      >
        <DialogTitle textAlign={"center"}>New Lead</DialogTitle>
        <DialogContent>
          <NewLeadForm />
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={() => setChoice({ type: LeadChoiceActions.close })}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewLeadDialog