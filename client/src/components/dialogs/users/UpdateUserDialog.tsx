import { Dialog, DialogContent, DialogTitle, Button, DialogActions, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ChoiceActions, ChoiceContext } from '../../../contexts/dialogContext'
import { GetUser } from '../../../services/UserServices'
import { IUser } from '../../../types/user.type'
import UpdateUserForm from '../../forms/user/UpdateUserForm'

function UpdateUserDialog({ id }: { id: string }) {
    const { choice, setChoice } = useContext(ChoiceContext)
    const [user, setUser] = useState<IUser | undefined>()
    const { data, isSuccess } = useQuery(["user", id], () => GetUser(id))
    useEffect(() => {
        if (isSuccess)
            setUser(data?.data)
    }, [data])
    console.log(data)
    return (
        <Dialog open={choice === ChoiceActions.update_user ? true : false}
            onClose={() => setChoice({ type: ChoiceActions.close })}
        >
            <DialogTitle textAlign="center">Update User Form</DialogTitle>
            <DialogContent>
                {
                    user ?
                        <UpdateUserForm user={user} />
                        : null
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

export default UpdateUserDialog