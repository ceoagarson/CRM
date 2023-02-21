import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, CircularProgress } from '@mui/material'
import { useContext } from 'react'
import { OpportunityChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { IOpportunity } from '../../../types/opportunity.type'
import UpdateOpportunityForm from '../../forms/opportunity/UpdateOpportunityForm'

function UpdateOpportunityDialog({ opportunity }: { opportunity: IOpportunity }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog  
        open={choice === OpportunityChoiceActions.update_opportunity ? true : false}
            onClose={() => setChoice({ type: OpportunityChoiceActions.close })}
        >
            <DialogTitle textAlign="center">Update Opportunity Form</DialogTitle>
            <DialogContent>
                {opportunity ?
                    < UpdateOpportunityForm opportunity={opportunity} />
                    : <CircularProgress size="large" />
                }
            </DialogContent>
            <DialogActions>
                <Typography
                    variant="button"
                    component="p"
                    sx={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                </Typography >
            </DialogActions>
        </Dialog>
    )
}

export default UpdateOpportunityDialog