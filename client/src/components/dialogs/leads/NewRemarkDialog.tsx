import { Dialog, DialogContent,  DialogActions, Typography, CircularProgress } from '@mui/material'
import { useContext } from 'react'
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import NewRemarkForm from '../../forms/lead/NewRemarkForm'
import { ILead } from '../../../types/leads/lead.type'

function NewRemarkDialog({ lead }: { lead: ILead }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog
            open={choice === LeadChoiceActions.update_remark ? true : false}
            onClose={() => setChoice({ type: LeadChoiceActions.close_lead })}
        >
            <DialogContent>
                {lead ?
                    < NewRemarkForm lead={lead} />
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

export default NewRemarkDialog