import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Avatar, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useContext } from 'react';
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { ILead } from '../../../types/lead.type';

function ViewLeadDialog({ lead }: { lead: ILead }) {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog open={choice === LeadChoiceActions.view_lead ? true : false}
        onClose={() => setChoice({ type: LeadChoiceActions.close })}
        scroll="paper"
      >
        <DialogTitle textAlign={"center"}>Lead</DialogTitle>
        <DialogContent>
          <Stack>
            <Avatar src={lead.dp.url} />
            <Typography variant="h6">{lead.name}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={() => setChoice({ type: LeadChoiceActions.close })}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewLeadDialog