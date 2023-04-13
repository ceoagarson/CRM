import { Dialog, DialogContent, DialogTitle, Button, DialogActions } from '@mui/material';
import { useContext } from 'react';
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext';
import FilterLeads from '../../tables/lead/FilterLeads';
import { Filter } from '../../../pages/LeadsPage';

function DisplayFilterDialog({ setFilter }: {
    setFilter: React.Dispatch<React.SetStateAction<Filter>>
}) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <>
            <Dialog open={choice === LeadChoiceActions.display_filter ? true : false}
                onClose={() => setChoice({ type: LeadChoiceActions.close })}
                scroll="paper"
            >
                <DialogTitle textAlign={"center"}>Filter Leads</DialogTitle>
                <DialogContent>
                    <FilterLeads setFilter={setFilter} />
                </DialogContent>
                <DialogActions>
                    <Button fullWidth onClick={() => setChoice({ type: LeadChoiceActions.close })}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DisplayFilterDialog