import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Avatar, Typography, Box } from '@mui/material';
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
          <Box>
            <Stack p={2} justifyContent="center" alignItems="center">
              <Avatar src={lead.dp?.url} sx={{ height: "150px", width: "150px" }} alt="lead pic" />
            </Stack>
            <Stack direction="column" justifyContent="center" alignItems="center">
              <Typography variant="h6" component="h2">
                {lead.customer_name}</Typography>
              <Typography variant="caption" component="p">
                {lead.name}</Typography>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={() => setChoice({ type: LeadChoiceActions.close })}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewLeadDialog