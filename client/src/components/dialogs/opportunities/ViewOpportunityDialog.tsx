import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Avatar, Typography, Box } from '@mui/material';
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
          <Box>
            <Stack p={2} justifyContent="center" alignItems="center">
              <Avatar src={opportunity.dp?.url} sx={{ height: "150px", width: "150px" }} alt="opportunity pic" />
            </Stack>
            <Stack direction="column" justifyContent="center" alignItems="center">
              <Typography variant="h6" component="h2">
                {opportunity.customer_name}</Typography>
              <Typography variant="caption" component="p">
                {opportunity.name}</Typography>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={() => setChoice({ type: OpportunityChoiceActions.close })}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewOpportunityDialog