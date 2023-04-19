import { Dialog, DialogContent,  Button, DialogActions } from '@mui/material';
import { useContext } from 'react';
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { ILead } from '../../../types/lead.type';
import AllRemarksPage from '../../../pages/AllRemarksPage';

function ViewRemarksDialog({ lead }: { lead: ILead }) {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog open={choice === LeadChoiceActions.view_remarks ? true : false}
        onClose={() => setChoice({ type: LeadChoiceActions.close })}
        scroll="paper"
      >
        <DialogContent>
          <AllRemarksPage lead={lead}/>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="outlined" color="primary" onClick={() => setChoice({ type: LeadChoiceActions.close })}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewRemarksDialog