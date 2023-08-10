import { Dialog, DialogTitle, Button, Stack } from '@mui/material'
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import { useContext } from 'react';
import LeadsFilterForm from '../../forms/filter/LeadsFilterForm';

type Props = {
    setQuery: React.Dispatch<React.SetStateAction<{
        city: boolean | undefined;
        owner: boolean | undefined;
        searchString: string | undefined;
        isOr: boolean | undefined
    } | undefined>>,
    query: {
        city: boolean | undefined;
        owner: boolean | undefined;
        searchString: string | undefined;
        isOr: boolean | undefined
    } | undefined
}

function LeadsFilterDialog({ query, setQuery }: Props) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog open={choice === LeadChoiceActions.open_filter ? true : false}
            onClose={() => setChoice({ type: LeadChoiceActions.close })}
        >
            <DialogTitle sx={{p:1}} textAlign="center">
                Advanced Leads Filter
            </DialogTitle>
            <Stack
                direction="column"
                gap={2}
                padding={2}
                width="100%"
            >
                <LeadsFilterForm query={query} setQuery={setQuery} />
                <Button fullWidth variant="outlined"
                    onClick={() => setChoice({ type: LeadChoiceActions.close })}>Close</Button>
            </Stack >
        </Dialog >
    )
}

export default LeadsFilterDialog
