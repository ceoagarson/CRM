import { Dialog, DialogContent,  Button, DialogActions } from '@mui/material';
import { useContext } from 'react';
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import AllRemarksPage from '../../../pages/AllRemarksPage';
import { ILead } from '../../../types/models/lead.type';

function ViewRemarksDialog({ lead }: { lead: ILead }) {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog open={choice === LeadChoiceActions.view_remarks ? true : false}
        onClose={() => setChoice({ type: LeadChoiceActions.close_lead })}
        scroll="paper"
      >
        <DialogContent>
          <AllRemarksPage lead={lead}/>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="outlined" color="primary" onClick={() => setChoice({ type: LeadChoiceActions.close_lead })}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewRemarksDialog