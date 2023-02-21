import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Avatar, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useContext } from 'react';
import { OpportunityChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { IOpportunity } from '../../../types/opportunity.type';

function ViewOpportunityDialog({ opportunity }: { opportunity: IOpportunity }) {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog open={choice === OpportunityChoiceActions.view_opportunity ? true : false}
        onClose={() => setChoice({ type: OpportunityChoiceActions.close })}
        scroll="paper"
      >
        <DialogTitle textAlign={"center"}>Opportunity</DialogTitle>
        <DialogContent>
          <Stack>
            <Avatar src={opportunity.dp.url} />
            <Typography variant="h6">{opportunity.name}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={() => setChoice({ type: OpportunityChoiceActions.close })}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewOpportunityDialog