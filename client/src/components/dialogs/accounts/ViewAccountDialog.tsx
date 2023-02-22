import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Avatar, Typography, Box } from '@mui/material';
import { Stack } from '@mui/system';
import { useContext } from 'react';
import { AccountChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { IAccount } from '../../../types/account.type';

function ViewAccountDialog({ account }: { account: IAccount }) {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog open={choice === AccountChoiceActions.view_account ? true : false}
        onClose={() => setChoice({ type: AccountChoiceActions.close })}
        scroll="paper"
      >
        <DialogTitle textAlign={"center"}>Account</DialogTitle>
        <DialogContent>
          <Box>
            <Stack p={2} justifyContent="center" alignItems="center">
              <Avatar src={account.dp?.url} sx={{ height: "150px", width: "150px" }} alt="account pic" />
            </Stack>
            <Stack direction="column" justifyContent="center" alignItems="center">
              <Typography variant="h6" component="h2">
                {account.customer_name}</Typography>
              <Typography variant="caption" component="p">
                {account.name}</Typography>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={() => setChoice({ type: AccountChoiceActions.close })}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewAccountDialog