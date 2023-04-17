import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography } from '@mui/material';
import { useContext } from 'react';
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { ILead } from '../../../types/lead.type';
import LeadDetailPage from '../../../pages/LeadDetailPage';

function ViewLeadDialog({ lead }: { lead: ILead }) {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog open={choice === LeadChoiceActions.view_lead ? true : false}
        onClose={() => setChoice({ type: LeadChoiceActions.close })}
        scroll="paper"
      >
        <DialogTitle textAlign={"center"}>
        <Typography component="h1" variant="h6">
           Explore Selected Lead Details
        </Typography>

        </DialogTitle>
        <DialogContent>
          <LeadDetailPage lead={lead}/>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="outlined" color="primary" onClick={() => setChoice({ type: LeadChoiceActions.close })}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewLeadDialog