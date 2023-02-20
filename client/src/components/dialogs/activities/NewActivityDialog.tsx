import { Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';
import { useContext } from 'react';
import { ActivityChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import NewActivityForm from '../../forms/activity/NewActivityForm';

function NewActivityDialog({ id }: { id: string }) {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog open={choice === ActivityChoiceActions.create_activity ? true : false}
        onClose={() => setChoice({ type: ActivityChoiceActions.close })}
        scroll="paper"
      >
        <DialogTitle textAlign={"center"}>New Activity</DialogTitle>
        <DialogContent>
          <NewActivityForm id={id} />
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={() => setChoice({ type: ActivityChoiceActions.close })}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default NewActivityDialog