import { Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';
import { useContext } from 'react';
import { ActivityChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { IActivity } from '../../../types/activity.type';
import UpdateActivityForm from '../../forms/activity/UpdateActivityForm';

function UpdateActivityDialog({ activity }: { activity: IActivity }) {
  const { choice, setChoice } = useContext(ChoiceContext)
  return (
    <>
      <Dialog open={choice === ActivityChoiceActions.update_activity ? true : false}
        onClose={() => setChoice({ type: ActivityChoiceActions.close })}
        scroll="paper"
      >
        <DialogTitle textAlign={"center"}>New Activity</DialogTitle>
        <DialogContent>
          <UpdateActivityForm activity={activity}/>
        </DialogContent>
        <DialogActions>
          <Button fullWidth onClick={() => setChoice({ type: ActivityChoiceActions.close })}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UpdateActivityDialog