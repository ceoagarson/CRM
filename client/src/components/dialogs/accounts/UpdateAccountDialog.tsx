import { Dialog, DialogContent, DialogTitle, DialogActions, Typography, CircularProgress } from '@mui/material'
import { useContext } from 'react'
import { AccountChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { IAccount } from '../../../types/account.type'
import UpdateAccountForm from '../../forms/account/UpdateAccountForm'

function UpdateAccountDialog({ account }: { account: IAccount }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    return (
        <Dialog  
        open={choice === AccountChoiceActions.update_account ? true : false}
            onClose={() => setChoice({ type: AccountChoiceActions.close })}
        >
            <DialogTitle textAlign="center">Update Account Form</DialogTitle>
            <DialogContent>
                {account ?
                    < UpdateAccountForm account={account} />
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

export default UpdateAccountDialog