import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, CircularProgress } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { LeadChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import UpdateLeadForm from '../../forms/lead/UpdateLeadForm'
import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'
import { GetUsers } from '../../../services/UserServices'
import { ILead } from '../../../types/models/lead.type'
import { IUser } from '../../../types/users/user.type'
import { BackendError } from '../../../types'

function UpdateLeadDialog({ lead }: { lead: ILead}) {
    const [users, setUsers] = useState<IUser[]>([])
    const { data, isSuccess } = useQuery<AxiosResponse<IUser[]>, BackendError>("users", GetUsers)
    const { choice, setChoice } = useContext(ChoiceContext)
    useEffect(() => {
        if (isSuccess)
            setUsers(data?.data)
    }, [users, isSuccess, data])
    return (
        <Dialog  
        open={choice === LeadChoiceActions.update_lead ? true : false}
            onClose={() => setChoice({ type: LeadChoiceActions.close_lead })}
        >
            <DialogTitle textAlign="center">Update Lead Form</DialogTitle>
            <DialogContent>
                {lead ?
                    < UpdateLeadForm users={users} lead={lead} />
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