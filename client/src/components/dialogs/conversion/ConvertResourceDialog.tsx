import { Dialog, DialogContent, DialogTitle, Button, Typography,  Stack } from '@mui/material'
import { useContext } from 'react';
import { ConversionChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { Resource_Type } from '../../../services/ActivityServices';
import ConvertResourceForm from '../../forms/conversion/ConvertResourceForm';

function ConvertResourceDialog({ resource_id, resource_type }: { resource_id: string, resource_type: Resource_Type }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === ConversionChoiceActions.convert_resource ? true : false}
            onClose={() => setChoice({ type: ConversionChoiceActions.close })}
        >
            <DialogTitle textAlign="center">
                Convert Resource
            </DialogTitle>
            <DialogContent>
                <Stack gap={2} padding={2}>
                    <Typography variant="body1" color="error">
                        Warning ! This will give you a new resource and delete original resource.
                    </Typography>
                    {resource_id && resource_type ?
                        <ConvertResourceForm id={resource_id} resource_type={resource_type} /> :
                        null}
                    <Button fullWidth variant="contained"
                        onClick={() => setChoice({ type: ConversionChoiceActions.close })}>Cancel</Button>
                </Stack>
            </DialogContent>
        </Dialog >
    )
}

export default ConvertResourceDialog
