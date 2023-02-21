import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Avatar, Typography } from '@mui/material';
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
          <Stack>
            <Avatar src={account.dp.url} />
            <Typography variant="h6">{account.name}</Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={() => setChoice({ type: AccountChoiceActions.close })}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewAccountDialog