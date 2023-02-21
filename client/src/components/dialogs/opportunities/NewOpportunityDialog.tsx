import { Dialog, DialogContent, DialogTitle, Button, DialogActions} from '@mui/material';
import { useContext } from 'react';
import { OpportunityChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import NewOpportunityForm from '../../forms/opportunity/NewOpportunityForm';

function NewOpportunityDialog() {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog open={choice === OpportunityChoiceActions.create_opportunity ? true : false}
        onClose={() => setChoice({ type: OpportunityChoiceActions.close })}
        scroll="paper"
      >
        <DialogTitle textAlign={"center"}>New Opportunity</DialogTitle>
        <DialogContent>
          <NewOpportunityForm />
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={() => setChoice({ type: OpportunityChoiceActions.close })}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewOpportunityDialog