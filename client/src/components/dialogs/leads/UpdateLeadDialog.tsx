import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, CircularProgress } from '@mui/material'
import { useContext } from 'react'
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { ILead } from '../../../types/lead.type'
import UpdateLeadForm from '../../forms/lead/UpdateLeadForm'

function UpdateLeadDialog({ lead }: { lead: ILead }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog  
        open={choice === LeadChoiceActions.update_lead ? true : false}
            onClose={() => setChoice({ type: LeadChoiceActions.close })}
        >
            <DialogTitle textAlign="center">Update Lead Form</DialogTitle>
            <DialogContent>
                {lead ?
                    < UpdateLeadForm lead={lead} />
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

export default UpdateLeadDialog