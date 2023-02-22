import { Dialog, DialogContent, DialogTitle, Button, Typography, Stack, Box } from '@mui/material'
import { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { queryClient } from '../../..';
import { ActivityChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { IActivity } from '../../../types/activity.type';

function ToogleActivityStatusDialog({ activity }: { activity: IActivity }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === ActivityChoiceActions.view_activity ? true : false}
            onClose={() => setChoice({ type: ActivityChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
                Activity Details
            </DialogTitle>
            <DialogContent>
                <Box>
                    <Stack direction="column" justifyContent="center" alignItems="center">
                        <Typography variant="h6" component="h2">
                            {activity.activity_owner.username}</Typography>
                        <Typography variant="body2">
                            {activity.activity_type}</Typography>
                        <Typography variant="caption" component="p">
                            {activity.description}</Typography>
                        <Typography variant="caption" component="p">
                            <i>{activity.resource_type}</i></Typography>
                    </Stack>
                </Box>
            </DialogContent>
            <Stack
                direction="column"
                gap={2}
                padding={2}
                width="100%"
            >
                <Button fullWidth variant="contained"
                    onClick={() => setChoice({ type: ActivityChoiceActions.close })}>Close</Button>
            </Stack >
        </Dialog >
    )
}

export default ToogleActivityStatusDialog
